'use server';

import type { ViaCepResponse, CepActionResult } from '@/lib/types';

export async function fetchAddressByCepAction(cep: string): Promise<CepActionResult> {
  const cleanedCep = cep.replace(/\D/g, ''); // Remove non-digits

  if (cleanedCep.length !== 8) {
    return { success: false, error: 'CEP inválido. Deve conter 8 dígitos.' };
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    if (!response.ok) {
      // ViaCEP might return non-200 for errors like too many requests, though usually it's 200 with "erro: true"
      console.error(`ViaCEP API request failed with status ${response.status} for CEP ${cleanedCep}`);
      return { success: false, error: `Falha ao buscar CEP. Status: ${response.status}` };
    }

    const data: ViaCepResponse = await response.json();

    if (data.erro) {
      return { success: false, error: 'CEP não encontrado.' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching CEP data:', error);
    return { success: false, error: 'Ocorreu um erro ao buscar o CEP. Verifique sua conexão.' };
  }
}
