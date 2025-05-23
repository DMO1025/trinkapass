
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Settings as SettingsIcon, AlertTriangle, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updatePlatformSettingsAction } from '@/app/actions/settings-actions';
import { getSettings } from '@/lib/data-service.server';
import type { PlatformSettingsUpdatePayload, SettingsData } from '@/lib/types';

const settingsSchema = z.object({
  mercadoPagoAccessToken: z.string().optional(), // Optional as it's mainly from env
  serviceFeePerTicket: z.coerce.number().min(0, { message: "Taxa de serviço deve ser positiva ou zero."}).optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { adminUser, isLoading: authIsLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      mercadoPagoAccessToken: '', 
      serviceFeePerTicket: 2.00, // Default
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    if (!authIsLoading && !adminUser) {
      router.replace('/login?redirect=/admin/dashboard');
    }
    async function fetchCurrentSettings() {
        if (adminUser) {
            setIsLoadingSettings(true);
            try {
                const currentSettings: SettingsData = await getSettings();
                 reset({
                    // mercadoPagoAccessToken: currentSettings.mercadoPagoAccessToken || '', // Still not showing for security
                    serviceFeePerTicket: currentSettings.serviceFeePerTicket !== undefined ? currentSettings.serviceFeePerTicket : 2.00,
                });
            } catch (error) {
                console.error("Failed to fetch current settings:", error);
                toast({ title: "Erro", description: "Não foi possível carregar as configurações atuais.", variant: "destructive"});
            } finally {
                setIsLoadingSettings(false);
            }
        }
    }
    if (!authIsLoading && adminUser) {
      fetchCurrentSettings();
    }

  }, [authIsLoading, adminUser, router, reset, toast]);

  if (authIsLoading || isLoadingSettings) { 
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-2">Carregando configurações...</p>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    setIsSubmitting(true);
    const payload: PlatformSettingsUpdatePayload = {};
    if (data.mercadoPagoAccessToken && data.mercadoPagoAccessToken.trim() !== "") {
      // This is mostly demonstrative as the token is primarily from env vars
      payload.mercadoPagoAccessToken = data.mercadoPagoAccessToken;
    }
    if (data.serviceFeePerTicket !== undefined) {
        payload.serviceFeePerTicket = data.serviceFeePerTicket;
    }

    const result = await updatePlatformSettingsAction(payload);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Configurações Salvas!',
        description: result.message,
        variant: 'default',
      });
      // Optionally re-fetch or update form defaults if needed
      // reset({ mercadoPagoAccessToken: '', serviceFeePerTicket: data.serviceFeePerTicket });
    } else {
      toast({
        title: 'Falha ao Salvar',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container-fluid container-md py-4 py-md-5" style={{maxWidth: '720px'}}>
      <button onClick={() => router.push('/admin/dashboard')} className="btn btn-secondary mb-4 d-flex align-items-center gap-2">
        <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel
      </button>
      <div className="card border">
        <div className="card-header p-3 p-md-4 bg-light">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center gap-2">
            <SettingsIcon className="h-8 w-8" /> Configurações da Plataforma
          </h1>
          <p className="card-text text-muted">
            Gerencie as integrações e configurações da plataforma TrinkaPass.
          </p>
        </div>
        <div className="card-body p-3 p-md-4">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="card p-3 p-md-4 mb-4 border-primary-subtle">
                <h3 className="fs-5 fw-semibold text-primary mb-1">Integração Mercado Pago</h3>
                <p className="small text-muted mb-3">
                    O Access Token do Mercado Pago é gerenciado através de variáveis de ambiente no servidor (<code>MERCADO_PAGO_ACCESS_TOKEN</code>).
                </p>
                <div>
                    <label htmlFor="mercadoPagoAccessToken" className="form-label">Access Token do Mercado Pago (Referência)</label>
                    <input
                        id="mercadoPagoAccessToken"
                        type="password" 
                        {...register('mercadoPagoAccessToken')}
                        className={`form-control ${errors.mercadoPagoAccessToken ? 'is-invalid' : ''}`}
                        placeholder="Definido no servidor via variável de ambiente"
                        readOnly 
                    />
                    {errors.mercadoPagoAccessToken && <div className="invalid-feedback">{errors.mercadoPagoAccessToken.message}</div>}
                    <div className="form-text small">
                        Este token é sensível e configurado no ambiente do servidor. Alterações aqui são apenas demonstrativas.
                    </div>
                </div>
            </div>
            
            <div className="card p-3 p-md-4 mb-4 border-accent-subtle">
                <h3 className="fs-5 fw-semibold text-accent mb-3 d-flex align-items-center gap-2">
                    <DollarSign /> Taxa de Serviço
                </h3>
                <div>
                    <label htmlFor="serviceFeePerTicket" className="form-label">Taxa de Serviço por Ingresso (R$)</label>
                    <input
                        id="serviceFeePerTicket"
                        type="number"
                        step="0.01"
                        {...register('serviceFeePerTicket')}
                        className={`form-control ${errors.serviceFeePerTicket ? 'is-invalid' : ''}`}
                        placeholder="Ex: 2.00"
                    />
                    {errors.serviceFeePerTicket && <div className="invalid-feedback">{errors.serviceFeePerTicket.message}</div>}
                    <div className="form-text small">
                        Valor cobrado pela plataforma por cada ingresso vendido.
                    </div>
                </div>
            </div>


            <button type="submit" className="btn btn-primary w-100 btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Save className="me-2 h-4 w-4" />}
              Salvar Configurações
            </button>
          </form>
        </div>
      </div>
       <div className="card mt-4 border-danger-subtle bg-danger-subtle">
        <div className="card-body d-flex align-items-start gap-3 p-3">
          <AlertTriangle className="h-5 w-5 text-danger mt-1 flex-shrink-0" />
          <div>
            <h4 className="fw-semibold text-danger small">Atenção: Segurança dos Tokens</h4>
            <p className="small text-dark mb-0">
              Access Tokens e chaves de API são informações sensíveis. Em um ambiente de produção real,
              eles devem ser gerenciados através de variáveis de ambiente seguras no servidor ou
              serviços de gerenciamento de segredos, e não armazenados diretamente em arquivos de configuração
              versionados ou editáveis por uma interface de usuário desta forma.
              Esta interface é para fins de demonstração.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

