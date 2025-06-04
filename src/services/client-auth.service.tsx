// Client-side authentication service for static hosting
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple client-side auth using localStorage (not for production with sensitive data)
export class ClientAuthService {
  private static STORAGE_KEY = 'resume_helper_auth';
  private static USERS_KEY = 'resume_helper_users';

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static async signIn(email: string, password: string): Promise<User | null> {
    if (typeof window === 'undefined') return null;

    try {
      const users = this.getStoredUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const authUser = { id: user.id, email: user.email, name: user.name };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authUser));
        return authUser;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  static async signUp(name: string, email: string, password: string): Promise<User | null> {
    if (typeof window === 'undefined') return null;

    try {
      const users = this.getStoredUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      // Auto sign in
      const authUser = { id: newUser.id, email: newUser.email, name: newUser.name };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authUser));
      return authUser;
    } catch {
      return null;
    }
  }

  static signOut(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private static getStoredUsers(): any[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

// React Provider Component
export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = ClientAuthService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const user = await ClientAuthService.signIn(email, password);
    setUser(user);
    setIsLoading(false);
    return !!user;
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const user = await ClientAuthService.signUp(name, email, password);
    setUser(user);
    setIsLoading(false);
    return !!user;
  };

  const signOut = () => {
    ClientAuthService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useClientAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withClientAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const { user, isLoading } = useClientAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      // Redirect to sign in - in static hosting, this would be handled by client-side routing
      window.location.href = '/auth/signin';
      return null;
    }

    return <Component {...props} />;
  };
}
