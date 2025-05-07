
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, UserCog, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfileAction } from '@/app/actions/user-actions';
import type { UserProfileUpdatePayload } from '@/lib/types';

const profileSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  whatsapp: z.string().regex(/^\d{10,11}$/, { message: 'WhatsApp inválido (somente números, DDD+Número).' }).optional().or(z.literal('')),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, { message: 'Nova senha deve ter pelo menos 6 caracteres.' }).optional().or(z.literal('')),
  confirmNewPassword: z.string().optional(),
})
.refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: 'Senha atual é obrigatória para definir uma nova senha.',
    path: ['currentPassword'],
})
.refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'As novas senhas não coincidem.',
  path: ['confirmNewPassword'],
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AdminProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { adminUser, adminLogin, isLoading: authIsLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: '',
      email: '',
      whatsapp: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, setError: setFormError } = form;

  useEffect(() => {
    if (!authIsLoading && adminUser) {
      reset({
        nome: adminUser.nome,
        email: adminUser.email,
        whatsapp: adminUser.whatsapp || '',
      });
    } else if (!authIsLoading && !adminUser) {
        router.replace('/login?redirect=/admin/dashboard');
    }
  }, [authIsLoading, adminUser, reset, router]);

  if (authIsLoading || !adminUser) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-2">Carregando perfil...</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!adminUser?.id) {
      toast({ title: 'Erro de Autenticação', description: 'ID do administrador não encontrado.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);

    const payload: UserProfileUpdatePayload = {
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp || undefined, 
    };

    if (data.newPassword) {
      payload.currentPassword = data.currentPassword;
      payload.newPassword = data.newPassword;
    }

    const result = await updateUserProfileAction(adminUser.id, payload);
    setIsSubmitting(false);

    if (result.success && result.user) {
      toast({
        title: 'Perfil Atualizado!',
        description: 'Suas informações foram atualizadas com sucesso.',
        variant: 'default',
      });
      adminLogin(result.user); 
      reset({ 
        nome: result.user.nome,
        email: result.user.email,
        whatsapp: result.user.whatsapp || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } else {
      toast({
        title: 'Falha ao Atualizar Perfil',
        description: result.message,
        variant: 'destructive',
      });
       if (result.message.toLowerCase().includes("senha atual incorreta")) {
        setFormError("currentPassword", { type: "server", message: result.message });
      }
    }
  };

  return (
    <div className="container-fluid container-md py-4 py-md-5" style={{maxWidth: '720px'}}>
      <button onClick={() => router.push('/admin/dashboard')} className="btn btn-secondary mb-4 d-flex align-items-center gap-2">
        <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel
      </button>
      <div className="card border"> {/* Removed shadow-xl */}
        <div className="card-header p-3 p-md-4 bg-light">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center gap-2">
            <UserCog className="h-8 w-8" /> Editar Perfil de Administrador
          </h1>
          <p className="card-text text-muted">
            Atualize suas informações pessoais e senha.
          </p>
        </div>
        <div className="card-body p-3 p-md-4">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input id="nome" {...register('nome')} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} />
              {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input id="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="whatsapp" className="form-label">WhatsApp (Opcional)</label>
              <input id="whatsapp" type="tel" {...register('whatsapp')} className={`form-control ${errors.whatsapp ? 'is-invalid' : ''}`} placeholder="Ex: 11988887777" />
              {errors.whatsapp && <div className="invalid-feedback">{errors.whatsapp.message}</div>}
            </div>
            
            <div className="card p-3 p-md-4 mb-4 border-primary-subtle">
              <h3 className="fs-5 fw-semibold text-primary mb-2 d-flex align-items-center gap-1"><ShieldAlert size={20}/> Alterar Senha</h3>
              <p className="small text-muted mb-3">Deixe em branco se não deseja alterar a senha.</p>
              <div className="vstack gap-3">
                <div>
                  <label htmlFor="currentPassword" className="form-label">Senha Atual</label>
                  <input id="currentPassword" type="password" {...register('currentPassword')} className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`} autoComplete="current-password" />
                  {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword.message}</div>}
                </div>
                <div>
                  <label htmlFor="newPassword" className="form-label">Nova Senha</label>
                  <input id="newPassword" type="password" {...register('newPassword')} className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`} autoComplete="new-password" />
                  {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="form-label">Confirmar Nova Senha</label>
                  <input id="confirmNewPassword" type="password" {...register('confirmNewPassword')} className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : ''}`} autoComplete="new-password" />
                  {errors.confirmNewPassword && <div className="invalid-feedback">{errors.confirmNewPassword.message}</div>}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Save className="me-2 h-4 w-4" />}
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

