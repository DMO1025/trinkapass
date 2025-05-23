
'use server';

import { updateSettings, getSettings } from '@/lib/data-service.server'; // Added getSettings import
import type { ActionResult, PlatformSettingsUpdatePayload } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updatePlatformSettingsAction(payload: PlatformSettingsUpdatePayload): Promise<ActionResult> {
  if (payload.mercadoPagoAccessToken && payload.mercadoPagoAccessToken.trim() === '') {
    return { success: false, message: 'Access Token do Mercado Pago não pode estar vazio se fornecido.' };
  }
  if (payload.serviceFeePerTicket !== undefined && payload.serviceFeePerTicket < 0) {
    return { success: false, message: 'Taxa de serviço por ingresso deve ser um valor positivo ou zero.'};
  }

  try {
    await updateSettings(payload);
    revalidatePath('/admin/settings');
    return { success: true, message: 'Configurações da plataforma atualizadas com sucesso.' };
  } catch (error) {
    console.error("Error updating platform settings:", error);
    return { success: false, message: "Ocorreu um erro ao atualizar as configurações da plataforma."};
  }
}


export async function getServiceFeeAction(): Promise<number> {
    const settings = await getSettings();
    return settings.serviceFeePerTicket || 0; // Fallback to 0 if not set
}

