
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast'; // Keep ShadCN toast
import { unifiedLoginAction } from '@/app/actions/auth-actions';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Loader2, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, { message: 'Senha é obrigatória.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const { adminLogin, organizerLogin, isAdminLoggedIn, isOrganizerLoggedIn, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  useEffect(() => {
    if (!authIsLoading) {
      if (isAdminLoggedIn) {
        router.replace('/admin/dashboard');
      } else if (isOrganizerLoggedIn) {
        router.replace('/organizer/dashboard');
      }
    }
  }, [authIsLoading, isAdminLoggedIn, isOrganizerLoggedIn, router]);

  if (authIsLoading) {
     return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{marginTop: '-56px'}}> {/* Adjust for header height if fixed */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (isAdminLoggedIn || isOrganizerLoggedIn) {
    return (
         <div className="d-flex align-items-center justify-content-center min-vh-100" style={{marginTop: '-56px'}}>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ms-2">Redirecionando...</p>
        </div>
    );
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await unifiedLoginAction(data);
    setIsSubmitting(false);

    if (result.success && result.user && result.userType) {
      if (result.userType === 'admin' && result.user) {
        adminLogin(result.user); 
        toast({
          title: 'Login de Admin Bem-Sucedido!',
          description: `Bem-vindo, ${result.user.nome}!`,
        });
        router.push('/admin/dashboard');
      } else if (result.userType === 'organizer' && result.user) {
        organizerLogin(result.user);
         toast({
          title: 'Login de Organizador Bem-Sucedido!',
          description: `Bem-vindo, ${result.user.nome}!`,
        });
        router.push('/organizer/dashboard');
      } else {
         toast({
          title: 'Falha no Login',
          description: 'Tipo de usuário desconhecido ou dados de usuário ausentes.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Falha no Login',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5" style={{marginTop: '-56px'}}> {/* Adjust for header height if fixed */}
      <div className="card border" style={{width: '100%', maxWidth: '450px'}}> {/* Removed shadow-xl */}
        <div className="card-header p-4 text-center">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
            <LogIn className="h-8 w-8" /> Acesso ao Sistema
          </h1>
          <p className="card-text text-muted">
            Faça login para gerenciar eventos ou acessar o painel administrativo.
          </p>
        </div>
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                autoComplete="email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                autoComplete="current-password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg fw-semibold" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <LogIn className="me-2 h-4 w-4" />}
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted small">
              Não tem uma conta de organizador?{' '}
              <Link href="/organizer/register" className="btn btn-secondary btn-sm text-decoration-none">
                <UserPlus className="me-1 h-4 w-4" /> Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

