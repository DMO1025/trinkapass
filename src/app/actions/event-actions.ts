// src/app/actions/event-actions.ts
'use server';

import { addEvent, getEventById, updateEvent } from '@/lib/data-service';
import type { EventCreationData, EventData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

interface CreateEventResult {
  success: boolean;
  event?: EventData;
  error?: string;
  fieldErrors?: Record<string, string>;
}

interface UpdateEventResult extends CreateEventResult {}


export async function createEventAction(
  eventDetails: EventCreationData,
  organizerId: string
): Promise<CreateEventResult> {
  // Basic server-side validation (Zod schema validation should also happen on client)
  if (!eventDetails.nome_evento || eventDetails.nome_evento.length < 3) {
    return { success: false, error: 'Nome do evento é obrigatório e deve ter pelo menos 3 caracteres.', fieldErrors: { nome_evento: 'Nome do evento é obrigatório.'} };
  }
  if (!eventDetails.descricao || eventDetails.descricao.length < 10) {
    return { success: false, error: 'Descrição é obrigatória e deve ter pelo menos 10 caracteres.', fieldErrors: { descricao: 'Descrição é obrigatória.'} };
  }
  if (!eventDetails.data_horario) {
    return { success: false, error: 'Data e horário são obrigatórios.', fieldErrors: { data_horario_date: 'Data é obrigatória.', data_horario_time: 'Horário é obrigatório.'} };
  }
  // Check if date is in the past - simple check
  if (new Date(eventDetails.data_horario) < new Date()) {
      return { success: false, error: 'A data do evento não pode ser no passado.', fieldErrors: { data_horario_date: 'Data não pode ser no passado.'} };
  }
  if (eventDetails.nome_local_evento && eventDetails.nome_local_evento.length < 3) {
    return { success: false, error: 'Nome do local do evento deve ter pelo menos 3 caracteres.', fieldErrors: { nome_local_evento: 'Nome do local do evento inválido.' } };
  }
  if (!eventDetails.cep || !/^\d{5}-?\d{3}$/.test(eventDetails.cep)) {
    return { success: false, error: 'CEP é obrigatório e deve estar no formato correto.', fieldErrors: { cep: 'CEP inválido.' } };
  }
  if (!eventDetails.local || eventDetails.local.length < 5) {
    return { success: false, error: 'Endereço (Rua, Bairro, Número) é obrigatório e deve ter pelo menos 5 caracteres.', fieldErrors: { local: 'Endereço é obrigatório.'} };
  }
  if (!eventDetails.cidade || eventDetails.cidade.length < 3) {
    return { success: false, error: 'Cidade é obrigatória e deve ter pelo menos 3 caracteres.', fieldErrors: { cidade: 'Cidade é obrigatória.'} };
  }
  if (eventDetails.preco_ingresso === undefined || eventDetails.preco_ingresso < 0) {
    return { success: false, error: 'Preço do ingresso deve ser um valor positivo ou zero.', fieldErrors: { preco_ingresso: 'Preço inválido.'} };
  }
  if (eventDetails.quantidade_total === undefined || eventDetails.quantidade_total <= 0) {
    return { success: false, error: 'Quantidade total de ingressos deve ser maior que zero.', fieldErrors: { quantidade_total: 'Quantidade inválida.'} };
  }

  if (!organizerId) {
      return { success: false, error: 'ID do organizador não fornecido. Faça login novamente.' };
  }
  if (eventDetails.imagem_url && !eventDetails.imagem_url.startsWith('data:image/')) {
    return { success: false, error: 'Formato de imagem inválido. Use o upload.', fieldErrors: { imagem_url: 'Imagem inválida.' } };
  }


  try {
    const newEvent = await addEvent(eventDetails, organizerId);
    
    revalidatePath('/'); 
    revalidatePath('/organizer/dashboard'); 
    
    return { success: true, event: newEvent };

  } catch (error) {
    console.error('Error creating event:', error);
    let errorMessage = 'Ocorreu um erro ao criar o evento.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function updateEventAction(
  eventId: string,
  eventDetails: EventCreationData,
  organizerId: string
): Promise<UpdateEventResult> {
  // Basic server-side validation
  if (!eventDetails.nome_evento || eventDetails.nome_evento.length < 3) {
    return { success: false, error: 'Nome do evento é obrigatório e deve ter pelo menos 3 caracteres.', fieldErrors: { nome_evento: 'Nome do evento é obrigatório.'} };
  }
  if (!eventDetails.descricao || eventDetails.descricao.length < 10) {
    return { success: false, error: 'Descrição é obrigatória e deve ter pelo menos 10 caracteres.', fieldErrors: { descricao: 'Descrição é obrigatória.'} };
  }
  if (!eventDetails.data_horario) {
    return { success: false, error: 'Data e horário são obrigatórios.', fieldErrors: { data_horario_date: 'Data é obrigatória.', data_horario_time: 'Horário é obrigatório.'} };
  }
  if (new Date(eventDetails.data_horario).toString() === "Invalid Date") {
      return { success: false, error: 'Data do evento inválida.', fieldErrors: { data_horario_date: 'Data inválida.'} };
  }
   if (eventDetails.nome_local_evento && eventDetails.nome_local_evento.length < 3) {
    return { success: false, error: 'Nome do local do evento deve ter pelo menos 3 caracteres.', fieldErrors: { nome_local_evento: 'Nome do local do evento inválido.' } };
  }
  if (!eventDetails.cep || !/^\d{5}-?\d{3}$/.test(eventDetails.cep)) {
    return { success: false, error: 'CEP é obrigatório e deve estar no formato correto.', fieldErrors: { cep: 'CEP inválido.' } };
  }
  if (!eventDetails.local || eventDetails.local.length < 5) {
    return { success: false, error: 'Endereço (Rua, Bairro, Número) é obrigatório e deve ter pelo menos 5 caracteres.', fieldErrors: { local: 'Endereço é obrigatório.'} };
  }
  if (!eventDetails.cidade || eventDetails.cidade.length < 3) {
    return { success: false, error: 'Cidade é obrigatória e deve ter pelo menos 3 caracteres.', fieldErrors: { cidade: 'Cidade é obrigatória.'} };
  }
  if (eventDetails.preco_ingresso === undefined || eventDetails.preco_ingresso < 0) {
    return { success: false, error: 'Preço do ingresso deve ser um valor positivo ou zero.', fieldErrors: { preco_ingresso: 'Preço inválido.'} };
  }
  if (eventDetails.quantidade_total === undefined || eventDetails.quantidade_total <= 0) {
    return { success: false, error: 'Quantidade total de ingressos deve ser maior que zero.', fieldErrors: { quantidade_total: 'Quantidade inválida.'} };
  }

  if (!organizerId) {
      return { success: false, error: 'ID do organizador não fornecido. Faça login novamente.' };
  }
  if (!eventId) {
      return { success: false, error: 'ID do evento não fornecido para atualização.' };
  }
  if (eventDetails.imagem_url && !eventDetails.imagem_url.startsWith('data:image/')) {
    return { success: false, error: 'Formato de imagem inválido. Use o upload.', fieldErrors: { imagem_url: 'Imagem inválida.' } };
  }

  try {
    const existingEvent = await getEventById(eventId);
    if (!existingEvent) {
      return { success: false, error: 'Evento não encontrado para atualização.' };
    }
    if (existingEvent.organizer_id !== organizerId) {
      return { success: false, error: 'Você não tem permissão para editar este evento.' };
    }

    const ticketsSold = existingEvent.quantidade_total - existingEvent.quantidade_disponivel;
    if (eventDetails.quantidade_total < ticketsSold) {
      return { 
        success: false, 
        error: `A nova quantidade total de ingressos (${eventDetails.quantidade_total}) não pode ser menor que a quantidade já vendida (${ticketsSold}).`,
        fieldErrors: { quantidade_total: 'Quantidade total inválida devido aos ingressos já vendidos.'}
      };
    }

    const updatedEvent = await updateEvent(eventId, eventDetails, organizerId);
    
    if (!updatedEvent) {
        return { success: false, error: 'Falha ao atualizar o evento no serviço de dados.' };
    }
    
    revalidatePath('/'); 
    revalidatePath('/organizer/dashboard'); 
    revalidatePath(`/event/${eventId}`); 
    revalidatePath(`/organizer/events/${eventId}/edit`); 
    
    return { success: true, event: updatedEvent };

  } catch (error) {
    console.error('Error updating event:', error);
    let errorMessage = 'Ocorreu um erro ao atualizar o evento.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
