'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export default function OrganizerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isOrganizerLoggedIn, isLoading, organizerUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isOrganizerLoggedIn) {
        if (pathname !== '/organizer/register') { 
          router.replace('/login?redirect=/organizer/dashboard'); 
        }
      } else if (isOrganizerLoggedIn && pathname === '/organizer/register') {
        router.replace('/organizer/dashboard');
      }
    }
  }, [isOrganizerLoggedIn, isLoading, router, pathname, organizerUser]);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5 text-muted">Carregando...</p>
      </div>
    );
  }

  if (!isOrganizerLoggedIn && pathname !== '/organizer/register') {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5 text-muted">Redirecionando para login...</p>
      </div>
    );
  }
  
  return <div className="container-fluid container-lg py-4 py-md-5">{children}</div>; // Bootstrap container
}
