// src/services/mercado-pago-service.ts
'use server';

interface CreatePixPaymentMPResult {
  success: boolean;
  pixCopyPaste?: string;
  qrCodeBase64?: string; 
  paymentId?: string; 
  error?: string;
}

export interface PaymentStatusMPResult {
  success: boolean;
  status?: string; 
  paymentId?: string;
  externalReference?: string;
  error?: string;
}

export async function createPixPaymentMP(
  amount: number,
  description: string,
  payerEmail: string,
  externalReference: string 
): Promise<CreatePixPaymentMPResult> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('Mercado Pago Access Token is not configured in environment variables.');
    return { success: false, error: 'Configuração de pagamento indisponível. Verifique as configurações do administrador.' };
  }

  const formattedAmount = parseFloat(amount.toFixed(2));

  const paymentData = {
    transaction_amount: formattedAmount,
    description: description,
    payment_method_id: 'pix',
    payer: {
      email: payerEmail,
    },
    external_reference: externalReference,
    // notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL, // Ensure this is set in your env
  };

  try {
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Idempotency-Key': externalReference, 
      },
      body: JSON.stringify(paymentData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Mercado Pago API Error creating payment:', responseData);
      const errorMessage = responseData.message || `Erro ${response.status} ao criar pagamento PIX.`;
      let displayMessage = 'Falha ao gerar PIX junto ao Mercado Pago.';
      if (responseData.cause && Array.isArray(responseData.cause) && responseData.cause.length > 0) {
        const firstCause = responseData.cause[0];
        if (firstCause.code && firstCause.description) {
            if (firstCause.description.includes('payer.email') || firstCause.description.includes('external_reference')) {
                 displayMessage = `Detalhe do erro: ${firstCause.description}`;
            }
        }
      } else if (errorMessage.includes('transaction_amount')) {
        displayMessage = 'Valor da transação inválido para o Mercado Pago.'
      }
      return { success: false, error: displayMessage };
    }

    const pixCopyPaste = responseData.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 = responseData.point_of_interaction?.transaction_data?.qr_code_base64;
    const paymentId = responseData.id?.toString();

    if (!pixCopyPaste) {
        console.error('Mercado Pago API did not return PIX copy/paste code:', responseData);
        return { success: false, error: 'Não foi possível obter o código PIX Copia e Cola do Mercado Pago.' };
    }

    return {
      success: true,
      pixCopyPaste,
      qrCodeBase64,
      paymentId,
    };

  } catch (error) {
    console.error('Network or other error creating Mercado Pago PIX payment:', error);
    return { success: false, error: 'Erro de comunicação ao tentar gerar PIX. Tente novamente.' };
  }
}


export async function getPaymentStatusMP(mpPaymentId: string): Promise<PaymentStatusMPResult> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('Mercado Pago Access Token is not configured.');
    return { success: false, error: 'Configuração de pagamento indisponível.' };
  }

  if (!mpPaymentId) {
    return { success: false, error: 'ID do Pagamento Mercado Pago não fornecido.' };
  }

  try {
    // console.log(`Fetching payment status for MP Payment ID: ${mpPaymentId}`);
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${mpPaymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();
    // console.log(`MP API Response for ${mpPaymentId} status: ${response.status}`, responseData);

    if (!response.ok) {
      console.error(`Mercado Pago API Error fetching payment status for ID ${mpPaymentId}:`, responseData);
      return {
        success: false,
        error: responseData.message || `Erro ${response.status} ao buscar status do pagamento.`,
        paymentId: mpPaymentId
      };
    }

    return {
      success: true,
      status: responseData.status,
      paymentId: responseData.id?.toString(),
      externalReference: responseData.external_reference,
    };

  } catch (error) {
    console.error(`Network or other error fetching Mercado Pago payment status for ID ${mpPaymentId}:`, error);
    return {
      success: false,
      error: 'Erro de comunicação ao verificar status do pagamento.',
      paymentId: mpPaymentId
    };
  }
}
