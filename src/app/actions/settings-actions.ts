'use server';

import { updateSettings, getSettings } from '@/lib/data-service.server';
import type { ActionResult, SettingsData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateMercadoPagoSettingsAction(accessToken: string): Promise<ActionResult> {
  if (!accessToken || accessToken.trim() === '') {
    return { success: false, message: 'Access Token do Mercado Pago não pode estar vazio.' };
  }

  try {
    const currentSettings = await getSettings();
    const newSettings: SettingsData = {
      ...currentSettings,
      mercadoPagoAccessToken: accessToken,
    };
    await updateSettings(newSettings);
    
    // Revalidate admin settings page if it exists or other relevant paths
    revalidatePath('/admin/settings');
    
    return { success: true, message: 'Configurações do Mercado Pago atualizadas com sucesso.' };
  } catch (error) {
    console.error('Error updating Mercado Pago settings:', error);
    return { success: false, message: 'Ocorreu um erro ao atualizar as configurações do Mercado Pago.' };
  }
}

export async function getMercadoPagoSettingsAction(): Promise<SettingsData> {
    return getSettings();
}
