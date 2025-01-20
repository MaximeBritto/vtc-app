import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Transport Privé',
      description: 'Service de transport personnalisé pour tous vos déplacements quotidiens ou professionnels. Véhicule haut de gamme avec chauffeur expérimenté.',
      image: '/service-prive.jpg',
      features: [
        'Véhicule premium récent',
        'Chauffeur professionnel',
        'Service ponctuel et fiable',
        'Disponible 24/7'
      ]
    },
    {
      title: 'Transfert Aéroport',
      description: 'Service de navette premium vers tous les aéroports parisiens. Nous suivons votre vol en temps réel pour assurer une prise en charge optimale.',
      image: '/aeroport.jpg',
      features: [
        'Suivi des vols en temps réel',
        'Aide aux bagages',
        'Accueil personnalisé',
        'Prix fixe sans surprise'
      ]
    },
    {
      title: 'Événements Spéciaux',
      description: 'Transport VTC pour vos événements importants : mariages, soirées, événements d\'entreprise. Un service d\'exception pour des moments mémorables.',
      image: '/evenements.jpg',
      features: [
        'Véhicule décoré sur demande',
        'Chauffeur en tenue de cérémonie',
        'Service personnalisable',
        'Forfaits sur mesure'
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Services</h1>
        
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`relative h-64 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/reservation"
                  className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Réserver maintenant
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d'un service sur mesure ?</h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous pour discuter de vos besoins spécifiques.
            Nous créerons une offre adaptée à vos exigences.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
} 