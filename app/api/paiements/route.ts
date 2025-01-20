import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { reservationId, montant } = body;

    // Récupérer la réservation
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: true },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Créer une session de paiement Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Réservation VTC - ${reservation.adresseDepart} → ${reservation.adresseArrivee}`,
            },
            unit_amount: Math.round(montant * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/reservation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/reservation/cancel`,
      customer_email: reservation.user.email,
      metadata: {
        reservationId,
      },
    });

    // Créer l'enregistrement de paiement
    const paiement = await prisma.paiement.create({
      data: {
        reservationId,
        montant,
        statut: 'en_attente',
        methodePaiement: 'carte',
        stripePaymentId: stripeSession.id,
      },
    });

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
    });
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Webhook Stripe pour gérer les événements de paiement
export async function PUT(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur de signature webhook' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const reservationId = session.metadata?.reservationId;

    if (reservationId) {
      // Mettre à jour le statut du paiement
      await prisma.paiement.updateMany({
        where: {
          reservationId,
          stripePaymentId: session.id,
        },
        data: {
          statut: 'complete',
        },
      });

      // Mettre à jour le statut de la réservation
      await prisma.reservation.update({
        where: { id: reservationId },
        data: {
          paiementStatus: 'paye',
          statut: 'confirmee',
        },
      });
    }
  }

  return NextResponse.json({ received: true });
} 