'use server';

import { getUserById, updateUser } from '@/lib/data-service.server';
import type { UserProfileUpdatePayload, ActionResultWithUser, UserData, OrganizerSafeData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateUserProfileAction(
  userId: string,
  payload: UserProfileUpdatePayload
): Promise<ActionResultWithUser> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    const updates: Partial<Omit<UserData, 'id' | 'tipo'>> = {};

    if (payload.nome && payload.nome !== user.nome) {
      updates.nome = payload.nome;
    }
    if (payload.email && payload.email !== user.email) {
      // Consider adding validation if email is already taken by another user if it's meant to be unique
      updates.email = payload.email;
    }
    if (payload.whatsapp !== undefined && payload.whatsapp !== user.whatsapp) {
      updates.whatsapp = payload.whatsapp;
    }

    // Handle password change
    if (payload.newPassword) {
      if (!payload.currentPassword) {
        return { success: false, message: 'Senha atual é obrigatória para alterar a senha.' };
      }
      // Plain text password comparison (NEVER use in production for real hashing)
      if (user.password_hash !== payload.currentPassword) {
        return { success: false, message: 'Senha atual incorreta.' };
      }
      // In a real app, hash payload.newPassword here before storing
      updates.password_hash = payload.newPassword;
    }
    
    if (Object.keys(updates).length === 0) {
        return { success: true, message: 'Nenhuma alteração detectada.', user: {id: user.id, nome: user.nome, email: user.email, tipo: user.tipo, whatsapp: user.whatsapp }};
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
      return { success: false, message: 'Falha ao atualizar perfil do usuário.' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...safeUpdatedUser } = updatedUser;

    // Revalidate paths if necessary, e.g., if user's name is displayed in many places
    // revalidatePath('/some-path-displaying-user-info');
    
    return { success: true, message: 'Perfil atualizado com sucesso!', user: safeUpdatedUser };

  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, message: 'Ocorreu um erro ao atualizar o perfil.' };
  }
}
