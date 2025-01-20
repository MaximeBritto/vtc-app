'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/auth';
import { reservationService } from '@/utils/reservations';
import { Reservation, User } from '@/types';

export default function MesReservations() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.checkAuth();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    chargerReservations(currentUser.id);
  }, [router]);

  const chargerReservations = async (userId: string) => {
    try {
      const reservationsData = await reservationService.getReservationsUtilisateur(userId);
      setReservations(reservationsData);
    } catch (error) {
      console.error('Erreur lors du chargement des réservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatutBadgeClass = (statut: Reservation['statut']) => {
    const baseClasses = 'px-2 py-1 rounded-full text-sm font-medium';
    switch (statut) {
      case 'en_attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'confirmee':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'en_cours':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'terminee':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'annulee':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatHeure = (heure: string) => {
    return heure.substring(0, 5);
  };

  const handleAnnulation = async (reservationId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      return;
    }

    try {
      await reservationService.annulerReservation(reservationId);
      // Recharger les réservations
      if (user) {
        chargerReservations(user.id);
      }
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      alert('Une erreur est survenue lors de l\'annulation. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p>Chargement de vos réservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Mes Réservations</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Vous n'avez pas encore de réservations.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Trajet du {formatDate(reservation.dateReservation)}
                  </h2>
                  <p className="text-gray-600">
                    Heure de départ : {formatHeure(reservation.heureReservation)}
                  </p>
                </div>
                <span className={getStatutBadgeClass(reservation.statut)}>
                  {reservation.statut.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Départ</p>
                  <p className="font-medium">{reservation.adresseDepart}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrivée</p>
                  <p className="font-medium">{reservation.adresseArrivee}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p className="text-lg font-bold">{reservation.prixEstime}€</p>
                </div>

                {reservation.statut === 'en_attente' && (
                  <button
                    onClick={() => handleAnnulation(reservation.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 