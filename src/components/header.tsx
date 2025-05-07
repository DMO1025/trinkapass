
// src/components/header.tsx
'use client';

import Link from 'next/link';
import { Ticket, UserCircle, LogOut, Loader2, Briefcase, ChevronDown, LayoutDashboard, LogInIcon as LogInLucideIcon, UserCog, Settings, Info, FileText, HelpCircle, CreditCard, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button as ShadButton } from './ui/button'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useEffect, useState, Fragment, cloneElement } from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; 

export default function Header() {
  const {
    isAdminLoggedIn, adminLogout, adminUser,
    isOrganizerLoggedIn, organizerLogout, organizerUser,
    isLoading
  } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isMobileAt640 = useIsMobile(640); 

  const [desktopUserDropdownOpen, setDesktopUserDropdownOpen] = useState(false);

  const loggedInUser = isAdminLoggedIn ? adminUser : (isOrganizerLoggedIn ? organizerUser : null);
  const loggedInUserType = isAdminLoggedIn ? 'admin' : (isOrganizerLoggedIn ? 'organizer' : null);

  const handleMobileNavigation = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href?: string) => {
    e.preventDefault();
    const offcanvasElement = document.getElementById('mobileOffcanvas');
    if (!offcanvasElement) {
      if (href) router.push(href);
      return;
    }

    const isCurrentlyOpen = offcanvasElement.classList.contains('show');

    const navigateLogic = () => {
      if (href) router.push(href);
    };
    
    const afterHideAction = () => {
      navigateLogic();
    };

    if (isCurrentlyOpen) {
      offcanvasElement.addEventListener('hidden.bs.offcanvas', afterHideAction, { once: true });
      
      let bsOffcanvasInstance = null;
      if ((window as any).bootstrap && (window as any).bootstrap.Offcanvas) {
        bsOffcanvasInstance = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
      }

      if (bsOffcanvasInstance && typeof bsOffcanvasInstance.hide === 'function') {
        bsOffcanvasInstance.hide();
      } else {
        const closeButton = offcanvasElement.querySelector('.btn-close') as HTMLElement;
        if (closeButton) {
          closeButton.click(); 
        } else {
          offcanvasElement.classList.remove('show');
          const backdrop = document.querySelector('.offcanvas-backdrop');
          backdrop?.remove();
          document.body.classList.remove('offcanvas-open');
          document.body.style.overflow = ''; 
          document.body.style.paddingRight = ''; 
          afterHideAction(); 
        }
      }
    } else {
      navigateLogic();
    }
  };
  
  const baseHandleLogout = (isMobile: boolean) => {
    const offcanvasElement = document.getElementById('mobileOffcanvas');
    const logoutLogic = () => {
      if (isAdminLoggedIn) adminLogout();
      if (isOrganizerLoggedIn) organizerLogout();
    };

    if (isMobile && offcanvasElement?.classList.contains('show')) {
      const afterHideAction = () => {
        logoutLogic();
      };
      
      offcanvasElement.addEventListener('hidden.bs.offcanvas', afterHideAction, { once: true });
      
      let bsOffcanvasInstance = null;
      if ((window as any).bootstrap && (window as any).bootstrap.Offcanvas) {
        bsOffcanvasInstance = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
      }

      if (bsOffcanvasInstance && typeof bsOffcanvasInstance.hide === 'function') {
        bsOffcanvasInstance.hide();
      } else {
        const closeButton = offcanvasElement.querySelector('.btn-close') as HTMLElement;
        if (closeButton) {
            closeButton.click();
        } else {
            offcanvasElement.classList.remove('show');
            const backdrop = document.querySelector('.offcanvas-backdrop');
            backdrop?.remove();
            document.body.classList.remove('offcanvas-open');
            document.body.style.overflow = ''; 
            document.body.style.paddingRight = ''; 
            afterHideAction();
        }
      }
    } else {
      logoutLogic();
      if (!isMobile) setDesktopUserDropdownOpen(false); 
    }
  };


  const navLinks = [
    { href: "/", label: "Eventos", icon: <Ticket size={20} /> },
    { href: "/about", label: "Sobre", icon: <Info size={20} /> },
    { href: "/plans", label: "Planos", icon: <FileText size={20} /> },
    // { href: "/learn-more", label: "Saber Mais", icon: <HelpCircle size={20} /> }, // Removed link
  ];


  const renderAuthSection = (isMobileView: boolean) => {
    const dashboardHref = loggedInUserType === 'admin' ? "/admin/dashboard" : "/organizer/dashboard";
    const profileHref = loggedInUserType === 'admin' ? "/admin/profile" : "/organizer/profile";

    if (isLoading) {
      return (
        <div className={`d-flex align-items-center gap-2 ${isMobileView ? 'p-3 text-light' : 'text-light p-2'}`}>
          <Loader2 size={20} className="animate-spin" />
          <span className={isMobileView ? '' : 'd-none d-md-inline'}>Carregando...</span>
        </div>
      );
    }
    
    if (loggedInUser && loggedInUserType) {
      if (isMobileView) {
        return (
          <Fragment>
            <div className="mb-3 border-bottom border-light border-opacity-25 pb-3">
              <p className="fs-5 fw-semibold text-light mb-0">{loggedInUser.nome}</p>
            </div>
            <ul className="list-unstyled navbar-nav flex-column mb-3">
              <li className="nav-item">
                <Link href={dashboardHref} className="nav-link d-flex align-items-center fs-5 py-2 text-light" onClick={(e) => handleMobileNavigation(e, dashboardHref)}>
                  <LayoutDashboard size={20} className="me-3" /> Painel
                </Link>
              </li>
              <li className="nav-item">
                <Link href={profileHref} className="nav-link d-flex align-items-center fs-5 py-2 text-light" onClick={(e) => handleMobileNavigation(e, profileHref)}>
                  <UserCog size={20} className="me-3" /> Meu Perfil
                </Link>
              </li>
              {loggedInUserType === 'organizer' && (
                <li className="nav-item">
                  <Link href="/organizer/settings/withdrawal" className="nav-link d-flex align-items-center fs-5 py-2 text-light" onClick={(e) => handleMobileNavigation(e, "/organizer/settings/withdrawal")}>
                    <CreditCard size={20} className="me-3" /> Saque e Verificação
                  </Link>
                </li>
              )}
              {loggedInUserType === 'admin' && (
                <li className="nav-item">
                  <Link href="/admin/settings" className="nav-link d-flex align-items-center fs-5 py-2 text-light" onClick={(e) => handleMobileNavigation(e, "/admin/settings")}>
                    <Settings size={20} className="me-3" /> Configurações
                  </Link>
                </li>
              )}
            </ul>
            <button
              onClick={(e) => { e.preventDefault(); baseHandleLogout(true);}}
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 fs-5 py-2"
            >
              <LogOut size={20} /> Sair
            </button>
          </Fragment>
        );
      } else {
        // Desktop view: use DropdownMenu
        return (
          <DropdownMenu 
              open={desktopUserDropdownOpen} 
              onOpenChange={setDesktopUserDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <ShadButton 
                variant="secondary" 
                className="btn btn-secondary d-flex align-items-center gap-2 text-light p-1 p-md-2" 
                onClick={() => setDesktopUserDropdownOpen(prev => !prev)}
              >
                {loggedInUserType === 'admin' ? <Briefcase size={18} /> : <UserCircle size={18} />}
                <span className="fw-medium d-none d-sm-inline">{loggedInUser.nome}</span>
                <ChevronDown size={16} className="opacity-80" />
              </ShadButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-card text-card-foreground mt-2 rounded-md border"> 
              <DropdownMenuLabel className="font-normal text-base px-3 py-2">
                <span className="font-semibold text-foreground d-block">{loggedInUser.nome}</span>
                <span className="text-xs text-muted-foreground d-block">{loggedInUser.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base p-0">
                <Link
                  href={dashboardHref}
                  className="d-flex align-items-center gap-2.5 w-100 px-3 py-2"
                  onClick={() => setDesktopUserDropdownOpen(false)}
                >
                  <LayoutDashboard size={16} className="text-muted-foreground" /> Painel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base p-0">
                <Link
                  href={profileHref}
                  className="d-flex align-items-center gap-2.5 w-100 px-3 py-2"
                  onClick={() => setDesktopUserDropdownOpen(false)}
                >
                  <UserCog size={16} className="text-muted-foreground" /> Meu Perfil
                </Link>
              </DropdownMenuItem>
              {loggedInUserType === 'organizer' && (
                <DropdownMenuItem className="text-base p-0">
                  <Link
                      href="/organizer/settings/withdrawal"
                      className="d-flex align-items-center gap-2.5 w-100 px-3 py-2"
                      onClick={() => setDesktopUserDropdownOpen(false)}
                  >
                    <CreditCard size={16} className="text-muted-foreground" /> Saque e Verificação
                  </Link>
                </DropdownMenuItem>
              )}
              {loggedInUserType === 'admin' && (
                <DropdownMenuItem className="text-base p-0">
                  <Link
                      href="/admin/settings"
                      className="d-flex align-items-center gap-2.5 w-100 px-3 py-2"
                      onClick={() => setDesktopUserDropdownOpen(false)}
                  >
                    <Settings size={16} className="text-muted-foreground" /> Configurações
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => { baseHandleLogout(false); setDesktopUserDropdownOpen(false);}}
                className="d-flex align-items-center gap-2.5 cursor-pointer text-danger focus:bg-danger focus:text-destructive-foreground w-100 text-base px-3 py-2"
              >
                <LogOut size={16} /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    } else {
      return (
        <Link
            href="/login"
            className={`btn ${isMobileView ? 'btn-primary w-100 p-3 fs-5' : 'btn-primary'} d-flex align-items-center gap-1 ${isMobileView ? 'justify-content-center' : ''}`}
            onClick={isMobileView ? (e) => handleMobileNavigation(e as MouseEvent<HTMLAnchorElement>, "/login") : () => setDesktopUserDropdownOpen(false)}
        >
          <LogInLucideIcon size={isMobileView ? 20 : 18} /> Login
        </Link>
      );
    }
  };

  return (
    <header className="navbar navbar-dark bg-primary sticky-top border-0"> {/* Removed shadow-sm */}
      <div className="container-fluid container-lg">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2 fs-4 fw-bold">
          <Ticket size={32} />
          <span>TrinkaPass</span>
        </Link>

        {isMobileAt640 && (
            <button
                className="navbar-toggler" 
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileOffcanvas"
                aria-controls="mobileOffcanvas"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <MenuIcon size={28} />
            </button>
        )}

        {!isMobileAt640 && (
            <div className="d-flex flex-grow-1 align-items-center">
                <ul className="navbar-nav flex-row mx-auto">
                    {navLinks.map(link => (
                    <li className="nav-item" key={link.href}>
                        <Link
                        href={link.href}
                        className={`nav-link px-2 px-lg-3 ${pathname === link.href ? 'active fw-semibold' : ''}`}
                        >
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
                <div className="d-flex align-items-center"> 
                    {renderAuthSection(false)}
                </div>
            </div>
        )}
      </div>

      {/* Mobile Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end text-bg-primary w-100" 
        tabIndex={-1}
        id="mobileOffcanvas"
        aria-labelledby="mobileOffcanvasLabel"
        data-bs-backdrop="true" 
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title d-flex align-items-center gap-2" id="mobileOffcanvasLabel">
            <Ticket size={28} /> TrinkaPass
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-0">
          <ul className="navbar-nav flex-column p-3">
            {navLinks.map(link => (
              <li className="nav-item" key={`${link.href}-mobile`}>
                <Link
                  href={link.href}
                  className={`nav-link d-flex align-items-center fs-5 py-3 ${pathname === link.href ? 'active fw-bold border-start border-light border-opacity-50 border-3 ps-2' : 'ps-2'}`}
                  onClick={(e) => handleMobileNavigation(e as MouseEvent<HTMLAnchorElement>, link.href)}
                >
                  {cloneElement(link.icon, { className: 'me-3' })}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto p-3 border-top border-light border-opacity-25">
            {renderAuthSection(true)}
          </div>
        </div>
      </div>
    </header>
  );
}

