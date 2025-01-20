import { User } from '@/types';

// Simulation d'une base de données utilisateurs
const fakeUserDB: User[] = [
  {
    id: '1',
    nom: 'Jean Dupont',
    email: 'jean@example.com',
    telephone: '0612345678',
    isVIP: true,
  },
  {
    id: '2',
    nom: 'Marie Martin',
    email: 'marie@example.com',
    telephone: '0687654321',
    isVIP: false,
  },
];

export const auth = {
  currentUser: null as User | null,

  login: async (email: string, password: string): Promise<User> => {
    // Simuler une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = fakeUserDB.find(u => u.email === email);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    
    auth.currentUser = user;
    // Stocker dans localStorage pour persister la session
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    auth.currentUser = null;
    localStorage.removeItem('user');
  },

  register: async (userData: Omit<User, 'id' | 'isVIP'>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      isVIP: false,
    };
    
    fakeUserDB.push(newUser);
    auth.currentUser = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  },

  checkAuth: (): User | null => {
    if (auth.currentUser) return auth.currentUser;
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      auth.currentUser = JSON.parse(storedUser);
      return auth.currentUser;
    }
    
    return null;
  },
}; 