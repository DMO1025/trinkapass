'use client';

import type { OrganizerSafeData } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import type { Dispatch, ReactNode, SetStateAction} from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAdminLoggedIn: boolean;
  adminUser: OrganizerSafeData | null; // Using OrganizerSafeData for admin too as it's Omit<UserData, 'password_hash'>
  setIsAdminLoggedIn: Dispatch<SetStateAction<boolean>>;
  setAdminUser: Dispatch<SetStateAction<OrganizerSafeData | null>>;
  adminLogin: (userData: OrganizerSafeData) => void;
  adminLogout: () => void;

  isOrganizerLoggedIn: boolean;
  organizerUser: OrganizerSafeData | null;
  setIsOrganizerLoggedIn: Dispatch<SetStateAction<boolean>>;
  setOrganizerUser: Dispatch<SetStateAction<OrganizerSafeData | null>>;
  organizerLogin: (userData: OrganizerSafeData) => void;
  organizerLogout: () => void;
  
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<OrganizerSafeData | null>(null);
  
  const [isOrganizerLoggedIn, setIsOrganizerLoggedIn] = useState<boolean>(false);
  const [organizerUser, setOrganizerUser] = useState<OrganizerSafeData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    try {
      const adminLoggedInStatus = localStorage.getItem('isAdminLoggedIn');
      const storedAdminUser = localStorage.getItem('adminUser');
      if (adminLoggedInStatus === 'true' && storedAdminUser) {
        const parsedAdminUser: OrganizerSafeData = JSON.parse(storedAdminUser);
        // Basic validation for user type, though localStorage is client-side and can be tampered with.
        // Server actions should always re-validate.
        if (parsedAdminUser.tipo === 'admin') {
            setIsAdminLoggedIn(true);
            setAdminUser(parsedAdminUser);
        } else {
            localStorage.removeItem('isAdminLoggedIn');
            localStorage.removeItem('adminUser');
        }
      }

      const organizerLoggedInStatus = localStorage.getItem('isOrganizerLoggedIn');
      const storedOrganizerUser = localStorage.getItem('organizerUser');
      if (organizerLoggedInStatus === 'true' && storedOrganizerUser) {
        const parsedOrganizerUser: OrganizerSafeData = JSON.parse(storedOrganizerUser);
        if (parsedOrganizerUser.tipo === 'organizer') {
            setIsOrganizerLoggedIn(true);
            setOrganizerUser(parsedOrganizerUser);
        } else {
            localStorage.removeItem('isOrganizerLoggedIn');
            localStorage.removeItem('organizerUser');
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage or parse auth data:", error);
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('isOrganizerLoggedIn');
      localStorage.removeItem('organizerUser');
    }
    setIsLoading(false);
  }, []);

  const adminLogin = (userData: OrganizerSafeData) => {
    if (userData.tipo !== 'admin') {
      console.error("Attempted to log in non-admin user as admin.");
      return;
    }
    try {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify(userData));
    } catch (error) {
       console.error("Failed to set admin auth data in localStorage:", error);
    }
    setIsAdminLoggedIn(true);
    setAdminUser(userData);
    // Clear organizer state if admin logs in
    organizerLogout(false); 
  };

  const adminLogout = (shouldRedirect = true) => {
    try {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error("Failed to remove admin auth data from localStorage:", error);
    }
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    if (shouldRedirect && pathname.startsWith('/admin')) {
        router.push('/login');
    }
  };

  const organizerLogin = (userData: OrganizerSafeData) => {
     if (userData.tipo !== 'organizer') {
      console.error("Attempted to log in non-organizer user as organizer.");
      return;
    }
    try {
      localStorage.setItem('isOrganizerLoggedIn', 'true');
      localStorage.setItem('organizerUser', JSON.stringify(userData));
    } catch (error) {
       console.error("Failed to set organizer auth data in localStorage:", error);
    }
    setIsOrganizerLoggedIn(true);
    setOrganizerUser(userData);
    // Clear admin state if organizer logs in
    adminLogout(false); 
  };

  const organizerLogout = (shouldRedirect = true) => {
    try {
      localStorage.removeItem('isOrganizerLoggedIn');
      localStorage.removeItem('organizerUser');
    } catch (error) {
      console.error("Failed to remove organizer auth data from localStorage:", error);
    }
    setIsOrganizerLoggedIn(false);
    setOrganizerUser(null);
     if (shouldRedirect && pathname.startsWith('/organizer')) {
        router.push('/login');
    }
  };


  return (
    <AuthContext.Provider value={{ 
      isAdminLoggedIn, adminUser, setIsAdminLoggedIn, setAdminUser, adminLogin, adminLogout,
      isOrganizerLoggedIn, organizerUser, setIsOrganizerLoggedIn, setOrganizerUser, organizerLogin, organizerLogout,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
