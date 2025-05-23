// src/app/actions/settings-actions.ts
'use server';

import { updateSettings, getSettings } from '@/lib/data-service.server';
import type { ActionResult, PlatformSettingsUpdatePayload } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updatePlatformSettingsAction(payload: PlatformSettingsUpdatePayload): Promise<ActionResult> {
  if (payload.mercadoPagoAccessToken && payload.mercadoPagoAccessToken.trim() === '') {
    // Note: Storing MP Access Token from dashboard is less secure than env var.
    // Env var should ideally take precedence. This allows override for demo/specific cases.
    // payload.mercadoPagoAccessToken = undefined; // Or handle as error depending on policy
  }
  if (payload.serviceFeePerTicket !== undefined && payload.serviceFeePerTicket < 0) {
    return { success: false, message: 'Taxa de serviço por ingresso deve ser um valor positivo ou zero.'};
  }

  try {
    await updateSettings(payload); // This now updates MongoDB
    revalidatePath('/admin/settings');
    return { success: true, message: 'Configurações da plataforma atualizadas com sucesso.' };
  } catch (error) {
    console.error("Error updating platform settings:", error);
    return { success: false, message: "Ocorreu um erro ao atualizar as configurações da plataforma."};
  }
}

export async function getServiceFeeAction(): Promise<number> {
    const settings = await getSettings(); // This now reads from MongoDB or defaults
    return settings.serviceFeePerTicket || 0; 
}
