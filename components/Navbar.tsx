import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              VTC Premium
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="/tarifs" className="text-gray-600 hover:text-gray-900">
              Tarifs
            </Link>
            <Link href="/reservation" className="text-gray-600 hover:text-gray-900">
              Réservation
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link 
              href="/login" 
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 