
'use client';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Settings2, ShieldCheck, Upload, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateOrganizerSettingsAction } from '@/app/actions/organizer-settings-actions';
import type { OrganizerSettingsUpdatePayload } from '@/lib/types';
import Image from 'next/image';
// ShadCN Select components are kept as Bootstrap select needs more custom JS for value handling with React Hook Form or a specific library.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils'; // For ShadCN components

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const EMPTY_SELECT_VALUE = "__EMPTY_SELECTION__"; // Unique value for the "clear" option

const pixKeyTypeSchema = z.enum(['cpf', 'cnpj', 'email', 'phone', 'random', ''], {
  errorMap: () => ({ message: 'Selecione um tipo de chave PIX válido.' })
});

const withdrawalSettingsSchema = z.object({
  pix_key_type: pixKeyTypeSchema.optional(),
  pix_key: z.string().optional(),
  id_photo_data_uri: z.string().optional().refine(val => !val || val.startsWith('data:image/'), { message: "Formato de imagem inválido. Use o upload." }),
}).refine(data => {
  // If pix_key_type is set (and not empty representing 'none'), pix_key must be present.
  if (data.pix_key_type && data.pix_key_type !== '' && !data.pix_key) {
    return false; 
  }
  // If pix_key is set, pix_key_type must be present (and not empty representing 'none').
  if (data.pix_key && (!data.pix_key_type || data.pix_key_type === '')) {
    return false; 
  }
  return true;
}, {
  message: 'Se você fornecer uma Chave PIX, o Tipo da Chave PIX também é obrigatório, e vice-versa.',
  path: ['pix_key'], 
});

type WithdrawalSettingsFormValues = z.infer<typeof withdrawalSettingsSchema>;

export default function OrganizerWithdrawalSettingsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { organizerUser, organizerLogin, isLoading: authIsLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<WithdrawalSettingsFormValues>({
    resolver: zodResolver(withdrawalSettingsSchema),
    defaultValues: {
      pix_key_type: '', // Represents "none" or "clear" in the schema
      pix_key: '',
      id_photo_data_uri: '',
    },
  });

  const { register, handleSubmit, control, formState: { errors }, reset, setValue, setError: setFormError, watch } = form;

  useEffect(() => {
    if (!authIsLoading && organizerUser) {
      reset({
        pix_key_type: organizerUser.pix_key_type || '', // Default to empty string if undefined
        pix_key: organizerUser.pix_key || '',
        id_photo_data_uri: organizerUser.id_photo_data_uri || '', 
      });
      if (organizerUser.id_photo_data_uri) {
        setImagePreview(organizerUser.id_photo_data_uri);
      } else {
        setImagePreview(null);
      }
    } else if (!authIsLoading && !organizerUser) {
        router.replace('/login?redirect=/organizer/dashboard');
    }
  }, [authIsLoading, organizerUser, reset, router]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFormError('id_photo_data_uri', { message: `Arquivo muito grande. Máximo ${MAX_FILE_SIZE_MB}MB.` });
        event.target.value = ''; 
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setValue('id_photo_data_uri', dataUri, { shouldValidate: true });
        setImagePreview(dataUri);
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected (e.g., user clears the file input), reset to original or empty
      setValue('id_photo_data_uri', organizerUser?.id_photo_data_uri || '', { shouldValidate: true });
      setImagePreview(organizerUser?.id_photo_data_uri || null);
    }
  };

  if (authIsLoading || !organizerUser) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ms-2">Carregando configurações...</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<WithdrawalSettingsFormValues> = async (data) => {
    if (!organizerUser?.id) {
      toast({ title: 'Erro de Autenticação', description: 'ID do organizador não encontrado.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);

    const payload: OrganizerSettingsUpdatePayload = {
      pix_key_type: data.pix_key_type as OrganizerSettingsUpdatePayload['pix_key_type'], // data.pix_key_type will be '' if "Nenhum" is selected
      pix_key: data.pix_key || undefined,
      id_photo_data_uri: data.id_photo_data_uri || undefined,
    };
    
    const result = await updateOrganizerSettingsAction(organizerUser.id, payload);
    setIsSubmitting(false);

    if (result.success && result.user) {
      toast({
        title: 'Configurações Atualizadas!',
        description: result.message || 'Suas informações de saque e verificação foram atualizadas.',
        variant: 'default',
      });
      organizerLogin(result.user); 
    } else {
      toast({
        title: 'Falha ao Atualizar Configurações',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container-fluid container-md py-4 py-md-5" style={{maxWidth: '720px'}}>
      <button onClick={() => router.push('/organizer/dashboard')} className="btn btn-secondary mb-4 d-flex align-items-center gap-2">
        <ArrowLeft className="me-2 h-4 w-4" /> Voltar para o Painel
      </button>
      <div className="card border"> {/* Removed shadow-xl */}
        <div className="card-header p-3 p-md-4 bg-light">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center gap-2">
            <Settings2 className="h-8 w-8" /> Configurações de Saque e Verificação
          </h1>
          <p className="card-text text-muted">
            Defina sua chave PIX para recebimentos e envie sua documentação para verificação.
          </p>
        </div>
        <div className="card-body p-3 p-md-4">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="card p-3 p-md-4 mb-4 border-primary-subtle">
                <h3 className="fs-5 fw-semibold text-primary mb-3 d-flex align-items-center gap-2"><CreditCard/> Chave PIX para Recebimento</h3>
                <div className="vstack gap-3">
                    <div>
                        <label htmlFor="pix_key_type" className="form-label">Tipo da Chave PIX</label>
                        <Controller
                            name="pix_key_type"
                            control={control}
                            render={({ field }) => (
                                <Select 
                                  onValueChange={(value) => field.onChange(value === EMPTY_SELECT_VALUE ? '' : value)}
                                  value={field.value === '' || field.value === undefined ? EMPTY_SELECT_VALUE : field.value}
                                >
                                <SelectTrigger id="pix_key_type" className={cn("form-select", errors.pix_key_type && "is-invalid")}>
                                    <SelectValue placeholder="Selecione o tipo da chave" />
                                </SelectTrigger>
                                <SelectContent> 
                                    <SelectItem value={EMPTY_SELECT_VALUE}>Nenhum (Limpar)</SelectItem>
                                    <SelectItem value="cpf">CPF</SelectItem>
                                    <SelectItem value="cnpj">CNPJ</SelectItem>
                                    <SelectItem value="email">E-mail</SelectItem>
                                    <SelectItem value="phone">Telefone</SelectItem>
                                    <SelectItem value="random">Chave Aleatória</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.pix_key_type && <div className="invalid-feedback d-block">{errors.pix_key_type.message}</div>}
                    </div>
                    <div>
                        <label htmlFor="pix_key" className="form-label">Chave PIX</label>
                        <input id="pix_key" {...register('pix_key')} className={`form-control ${errors.pix_key ? 'is-invalid' : ''}`} placeholder="Sua chave PIX"/>
                        {errors.pix_key && <div className="invalid-feedback">{errors.pix_key.message}</div>}
                    </div>
                </div>
                 {errors.root && <div className="text-danger small mt-1">{errors.root.message}</div>}
            </div>
            
            <div className="card p-3 p-md-4 mb-4 border-accent-subtle">
                <h3 className="fs-5 fw-semibold text-accent mb-3 d-flex align-items-center gap-2"><ShieldCheck/> Verificação de Identidade (Demonstração)</h3>
                 <p className="small text-muted mb-3">
                    Para sua segurança e conformidade, em um sistema real, seria necessário verificar sua identidade. 
                    Esta é uma simulação. Envie uma foto sua segurando seu documento de RG ou CNH (ou clique em limpar para remover).
                  </p>
                <div>
                  <label htmlFor="id_photo_upload" className="form-label">Foto segurando o Documento (Máx {MAX_FILE_SIZE_MB}MB)</label>
                   <div className="input-group mb-2">
                    <input 
                      id="id_photo_upload" 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp" 
                      onChange={handleImageChange}
                      className={`form-control ${errors.id_photo_data_uri ? 'is-invalid' : ''}`}
                    />
                     <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                            setValue('id_photo_data_uri', '', { shouldValidate: true });
                            setImagePreview(null);
                            const fileInput = document.getElementById('id_photo_upload') as HTMLInputElement;
                            if (fileInput) fileInput.value = '';
                        }}
                    >
                        Limpar
                    </button>
                    {errors.id_photo_data_uri && <div className="invalid-feedback w-100">{errors.id_photo_data_uri.message}</div>}
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <label className="form-label small">Pré-visualização:</label>
                      <Image 
                        src={imagePreview} 
                        alt="Pré-visualização do documento" 
                        width={200} 
                        height={150} 
                        className="img-thumbnail object-fit-contain mt-1 bg-light"
                        data-ai-hint="identity document preview"
                      />
                    </div>
                  )}
                  <p className="form-text small mt-2">
                    <strong>Atenção:</strong> Em uma aplicação real, esta imagem seria enviada para um servidor seguro para verificação. 
                    Não envie documentos reais neste ambiente de demonstração.
                  </p>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Save className="me-2 h-4 w-4" />}
              Salvar Configurações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

    

