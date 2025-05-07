
'use client';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2, ArrowLeft, CalendarIcon, Search, Upload, Home } from 'lucide-react';
import { useState } from 'react'; 
import { useAuth } from '@/contexts/AuthContext';
import { createEventAction } from '@/app/actions/event-actions';
import { fetchAddressByCepAction } from '@/app/actions/cep-actions';
import type { EventCreationData } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Keep Popover for Calendar
import { Calendar } from '@/components/ui/calendar'; // Keep Calendar
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils'; // For ShadCN components if any are kept
import Image from 'next/image';
import { SERVICE_FEE_PER_TICKET } from '@/lib/constants';

const cepRegex = /^\d{5}-?\d{3}$/;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const createEventSchema = z.object({
  nome_evento: z.string().min(3, { message: 'Nome do evento deve ter pelo menos 3 caracteres.' }),
  descricao: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres.' }),
  data_horario_date: z.date({ required_error: "Data do evento é obrigatória."}),
  data_horario_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Formato de hora inválido (HH:MM)." }),
  nome_local_evento: z.string().min(3, { message: 'Nome do local do evento deve ter pelo menos 3 caracteres.' }).optional().or(z.literal('')),
  cep: z.string().regex(cepRegex, { message: 'CEP inválido (formato XXXXX-XXX ou XXXXXXXX).' }),
  local: z.string().min(5, { message: 'Endereço (Rua, Bairro, Número) deve ter pelo menos 5 caracteres.' }),
  cidade: z.string().min(3, { message: 'Cidade é obrigatória e deve ter pelo menos 3 caracteres.' }),
  preco_ingresso: z.coerce.number().min(0, { message: 'Preço deve ser um valor positivo ou zero.' }), 
  quantidade_total: z.coerce.number().int().min(1, { message: 'Quantidade deve ser pelo menos 1.' }),
  imagem_url: z.string().optional().refine(val => !val || val.startsWith('data:image/'), { message: "Formato de imagem inválido. Use o upload." })
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { organizerUser, isLoading: authIsLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      nome_evento: '',
      descricao: '',
      data_horario_date: undefined,
      data_horario_time: '18:00',
      nome_local_evento: '',
      cep: '',
      local: '',
      cidade: '',
      preco_ingresso: 0,
      quantidade_total: 100,
      imagem_url: '',
    },
  });

  const { register, handleSubmit, control, formState: { errors }, setError: setFormError, setValue, watch } = form;
  const currentCep = watch('cep');

  const handleCepLookup = async () => {
    if (!currentCep || !cepRegex.test(currentCep)) {
      toast({ title: "CEP Inválido", description: "Por favor, insira um CEP válido.", variant: "destructive" });
      return;
    }
    setIsFetchingCep(true);
    const result = await fetchAddressByCepAction(currentCep);
    setIsFetchingCep(false);

    if (result.success && result.data) {
      setValue('cidade', result.data.localidade, { shouldValidate: true });
      const streetAndNeighborhood = `${result.data.logradouro}${result.data.bairro ? `, ${result.data.bairro}` : ''}`;
      setValue('local', streetAndNeighborhood, { shouldValidate: true });
      toast({ title: "CEP Encontrado!", description: "Cidade e endereço (rua/bairro) preenchidos." });
    } else {
      toast({ title: "Erro ao Buscar CEP", description: result.error || "Não foi possível buscar o CEP.", variant: "destructive" });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFormError('imagem_url', { message: `Arquivo muito grande. Máximo ${MAX_FILE_SIZE_MB}MB.` });
        setImagePreview(null);
        setValue('imagem_url', undefined);
        event.target.value = ''; 
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setValue('imagem_url', dataUri, { shouldValidate: true });
        setImagePreview(dataUri);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('imagem_url', undefined);
      setImagePreview(null);
    }
  };

  if (authIsLoading) {
    return <div className="d-flex align-items-center justify-content-center min-vh-100"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!organizerUser) {
    router.replace('/login?redirect=/organizer/dashboard'); 
    return null;
  }

  const onSubmit: SubmitHandler<CreateEventFormValues> = async (data) => {
    if (!organizerUser?.id) {
        toast({ title: 'Erro de Autenticação', description: 'Organizador não identificado. Faça login novamente.', variant: 'destructive' });
        return;
    }
    setIsSubmitting(true);

    const { data_horario_date, data_horario_time, ...restOfData } = data;
    const [hours, minutes] = data_horario_time.split(':').map(Number);
    const combinedDateTime = new Date(data_horario_date);
    combinedDateTime.setHours(hours, minutes);
    
    const eventDetails: EventCreationData = {
      ...restOfData, 
      nome_local_evento: data.nome_local_evento || undefined,
      data_horario: combinedDateTime.toISOString(),
      imagem_url: data.imagem_url || undefined, 
    };

    const result = await createEventAction(eventDetails, organizerUser.id);
    setIsSubmitting(false);

    if (result.success && result.event) {
      toast({
        title: 'Evento Criado!',
        description: `O evento "${result.event.nome_evento}" foi criado com sucesso.`,
        variant: 'default',
      });
      router.push('/organizer/dashboard');
    } else {
      toast({
        title: 'Falha ao Criar Evento',
        description: result.error || 'Verifique os campos e tente novamente.',
        variant: 'destructive',
      });
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          setFormError(field as keyof CreateEventFormValues, { type: 'server', message });
        });
      }
    }
  };

  return (
    <div className="container-fluid container-md py-4 py-md-5">
      <button onClick={() => router.back()} className="btn btn-secondary mb-4 d-flex align-items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Voltar para o Painel
      </button>
      <div className="card border"> {/* Removed shadow-xl */}
        <div className="card-header p-3 p-md-4 bg-light">
          <h1 className="card-title fs-2 fw-bold text-primary d-flex align-items-center gap-2">
            <PlusCircle className="h-8 w-8" /> Criar Novo Evento
          </h1>
          <p className="card-text text-muted">
            Preencha os detalhes abaixo para cadastrar um novo evento. Pagamentos serão processados via Mercado Pago.
          </p>
        </div>
        <div className="card-body p-3 p-md-4">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="nome_evento" className="form-label">Nome do Evento</label>
              <input id="nome_evento" {...register('nome_evento')} className={`form-control ${errors.nome_evento ? 'is-invalid' : ''}`} />
              {errors.nome_evento && <div className="invalid-feedback">{errors.nome_evento.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição</label>
              <textarea id="descricao" {...register('descricao')} className={`form-control ${errors.descricao ? 'is-invalid' : ''}`} rows={4} />
              {errors.descricao && <div className="invalid-feedback">{errors.descricao.message}</div>}
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="data_horario_date" className="form-label">Data do Evento</label>
                <Controller
                  name="data_horario_date"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "form-control text-start d-flex align-items-center", // Bootstrap form-control
                            !field.value && "text-muted"
                          )}
                        >
                          <CalendarIcon className="me-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0"> {/* Popover content remains ShadCN */}
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } 
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.data_horario_date && <div className="text-danger small mt-1">{errors.data_horario_date.message}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="data_horario_time" className="form-label">Horário (HH:MM)</label>
                <input id="data_horario_time" type="time" {...register('data_horario_time')} className={`form-control ${errors.data_horario_time ? 'is-invalid' : ''}`} />
                {errors.data_horario_time && <div className="invalid-feedback">{errors.data_horario_time.message}</div>}
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="nome_local_evento" className="form-label">Nome do Local do Evento (Opcional)</label>
              <div className="input-group">
                 <span className="input-group-text"><Home className="h-5 w-5 text-muted"/></span>
                 <input id="nome_local_evento" {...register('nome_local_evento')} className={`form-control ${errors.nome_local_evento ? 'is-invalid' : ''}`} placeholder="Ex: Ginásio Esportivo Municipal"/>
                 {errors.nome_local_evento && <div className="invalid-feedback">{errors.nome_local_evento.message}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cep" className="form-label">CEP</label>
              <div className="input-group">
                <input id="cep" {...register('cep')} className={`form-control ${errors.cep ? 'is-invalid' : ''}`} placeholder="Ex: 00000-000" />
                <button type="button" onClick={handleCepLookup} disabled={isFetchingCep} className="btn btn-secondary d-flex align-items-center gap-1">
                   {isFetchingCep ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4"/>}
                   <span className="d-none d-sm-inline">Buscar</span>
                </button>
                {errors.cep && <div className="invalid-feedback">{errors.cep.message}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cidade" className="form-label">Cidade</label>
              <input id="cidade" {...register('cidade')} className={`form-control ${errors.cidade ? 'is-invalid' : ''}`} readOnly={isFetchingCep} />
              {errors.cidade && <div className="invalid-feedback">{errors.cidade.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="local" className="form-label">Endereço (Rua, Bairro, Número e Complemento)</label>
              <input id="local" {...register('local')} className={`form-control ${errors.local ? 'is-invalid' : ''}`} placeholder="Ex: Rua Exemplo, Bairro Tal, 123 - Apto 4B"/>
              {errors.local && <div className="invalid-feedback">{errors.local.message}</div>}
              <div className="form-text">Após buscar o CEP, a rua e bairro serão preenchidos. Adicione o número e complemento.</div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="preco_ingresso" className="form-label">Preço do Ingresso (R$)</label>
                <input id="preco_ingresso" type="number" step="0.01" {...register('preco_ingresso')} className={`form-control ${errors.preco_ingresso ? 'is-invalid' : ''}`} />
                {errors.preco_ingresso && <div className="invalid-feedback">{errors.preco_ingresso.message}</div>}
                <div className="form-text">Será adicionada uma taxa de serviço de R$ {SERVICE_FEE_PER_TICKET.toFixed(2)} por ingresso.</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="quantidade_total" className="form-label">Quantidade Total de Ingressos</label>
                <input id="quantidade_total" type="number" {...register('quantidade_total')} className={`form-control ${errors.quantidade_total ? 'is-invalid' : ''}`} />
                {errors.quantidade_total && <div className="invalid-feedback">{errors.quantidade_total.message}</div>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="imagem_upload" className="form-label">Imagem do Evento (Opcional, máx {MAX_FILE_SIZE_MB}MB)</label>
              <div className="input-group">
                <input 
                  id="imagem_upload" 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp, image/gif" 
                  onChange={handleImageChange}
                  className={`form-control ${errors.imagem_url ? 'is-invalid' : ''}`}
                />
                 <span className="input-group-text"><Upload className="h-5 w-5 text-muted"/></span>
                 {errors.imagem_url && <div className="invalid-feedback w-100">{errors.imagem_url.message}</div>}
              </div>
              {imagePreview && (
                <div className="mt-3">
                  <label className="form-label">Pré-visualização:</label>
                  <Image 
                    src={imagePreview} 
                    alt="Pré-visualização da imagem do evento" 
                    width={200} 
                    height={100} 
                    className="img-thumbnail object-fit-cover mt-1"
                    data-ai-hint="event image preview"
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-accent w-100 btn-lg fw-semibold d-flex align-items-center justify-content-center gap-2" disabled={isSubmitting || isFetchingCep}>
              {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <PlusCircle className="me-2 h-4 w-4" />}
              Criar Evento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

