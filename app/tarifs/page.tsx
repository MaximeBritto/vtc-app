import Link from 'next/link';

export default function Tarifs() {
  const tarifs = [
    {
      titre: 'Transport Standard',
      prix: '2.50€/km',
      prixBase: '10€',
      caracteristiques: [
        'Berline confortable',
        'Chauffeur professionnel',
        'Eau minérale offerte',
        'Prise en charge sous 30 minutes',
      ],
    },
    {
      titre: 'Transport Premium',
      prix: '3.50€/km',
      prixBase: '15€',
      caracteristiques: [
        'Véhicule haut de gamme',
        'Chauffeur en costume',
        'Boissons et snacks offerts',
        'Prise en charge immédiate',
        'WiFi à bord',
      ],
      recommande: true,
    },
    {
      titre: 'Transport VIP',
      prix: '5€/km',
      prixBase: '25€',
      caracteristiques: [
        'Limousine ou SUV luxueux',
        'Service personnalisé',
        'Champagne offert',
        'Chauffeur dédié',
        'Service conciergerie',
      ],
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Nos Tarifs</h1>
          <p className="text-xl text-gray-600 mb-8">
            Des solutions adaptées à tous vos besoins de transport
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tarifs.map((tarif, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                tarif.recommande
                  ? 'bg-black text-white shadow-xl scale-105'
                  : 'bg-white shadow-md'
              }`}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{tarif.titre}</h2>
                <p className="text-3xl font-bold mb-2">{tarif.prix}</p>
                <p className={`text-sm ${tarif.recommande ? 'text-gray-300' : 'text-gray-500'}`}>
                  Prix de base : {tarif.prixBase}
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {tarif.caracteristiques.map((caracteristique, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      className={`h-5 w-5 ${
                        tarif.recommande ? 'text-green-400' : 'text-green-500'
                      } mr-2`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {caracteristique}
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <Link
                  href="/reservation"
                  className={`inline-block px-6 py-3 rounded-full font-medium transition ${
                    tarif.recommande
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Réserver maintenant
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Informations complémentaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Suppléments</h3>
              <p className="text-gray-600">
                Bagages volumineux : +5€<br />
                Siège bébé : Gratuit<br />
                Attente : 0.50€/minute
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Réductions</h3>
              <p className="text-gray-600">
                Client régulier : -10%<br />
                Réservation anticipée : -5%<br />
                Trajet régulier : -15%
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Paiements acceptés</h3>
              <p className="text-gray-600">
                Carte bancaire<br />
                Espèces<br />
                Virement bancaire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 