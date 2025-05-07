// src/lib/data-service.ts
'use server';

import fs from 'fs/promises';
import path from 'path';
import type { EventData, SaleData, NewSaleDataInternal, UserData, EventCreationData, SettingsData, WithdrawalRequestData } from './types';
import { v4 as uuidv4 } from 'uuid'; 

const dataDir = path.join(process.cwd(), 'src', 'data');
const eventsFilePath = path.join(dataDir, 'eventos.json');
const salesFilePath = path.join(dataDir, 'vendas.json');
const usersFilePath = path.join(dataDir, 'usuarios.json');
const settingsFilePath = path.join(dataDir, 'settings.json');
const withdrawalRequestsFilePath = path.join(dataDir, 'withdrawal-requests.json');

// Helper to read JSON
async function readJsonFile<T>(filePath: string, defaultValue?: T): Promise<T> {
  try {
    await fs.access(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // If file doesn't exist, create it with default value or empty structure
      const dataToStore = defaultValue !== undefined ? defaultValue : (filePath.endsWith('s.json') || filePath.endsWith('os.json') ? [] : {});
      await fs.writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
      return dataToStore as T;
    }
    console.error(`Error accessing file ${filePath}:`, error);
    throw error; // Re-throw other errors
  }
  // File exists, proceed to read and parse
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error(`Error reading or parsing JSON from ${filePath}:`, error);
    // Fallback to default value if provided on read/parse error
    if (defaultValue !== undefined) return defaultValue;
    // Specific fallback for list-like files if no default is provided
    if (filePath.endsWith('s.json') || filePath.endsWith('os.json')) { 
      return [] as T; // Treat as empty list on error if it's a list file
    }
    throw error; // Re-throw other errors
  }
}

// Helper to write JSON
async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');
  } catch (error) {
    console.error(`Error writing JSON to ${filePath}:`, error);
    throw error;
  }
}

// Settings functions
export async function getSettings(): Promise<SettingsData> {
  return readJsonFile<SettingsData>(settingsFilePath, { mercadoPagoAccessToken: '' });
}

export async function updateSettings(newSettings: Partial<SettingsData>): Promise<SettingsData> {
  const currentSettings = await getSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  await writeJsonFile(settingsFilePath, updatedSettings);
  return updatedSettings;
}


// Event functions
export async function getEvents(): Promise<EventData[]> {
  return readJsonFile<EventData[]>(eventsFilePath, []);
}

export async function getEventById(id: string): Promise<EventData | undefined> {
  const events = await getEvents();
  return events.find(event => event.id === id);
}

export async function getEventsByOrganizerId(organizerId: string): Promise<EventData[]> {
  const events = await getEvents();
  return events.filter(event => event.organizer_id === organizerId);
}

export async function addEvent(eventDetails: EventCreationData, organizerId: string): Promise<EventData> {
  const events = await getEvents();
  
  const newEvent: EventData = {
    id: `evt-${uuidv4()}`,
    organizer_id: organizerId,
    ...eventDetails, 
    quantidade_disponivel: eventDetails.quantidade_total,
    imagem_url: eventDetails.imagem_url || undefined,
    next_sale_reference_number: 1, // Initialize counter
  };
  events.push(newEvent);
  await writeJsonFile(eventsFilePath, events);
  return newEvent;
}

export async function updateEventSaleReferenceCounter(eventId: string, newCounterValue: number): Promise<boolean> {
    const events = await getEvents();
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex === -1) {
        console.error(`Event with ID ${eventId} not found for counter update.`);
        return false;
    }
    events[eventIndex].next_sale_reference_number = newCounterValue;
    await writeJsonFile(eventsFilePath, events);
    console.log(`Event ${eventId} sale reference counter updated to ${newCounterValue}`);
    return true;
}


export async function updateEvent(eventId: string, updates: EventCreationData, currentOrganizerId: string): Promise<EventData | null> {
  const events = await getEvents();
  const eventIndex = events.findIndex(event => event.id === eventId);

  if (eventIndex === -1) {
    console.error(`Event with ID ${eventId} not found for update.`);
    return null; 
  }

  const currentEvent = events[eventIndex];

  if (currentEvent.organizer_id !== currentOrganizerId) {
    console.error(`Organizer ${currentOrganizerId} does not have permission to update event ${eventId}.`);
    return null; 
  }

  const ticketsSold = currentEvent.quantidade_total - currentEvent.quantidade_disponivel;

  if (updates.quantidade_total < ticketsSold) {
    console.error(`Cannot update event ${eventId}: new total quantity (${updates.quantidade_total}) is less than tickets already sold (${ticketsSold}).`);
    return null; 
  }
  
  const newQuantidadeDisponivel = updates.quantidade_total - ticketsSold;

  const updatedEvent: EventData = {
    ...currentEvent, 
    ...updates,
    quantidade_disponivel: newQuantidadeDisponivel,
    imagem_url: updates.imagem_url || currentEvent.imagem_url, // Preserve existing image if not updated
    next_sale_reference_number: currentEvent.next_sale_reference_number || 1, // Preserve counter or initialize
  };

  events[eventIndex] = updatedEvent;
  await writeJsonFile(eventsFilePath, events);
  return updatedEvent;
}


export async function deleteEventAndSalesById(eventId: string): Promise<{success: boolean; message?: string}> {
  try {
    let events = await getEvents();
    const eventExists = events.some(event => event.id === eventId);
    if (!eventExists) {
      return { success: false, message: 'Evento não encontrado.' };
    }
    events = events.filter(event => event.id !== eventId);
    await writeJsonFile(eventsFilePath, events);

    let sales = await getAllSales();
    sales = sales.filter(sale => sale.evento_id !== eventId);
    await writeJsonFile(salesFilePath, sales);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting event and associated sales:', error);
    return { success: false, message: 'Erro ao excluir evento e vendas associadas.' };
  }
}


// Sale functions
export async function getAllSales(): Promise<SaleData[]> {
  return readJsonFile<SaleData[]>(salesFilePath, []);
}

export async function getSaleById(id: string): Promise<SaleData | undefined> {
  const sales = await getAllSales();
  return sales.find(sale => sale.id === id);
}

export async function getSaleByMercadoPagoExternalReference(mpExternalRef: string): Promise<SaleData | undefined> {
  const sales = await getAllSales();
  return sales.find(sale => sale.mercado_pago_external_reference === mpExternalRef);
}


export async function addSale(saleData: NewSaleDataInternal): Promise<SaleData> {
  const sales = await getAllSales();
  const newSale: SaleData = {
    id: `sale-${uuidv4().substring(0, 12)}`, // Shortened internal TrinkaPass Sale ID
    ...saleData,
    // mercado_pago_external_reference is already part of saleData from initiatePurchaseAction
  };
  sales.push(newSale);
  await writeJsonFile(salesFilePath, sales);
  return newSale;
}

export async function updateSale(saleId: string, updates: Partial<Omit<SaleData, 'id' | 'evento_id' | 'nome_comprador' | 'email_comprador' | 'whatsapp' | 'quantidade' | 'preco_ingresso_unitario' | 'taxa_servico_unitaria' | 'valor_total_item' | 'valor_total_compra' | 'data_compra' | 'pix_copia_cola_mp' | 'mercado_pago_external_reference' >>): Promise<SaleData | null> {
  const sales = await getAllSales();
  const saleIndex = sales.findIndex(s => s.id === saleId);
  if (saleIndex === -1) {
    console.error(`Sale with ID ${saleId} not found for update.`);
    return null;
  }
  sales[saleIndex] = { ...sales[saleIndex], ...updates };
  await writeJsonFile(salesFilePath, sales);
  return sales[saleIndex];
}


export async function getSalesByEventId(eventId: string): Promise<SaleData[]> {
  const sales = await getAllSales();
  return sales.filter(sale => sale.evento_id === eventId);
}


export async function updateEventStock(eventId: string, quantityChange: number, newAvailableQuantity?: number): Promise<boolean> {
  const events = await getEvents(); 
  const eventIndex = events.findIndex(event => event.id === eventId);
  if (eventIndex === -1) {
    console.error(`Event with ID ${eventId} not found for stock update.`);
    return false;
  }

  const currentEvent = events[eventIndex];

  if (newAvailableQuantity !== undefined) {
    if (newAvailableQuantity < 0 || newAvailableQuantity > currentEvent.quantidade_total) {
      console.warn(`Invalid newAvailableQuantity ${newAvailableQuantity} for event ${eventId}. Max total: ${currentEvent.quantidade_total}.`);
      return false;
    }
    currentEvent.quantidade_disponivel = newAvailableQuantity;
  } else {
    const proposedAvailable = currentEvent.quantidade_disponivel - quantityChange;
    if (proposedAvailable < 0) {
      console.warn(`Not enough stock for event ID ${eventId}. Available: ${currentEvent.quantidade_disponivel}, Requested change: ${quantityChange}`);
      return false;
    }
    if (proposedAvailable > currentEvent.quantidade_total) {
      console.warn(`Proposed available stock ${proposedAvailable} exceeds total quantity ${currentEvent.quantidade_total} for event ${eventId}. Capping at total.`);
      currentEvent.quantidade_disponivel = currentEvent.quantidade_total;
    } else {
      currentEvent.quantidade_disponivel = proposedAvailable;
    }
  }
  
  events[eventIndex] = currentEvent;
  await writeJsonFile(eventsFilePath, events);
  console.log(`Stock for event ${eventId} updated. New available: ${currentEvent.quantidade_disponivel}`);
  return true;
}


// User functions
export async function getUsers(): Promise<UserData[]> {
 return readJsonFile<UserData[]>(usersFilePath, []);
}

export async function getUserById(id: string): Promise<UserData | undefined> {
  const users = await getUsers();
  return users.find(user => user.id === id);
}

export async function getUserByEmail(email: string): Promise<UserData | undefined> {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

export async function addUser(userData: UserData): Promise<UserData> {
  const users = await getUsers();
  users.push(userData);
  await writeJsonFile(usersFilePath, users);
  return userData;
}

export async function updateUser(userId: string, updates: Partial<Omit<UserData, 'id' | 'tipo'>>): Promise<UserData | null> {
  const users = await getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    console.error(`User with ID ${userId} not found for update.`);
    return null;
  }

  const updatedUser: UserData = { ...users[userIndex] };

  if (updates.nome !== undefined) updatedUser.nome = updates.nome;
  if (updates.email !== undefined) updatedUser.email = updates.email;
  if (updates.whatsapp !== undefined) updatedUser.whatsapp = updates.whatsapp;
  if (updates.password_hash !== undefined) updatedUser.password_hash = updates.password_hash;
  
  if (updates.pix_key_type !== undefined) {
    updatedUser.pix_key_type = updates.pix_key_type === '' ? undefined : updates.pix_key_type;
  }
  if (updates.pix_key !== undefined) {
     updatedUser.pix_key = updates.pix_key === '' ? undefined : updates.pix_key;
  }
  if (updates.id_photo_data_uri !== undefined) {
    updatedUser.id_photo_data_uri = updates.id_photo_data_uri === '' ? undefined : updates.id_photo_data_uri;
  }
  // Update is_verified status if provided
  if (updates.is_verified !== undefined) {
    updatedUser.is_verified = updates.is_verified;
  }


  users[userIndex] = updatedUser;
  await writeJsonFile(usersFilePath, users);
  return updatedUser;
}

export async function deleteUserById(userId: string): Promise<{success: boolean; message?: string}> {
  try {
    let users = await getUsers();
    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
      return { success: false, message: 'Usuário não encontrado.' };
    }
    users = users.filter(user => user.id !== userId);
    await writeJsonFile(usersFilePath, users);
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: 'Erro ao excluir usuário.' };
  }
}

// Withdrawal Request Functions
export async function getWithdrawalRequests(): Promise<WithdrawalRequestData[]> {
  return readJsonFile<WithdrawalRequestData[]>(withdrawalRequestsFilePath, []);
}

export async function getWithdrawalRequestsByOrganizerId(organizerId: string): Promise<WithdrawalRequestData[]> {
  const allRequests = await getWithdrawalRequests();
  return allRequests.filter(req => req.organizerId === organizerId);
}

export async function addWithdrawalRequest(requestData: Omit<WithdrawalRequestData, 'id' | 'requestDate' | 'status'>): Promise<WithdrawalRequestData> {
  const requests = await getWithdrawalRequests();
  const newRequest: WithdrawalRequestData = {
    id: `wdrl-${uuidv4()}`,
    ...requestData,
    requestDate: new Date().toISOString(),
    status: 'pending',
  };
  requests.push(newRequest);
  await writeJsonFile(withdrawalRequestsFilePath, requests);
  return newRequest;
}

export async function updateWithdrawalRequestStatus(
  requestId: string,
  status: 'approved' | 'rejected',
  adminNotes?: string
): Promise<WithdrawalRequestData | null> {
  const requests = await getWithdrawalRequests();
  const requestIndex = requests.findIndex(req => req.id === requestId);

  if (requestIndex === -1) {
    console.error(`Withdrawal request with ID ${requestId} not found.`);
    return null;
  }

  if (requests[requestIndex].status !== 'pending') {
     console.warn(`Withdrawal request ${requestId} is already processed. Current status: ${requests[requestIndex].status}`);
     return requests[requestIndex]; 
  }

  requests[requestIndex].status = status;
  requests[requestIndex].processedDate = new Date().toISOString();
  if (adminNotes) {
    requests[requestIndex].adminNotes = adminNotes;
  }

  await writeJsonFile(withdrawalRequestsFilePath, requests);
  return requests[requestIndex];
}
