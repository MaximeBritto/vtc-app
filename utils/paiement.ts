import { Paiement } from '@/types';

// Simulation d'une base de données de paiements
const fakePaiementDB: Paiement[] = [];

export const paiementService = {
  // Créer un nouveau paiement
  creerPaiement: async (reservationId: string, montant: number, methodePaiement: Paiement['methodePaiement']): Promise<Paiement> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simuler un taux d'échec de 10%
    if (Math.random() < 0.1) {
      throw new Error('Le paiement a échoué. Veuillez réessayer.');
    }

    const nouveauPaiement: Paiement = {
      id: Math.random().toString(36).substr(2, 9),
      reservationId,
      montant,
      statut: 'complete',
      dateTransaction: new Date().toISOString(),
      methodePaiement,
    };

    fakePaiementDB.push(nouveauPaiement);
    return nouveauPaiement;
  },

  // Obtenir un paiement par ID
  getPaiement: async (id: string): Promise<Paiement | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return fakePaiementDB.find(p => p.id === id) || null;
  },

  // Obtenir tous les paiements d'une réservation
  getPaiementsReservation: async (reservationId: string): Promise<Paiement[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return fakePaiementDB.filter(p => p.reservationId === reservationId);
  },

  // Rembourser un paiement
  rembourserPaiement: async (paiementId: string): Promise<Paiement> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const paiement = fakePaiementDB.find(p => p.id === paiementId);
    if (!paiement) {
      throw new Error('Paiement non trouvé');
    }

    paiement.statut = 'rembourse';
    return paiement;
  },

  // Vérifier la validité d'une carte (simulation)
  verifierCarte: async (numero: string, expiration: string, cvv: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simuler une validation basique
    return (
      numero.length === 16 &&
      expiration.length === 5 &&
      cvv.length === 3
    );
  },
}; 