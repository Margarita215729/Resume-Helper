import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// In a real app, this would be a database
// For now, we'll use a simple in-memory store (not suitable for production)
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}> = [];

async function getUser(email: string) {
  return users.find(user => user.email === email);
}

async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
  };
  users.push(user);
  return { id: user.id, email: user.email, name: user.name };
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
        }

        return null;
      },
    }),
  ],
});

export { createUser, getUser };
