'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { organizerRegisterAction } from '@/app/actions/auth-actions';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Loader2, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';

const registerSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  whatsapp: z.string().regex(/^\d{10,11}$/, { message: 'WhatsApp inválido (somente números, DDD+Número).' }),
  password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function OrganizerRegisterPage() {
  const { toast } = useToast();
  const { organizerLogin, isOrganizerLoggedIn, isLoading: authIsLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      email: '',
      whatsapp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  useEffect(() => {
    if (!authIsLoading && isOrganizerLoggedIn) {
      router.replace('/organizer/dashboard');
    }
  }, [authIsLoading, isOrganizerLoggedIn, router]);
  
  if (authIsLoading) {
     return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{marginTop: '-56px'}}>
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isOrganizerLoggedIn) {
    return (
         <div className="d-flex align-items-center justify-content-center min-vh-100" style={{marginTop: '-56px'}}>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ms-2">Redirecionando...</p>
        </div>
    );
  }

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setIsSubmitting(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registrationData } = data; 
    const result = await organizerRegisterAction({ ...registrationData, password_hash: data.password }); 
    setIsSubmitting(false);

    if (result.success && result.user && result.userType === 'organizer') {
      organizerLogin(result.user); 
      toast({
        title: 'Cadastro Bem-Sucedido!',
        description: `Bem-vindo, ${result.user.nome}! Você foi logado automaticamente.`,
        variant: 'default',
      });
      router.push('/organizer/dashboard');
    } else {
      toast({
        title: 'Falha no Cadastro',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5" style={{marginTop: '-56px'}}>
      <div className="card border" style={{width: '100%', maxWidth: '550px'}}> {/* Removed shadow-xl */}
        <div className="card-header p-4 text-center">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
            <UserPlus className="h-8 w-8" /> Cadastro de Organizador
          </h1>
          <p className="card-text text-muted">
            Crie sua conta para começar a gerenciar seus eventos.
          </p>
        </div>
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome da Empresa/Organizador</label>
              <input id="nome" {...register('nome')} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} />
              {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail de Contato</label>
              <input id="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
            
            <div className="mb-3">
              <label htmlFor="whatsapp" className="form-label">WhatsApp (com DDD, somente números)</label>
              <input id="whatsapp" type="tel" {...register('whatsapp')} className={`form-control ${errors.whatsapp ? 'is-invalid' : ''}`} placeholder="Ex: 11988887777" />
              {errors.whatsapp && <div className="invalid-feedback">{errors.whatsapp.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input id="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg fw-semibold" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <UserPlus className="me-2 h-4 w-4" />}
              Cadastrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted small">
              Já possui uma conta?{' '}
              <Link href="/login" className="btn btn-secondary btn-sm text-decoration-none">
                 <LogIn className="me-1 h-4 w-4" /> Faça Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

