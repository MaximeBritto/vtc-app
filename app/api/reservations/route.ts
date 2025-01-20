import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// GET /api/reservations
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        paiements: true,
      },
      orderBy: {
        dateReservation: 'desc',
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/reservations
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const {
      dateReservation,
      heureReservation,
      adresseDepart,
      adresseArrivee,
      nombrePassagers,
      message,
      prixEstime,
    } = body;

    const reservation = await prisma.reservation.create({
      data: {
        userId: session.user.id,
        dateReservation: new Date(dateReservation),
        heureReservation,
        adresseDepart,
        adresseArrivee,
        nombrePassagers,
        message,
        prixEstime,
        statut: 'en_attente',
        paiementStatus: 'en_attente',
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 