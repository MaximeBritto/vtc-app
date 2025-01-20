import 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface User extends PrismaUser {}

  interface Session {
    user: {
      id: string;
      email: string;
      nom: string;
      telephone: string;
      isVIP: boolean;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    nom: string;
    telephone: string;
    isVIP: boolean;
  }
} 