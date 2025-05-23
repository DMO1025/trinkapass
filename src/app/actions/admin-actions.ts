
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
      revalidatePath('/admin/dashboard'); 
      revalidatePath('/organizer/dashboard'); 
      // Potentially revalidate specific organizer's event buyer pages if their revenue status is shown there
      // Example: Revalidate all potential buyer list pages for that organizer
      // This is broad; ideally, we'd revalidate more specifically if possible.
      // For now, revalidating the organizer's dashboard is the primary concern.
      // if (updatedRequest.organizerId) {
      //    revalidatePath(`/organizer/events/[eventId]/buyers`, 'layout'); // May not work as expected with dynamic segments
      // }

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
