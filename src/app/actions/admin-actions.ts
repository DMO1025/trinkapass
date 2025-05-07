'use server';

import { deleteUserById, deleteEventAndSalesById, updateWithdrawalRequestStatus } from '@/lib/data-service.server';
import { revalidatePath } from 'next/cache';
import type { WithdrawalRequestData } from '@/lib/types';

interface ActionResult {
  success: boolean;
  message: string;
}

export async function adminDeleteUserAction(userId: string, currentAdminId: string): Promise<ActionResult> {
  if (userId === currentAdminId) {
    return { success: false, message: 'Não é possível excluir o administrador atualmente logado.' };
  }

  try {
    const result = await deleteUserById(userId);
    if (result.success) {
      revalidatePath('/admin/dashboard');
      return { success: true, message: 'Usuário excluído com sucesso.' };
    }
    return { success: false, message: result.message || 'Falha ao excluir usuário.' };
  } catch (error) {
    console.error('Admin delete user error:', error);
    return { success: false, message: 'Ocorreu um erro ao excluir o usuário.' };
  }
}

export async function adminDeleteEventAction(eventId: string): Promise<ActionResult> {
  try {
    const result = await deleteEventAndSalesById(eventId);
    if (result.success) {
      revalidatePath('/admin/dashboard');
      revalidatePath('/'); // Revalidate homepage if events are listed there
      revalidatePath(`/event/${eventId}`); // Revalidate specific event page if it exists
      return { success: true, message: 'Evento e vendas associadas excluídos com sucesso.' };
    }
    return { success: false, message: result.message || 'Falha ao excluir evento.' };
  } catch (error) {
    console.error('Admin delete event error:', error);
    return { success: false, message: 'Ocorreu um erro ao excluir o evento.' };
  }
}

export async function adminUpdateWithdrawalStatusAction(
  requestId: string,
  status: 'approved' | 'rejected',
  adminNotes?: string
): Promise<ActionResult & { request?: WithdrawalRequestData }> {
  try {
    const updatedRequest = await updateWithdrawalRequestStatus(requestId, status, adminNotes);
    if (updatedRequest) {
      revalidatePath('/admin/dashboard'); // Revalidate admin dashboard to reflect changes
      // Potentially, revalidate organizer's dashboard if they can see withdrawal status
      // revalidatePath(`/organizer/dashboard`); 
      return { 
        success: true, 
        message: `Solicitação de saque ${status === 'approved' ? 'aprovada' : 'rejeitada'} com sucesso.`,
        request: updatedRequest 
      };
    }
    return { success: false, message: 'Falha ao atualizar status da solicitação de saque.' };
  } catch (error) {
    console.error('Admin update withdrawal status error:', error);
    return { success: false, message: 'Ocorreu um erro ao atualizar o status da solicitação.' };
  }
}

