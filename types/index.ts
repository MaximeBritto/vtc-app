export interface User {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  isVIP: boolean;
}

export interface Reservation {
  id: string;
  userId?: string;
  statut: 'en_attente' | 'confirmee' | 'en_cours' | 'terminee' | 'annulee';
  dateReservation: string;
  heureReservation: string;
  adresseDepart: string;
  adresseArrivee: string;
  nombrePassagers: number;
  prixEstime: number;
  paiementStatus: 'en_attente' | 'paye' | 'rembourse';
  message?: string;
}

export interface Paiement {
  id: string;
  reservationId: string;
  montant: number;
  statut: 'en_attente' | 'complete' | 'echoue' | 'rembourse';
  dateTransaction: string;
  methodePaiement: 'carte' | 'especes' | 'virement';
} 