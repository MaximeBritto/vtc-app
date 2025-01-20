import { Reservation } from '@/types';

// Simulation d'une base de données de réservations
const fakeReservationDB: Reservation[] = [];

export const reservationService = {
  // Créer une nouvelle réservation
  creerReservation: async (data: Omit<Reservation, 'id' | 'statut' | 'paiementStatus' | 'prixEstime'>): Promise<Reservation> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const prixKm = 2.5; // Prix par kilomètre (simulé)
    const prixBase = 10; // Prix de base
    const prixEstime = prixBase + Math.floor(Math.random() * 50) * prixKm;

    const nouvelleReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      statut: 'en_attente',
      paiementStatus: 'en_attente',
      prixEstime,
    };

    fakeReservationDB.push(nouvelleReservation);
    return nouvelleReservation;
  },

  // Obtenir une réservation par ID
  getReservation: async (id: string): Promise<Reservation | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return fakeReservationDB.find(r => r.id === id) || null;
  },

  // Obtenir toutes les réservations d'un utilisateur
  getReservationsUtilisateur: async (userId: string): Promise<Reservation[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return fakeReservationDB.filter(r => r.userId === userId);
  },

  // Mettre à jour le statut d'une réservation
  updateStatut: async (id: string, statut: Reservation['statut']): Promise<Reservation> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reservation = fakeReservationDB.find(r => r.id === id);
    if (!reservation) {
      throw new Error('Réservation non trouvée');
    }

    reservation.statut = statut;
    return reservation;
  },

  // Annuler une réservation
  annulerReservation: async (id: string): Promise<Reservation> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reservation = fakeReservationDB.find(r => r.id === id);
    if (!reservation) {
      throw new Error('Réservation non trouvée');
    }

    reservation.statut = 'annulee';
    return reservation;
  },

  // Calculer un prix estimé (simulation)
  calculerPrixEstime: async (adresseDepart: string, adresseArrivee: string): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const prixKm = 2.5;
    const prixBase = 10;
    // Simulation d'un calcul de distance
    const distanceSimulee = Math.floor(Math.random() * 50);
    
    return prixBase + distanceSimulee * prixKm;
  },
}; 