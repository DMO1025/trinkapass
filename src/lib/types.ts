export interface EventData {
  id: string;
  organizer_id: string;
  nome_evento: string;
  descricao: string;
  data_horario: string; // ISO string format e.g., "2025-01-15T18:00:00Z"
  nome_local_evento?: string; // Name of the venue, e.g., "Ginásio Municipal"
  cep?: string; // Brazilian postal code
  local: string; // Venue name / Street, Number, Neighborhood
  cidade: string; 
  preco_ingresso: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  imagem_url?: string; // Optional: Data URL for event's display image from upload, or placeholder URL
  next_sale_reference_number?: number; // Counter for generating Mercado Pago external_reference
}

export interface SaleData {
  id: string; // Internal TrinkaPass Sale ID (UUID)
  evento_id: string;
  nome_comprador: string;
  email_comprador: string;
  whatsapp: string;
  quantidade: number;
  preco_ingresso_unitario: number; // Organizer's price per ticket
  taxa_servico_unitaria: number; // Platform's fee per ticket
  valor_total_item: number; // preco_ingresso_unitario + taxa_servico_unitaria
  valor_total_compra: number; // (preco_ingresso_unitario + taxa_servico_unitaria) * quantidade
  data_compra: string; // ISO string format, when PIX was generated/purchase initiated
  data_pagamento_confirmado?: string; // ISO string, when payment is confirmed
  status: 'pending_payment' | 'paid' | 'failed' | 'cancelled';
  pix_copia_cola_mp?: string; // PIX code from Mercado Pago
  mp_payment_id?: string; // Mercado Pago payment ID
  mercado_pago_external_reference?: string; // The external_reference sent to Mercado Pago (e.g., TRK-EVENTIDSHORT-000000001)
  organizer_net_revenue?: number; // Net revenue for the organizer from this sale
  organizer_revenue_status?: 'pending_clearance' | 'cleared' | 'requested_withdrawal' | 'paid_out'; // Status of the organizer's portion
  organizer_revenue_clearance_date?: string; // ISO string, when this revenue becomes available for withdrawal
}

// Fields provided by the client during purchase initiation
export interface PurchaseInitiationData {
  evento_id: string;
  nome_comprador: string;
  email_comprador: string;
  whatsapp: string;
  quantidade: number;
}

// Data structure for creating a new sale record internally (after MP interaction)
export interface NewSaleDataInternal extends Omit<SaleData, 'id' | 'organizer_net_revenue' | 'organizer_revenue_status' | 'organizer_revenue_clearance_date'> {}


export interface UserData {
  id: string;
  nome: string;
  email: string;
  password_hash: string; // Store hashed passwords
  tipo: 'organizer' | 'admin' | 'buyer'; 
  whatsapp?: string;
  pix_key_type?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  pix_key?: string;
  id_photo_data_uri?: string; // For demo purposes, not secure storage.
  is_verified?: boolean; // Added for organizer verification status
}

export interface OrganizerRegistrationData extends Omit<UserData, 'id' | 'tipo' | 'pix_key_type' | 'pix_key' | 'id_photo_data_uri' | 'is_verified'> {
  // password confirmation can be handled in form schema
}


export interface EventCreationData extends Omit<EventData, 'id' | 'organizer_id' | 'quantidade_disponivel' | 'next_sale_reference_number'> {
  nome_local_evento?: string; // Name of the venue
  cep: string; // CEP is now part of creation data
  imagem_url?: string; // Can be a data URI from upload or undefined/empty
}


export interface PurchaseFormValues {
  nome_comprador: string;
  email_comprador: string;
  whatsapp: string;
  quantidade: number;
}

export interface OrganizerSafeData extends Omit<UserData, 'password_hash'> {
    is_verified?: boolean; // Ensure is_verified is part of safe data
}


export interface UserProfileUpdatePayload {
  nome?: string;
  email?: string;
  whatsapp?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface OrganizerSettingsUpdatePayload {
  pix_key_type?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random' | ''; // Allow empty string for clearing
  pix_key?: string;
  id_photo_data_uri?: string; // For demo purposes
}

export interface ActionResult {
  success: boolean;
  message: string;
}

export interface ActionResultWithUser extends ActionResult {
  user?: OrganizerSafeData;
}


export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // city
  uf: string; // state
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean; 
}

export interface CepActionResult {
  success: boolean;
  data?: ViaCepResponse;
  error?: string;
}

export interface SettingsData {
  mercadoPagoAccessToken?: string;
  serviceFeePerTicket?: number;
}

export interface PlatformSettingsUpdatePayload {
    mercadoPagoAccessToken?: string;
    serviceFeePerTicket?: number;
}


export interface InitiatePurchaseResult {
  success: boolean;
  pixCopyPaste?: string;
  qrCodeBase64?: string; 
  saleId?: string; // Internal TrinkaPass Sale ID
  error?: string;
  totalAmount?: number; 
  mpPaymentId?: string; // Return Mercado Pago Payment ID
  mpExternalReference?: string; // Return the external_reference used with MP
}

export interface CheckPaymentStatusResult {
  success: boolean;
  paymentStatus?: string; // 'approved', 'pending_payment', 'rejected', etc.
  message: string; // User-friendly message
  saleId?: string; // The external_reference from MP, should be our sale ID
  mpPaymentId?: string; // The Mercado Pago payment ID
  organizerWhatsAppNumber?: string;
  prefilledWhatsAppMessageToOrganizer?: string;
}

export interface WithdrawalRequestData {
  id: string;
  organizerId: string;
  organizerName: string;
  organizerWhatsapp?: string;
  amount: number;
  pixKeyType?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  pixKey?: string;
  idPhotoDataUri?: string; // Store the ID photo at the time of request
  requestDate: string; // ISO string
  status: 'pending' | 'approved' | 'rejected';
  processedDate?: string; // ISO string, when status changes from pending
  adminNotes?: string; // Optional notes from admin
}
