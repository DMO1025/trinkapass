// src/app/actions/organizer-settings-actions.ts
'use server';

import { getUserById, updateUser } from '@/lib/data-service.server';
import type { OrganizerSettingsUpdatePayload, ActionResultWithUser, UserData, OrganizerSafeData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateOrganizerSettingsAction(
  userId: string,
  payload: OrganizerSettingsUpdatePayload
): Promise<ActionResultWithUser> {
  try {
    const user = await getUserById(userId);
    if (!user || user.tipo !== 'organizer') {
      return { success: false, message: 'Organizador não encontrado ou inválido.' };
    }

    const updates: Partial<Pick<UserData, 'pix_key_type' | 'pix_key' | 'id_photo_data_uri' | 'is_verified'>> = {};
    let changed = false;

    let newPixKeyType = user.pix_key_type;
    let newPixKey = user.pix_key;
    let newIdPhotoDataUri = user.id_photo_data_uri;


    if (payload.pix_key_type !== undefined) {
      const value = payload.pix_key_type === '' ? undefined : payload.pix_key_type;
      if (value !== user.pix_key_type) {
        updates.pix_key_type = value;
        newPixKeyType = value;
        changed = true;
      }
    }

    if (payload.pix_key !== undefined) {
      const value = payload.pix_key === '' ? undefined : payload.pix_key;
      if (value !== user.pix_key) {
        updates.pix_key = value;
        newPixKey = value;
        changed = true;
      }
    }
    
    if (payload.id_photo_data_uri !== undefined) {
       const value = payload.id_photo_data_uri === '' ? undefined : payload.id_photo_data_uri;
       if (value !== user.id_photo_data_uri) {
        updates.id_photo_data_uri = value;
        newIdPhotoDataUri = value;
        changed = true;
      }
    }
    
    // Determine verification status based on presence of PIX key and ID photo
    const isNowVerified = !!(newPixKeyType && newPixKey && newIdPhotoDataUri);
    if (isNowVerified !== user.is_verified) {
      updates.is_verified = isNowVerified;
      changed = true;
    }
    
    if (!changed) {
        const safeUser: OrganizerSafeData = { 
            id: user.id, 
            nome: user.nome, 
            email: user.email, 
            tipo: user.tipo, 
            whatsapp: user.whatsapp, 
            pix_key_type: user.pix_key_type, 
            pix_key: user.pix_key, 
            id_photo_data_uri: user.id_photo_data_uri,
            is_verified: user.is_verified 
        };
        return { success: true, message: 'Nenhuma alteração foi enviada ou os valores são os mesmos.', user: safeUser };
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
      return { success: false, message: 'Falha ao atualizar configurações do organizador.' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...safeUpdatedUser } = updatedUser;
    
    revalidatePath('/organizer/settings/withdrawal');
    revalidatePath('/organizer/dashboard'); 
    // Revalidate paths related to sales if organizer verification impacts revenue display/status
    // For example, if a cron job or other process updates sale.organizer_revenue_status
    // revalidatePath('/organizer/events/.*/buyers'); // Example, adjust as needed
    
    return { success: true, message: 'Configurações de saque e verificação atualizadas com sucesso!', user: safeUpdatedUser };

  } catch (error) {
    console.error('Update organizer settings error:', error);
    return { success: false, message: 'Ocorreu um erro ao atualizar as configurações.' };
  }
}
