'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAdminLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAdminLoggedIn) {
      router.replace('/login?redirect=/admin/dashboard');
    }
  }, [isAdminLoggedIn, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100"> {/* Bootstrap flex and viewport height */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-3 fs-5 text-muted">Carregando...</p> {/* Bootstrap margin and font size */}
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
             <p className="ms-3 fs-5 text-muted">Redirecionando...</p>
        </div>
    );
  }
  
  return <div className="container-fluid container-lg py-4 py-md-5">{children}</div>; // Bootstrap container
}
