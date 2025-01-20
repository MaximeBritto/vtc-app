import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/hero-vtc.jpg"
          alt="VTC Premium Service"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">VTC Premium Service</h1>
            <p className="text-xl mb-8">Voyagez en toute élégance et confort</p>
            <Link
              href="/reservation"
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Transport Privé</h3>
              <p>Service personnalisé pour tous vos déplacements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Aéroport</h3>
              <p>Transferts vers tous les aéroports parisiens</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Événements</h3>
              <p>Transport pour vos événements spéciaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver ?</h2>
          <p className="mb-8">Contactez-nous pour un devis personnalisé</p>
          <div className="space-x-4">
            <Link
              href="/reservation"
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Réserver
            </Link>
            <Link
              href="/contact"
              className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
