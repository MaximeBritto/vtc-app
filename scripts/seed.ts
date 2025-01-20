import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test
  const hashedPassword = await hash('test123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      nom: 'Utilisateur Test',
      telephone: '0612345678',
      password: hashedPassword,
      isVIP: false,
    },
  });

  console.log('Utilisateur de test créé:', user);

  // Créer une réservation de test
  const reservation = await prisma.reservation.create({
    data: {
      userId: user.id,
      statut: 'en_attente',
      dateReservation: new Date(),
      heureReservation: '14:30',
      adresseDepart: 'Paris, Gare du Nord',
      adresseArrivee: 'Aéroport Charles de Gaulle',
      nombrePassagers: 2,
      prixEstime: 75.0,
      paiementStatus: 'en_attente',
      message: 'Test de réservation',
    },
  });

  console.log('Réservation de test créée:', reservation);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 