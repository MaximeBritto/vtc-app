'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/utils/auth';
import { reservationService } from '@/utils/reservations';
import { paiementService } from '@/utils/paiement';
import { User } from '@/types';

export default function Reservation() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    adresseDepart: '',
    adresseArrivee: '',
    nombrePassagers: '1',
    message: '',
  });

  const [user, setUser] = useState<User | null>(null);
  const [prixEstime, setPrixEstime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPaiement, setShowPaiement] = useState(false);
  const [cartePaiement, setCartePaiement] = useState({
    numero: '',
    expiration: '',
    cvv: '',
  });

  useEffect(() => {
    const currentUser = auth.checkAuth();
    if (currentUser) {
      setUser(currentUser);
      setFormData(prev => ({
        ...prev,
        nom: currentUser.nom,
        email: currentUser.email,
        telephone: currentUser.telephone,
      }));
    }
  }, []);

  useEffect(() => {
    if (formData.adresseDepart && formData.adresseArrivee) {
      calculerPrix();
    }
  }, [formData.adresseDepart, formData.adresseArrivee]);

  const calculerPrix = async () => {
    try {
      const prix = await reservationService.calculerPrixEstime(
        formData.adresseDepart,
        formData.adresseArrivee
      );
      setPrixEstime(prix);
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Créer la réservation
      const reservation = await reservationService.creerReservation({
        userId: user?.id,
        dateReservation: formData.date,
        heureReservation: formData.heure,
        adresseDepart: formData.adresseDepart,
        adresseArrivee: formData.adresseArrivee,
        nombrePassagers: parseInt(formData.nombrePassagers),
        message: formData.message,
      });

      // Si la réservation est créée avec succès, afficher le formulaire de paiement
      setShowPaiement(true);
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaiement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Vérifier la carte
      const carteValide = await paiementService.verifierCarte(
        cartePaiement.numero,
        cartePaiement.expiration,
        cartePaiement.cvv
      );

      if (!carteValide) {
        throw new Error('Carte invalide');
      }

      // Simuler le paiement
      await paiementService.creerPaiement(
        'reservation-id', // Normalement, vous utiliseriez l'ID de la réservation créée
        prixEstime || 0,
        'carte'
      );

      alert('Réservation confirmée ! Vous recevrez un email de confirmation.');
      // Rediriger vers une page de confirmation
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert('Une erreur est survenue lors du paiement. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaiementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCartePaiement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showPaiement) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Paiement</h2>
        {prixEstime && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xl font-bold">Montant total : {prixEstime}€</p>
          </div>
        )}
        
        <form onSubmit={handlePaiement} className="space-y-6">
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
              Numéro de carte
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={cartePaiement.numero}
              onChange={handlePaiementChange}
              maxLength={16}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                Date d'expiration (MM/YY)
              </label>
              <input
                type="text"
                id="expiration"
                name="expiration"
                value={cartePaiement.expiration}
                onChange={handlePaiementChange}
                maxLength={5}
                placeholder="MM/YY"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cartePaiement.cvv}
                onChange={handlePaiementChange}
                maxLength={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? 'Traitement en cours...' : 'Payer maintenant'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Réservation</h1>
      
      {prixEstime && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xl font-bold">Prix estimé : {prixEstime}€</p>
          <p className="text-sm text-gray-500">Ce prix est une estimation et peut varier en fonction du trajet réel</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="heure" className="block text-sm font-medium text-gray-700">Heure</label>
            <input
              type="time"
              id="heure"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="nombrePassagers" className="block text-sm font-medium text-gray-700">Nombre de passagers</label>
            <select
              id="nombrePassagers"
              name="nombrePassagers"
              value={formData.nombrePassagers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="adresseDepart" className="block text-sm font-medium text-gray-700">Adresse de départ</label>
          <input
            type="text"
            id="adresseDepart"
            name="adresseDepart"
            value={formData.adresseDepart}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="adresseArrivee" className="block text-sm font-medium text-gray-700">Adresse d'arrivée</label>
          <input
            type="text"
            id="adresseArrivee"
            name="adresseArrivee"
            value={formData.adresseArrivee}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (optionnel)</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Traitement en cours...' : 'Réserver maintenant'}
          </button>
        </div>
      </form>
    </div>
  );
} 