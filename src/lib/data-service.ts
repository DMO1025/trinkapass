
// src/lib/data-service.ts
'use server';

import { connectToDatabase } from './mongodb';
import type { EventData, SaleData, NewSaleDataInternal, UserData, EventCreationData, SettingsData, WithdrawalRequestData, PlatformSettingsUpdatePayload, OrganizerSafeData } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB IDs

const DEFAULT_SERVICE_FEE_PER_TICKET = 2.00;

// Settings functions (keeping as JSON for now, could be moved to DB)
// For settings, if they are global and not frequently changed, a JSON file might still be okay
// or a dedicated 'settings' collection in MongoDB with a single document.
// For simplicity in this refactor, I'll keep settings as they were.
// You can choose to migrate them to MongoDB later if needed.
import fs from 'fs/promises';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const baseDataDir = isProduction ? '/tmp' : process.cwd();
const dataDir = path.join(baseDataDir, isProduction ? 'data' : path.join('src', 'data'));
const settingsFilePath = path.join(dataDir, 'settings.json');

async function ensureDirExists(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      return;
    }
    console.error(`Error creating directory ${dirPath}:`, error);
    throw error;
  }
}

async function readJsonFile<T>(filePath: string, defaultValue?: T): Promise<T> {
  const dirPath = path.dirname(filePath);
  await ensureDirExists(dirPath);
  try {
    await fs.access(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const dataToStore = defaultValue !== undefined ? defaultValue : (filePath.endsWith('s.json') || filePath.endsWith('os.json') ? [] : {});
      await fs.writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
      return dataToStore as T;
    }
    console.error(`Error accessing file ${filePath}:`, error);
    throw error;
  }
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error(`Error reading or parsing JSON from ${filePath}:`, error);
    if (defaultValue !== undefined) return defaultValue;
    if (filePath.endsWith('s.json') || filePath.endsWith('os.json')) {
      return [] as T;
    }
    throw error;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  const dirPath = path.dirname(filePath);
  await ensureDirExists(dirPath);
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');
  } catch (error) {
    console.error(`Error writing JSON to ${filePath}:`, error);
    throw error;
  }
}


export async function getSettings(): Promise<SettingsData> {
  const defaultSettings: SettingsData = {
    mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    serviceFeePerTicket: DEFAULT_SERVICE_FEE_PER_TICKET,
  };
  return readJsonFile<SettingsData>(settingsFilePath, defaultSettings);
}

export async function updateSettings(newSettings: Partial<PlatformSettingsUpdatePayload>): Promise<SettingsData> {
  const currentSettings = await getSettings();
  const updatedSettingsData: SettingsData = {
    ...currentSettings,
    mercadoPagoAccessToken: newSettings.mercadoPagoAccessToken !== undefined
                              ? newSettings.mercadoPagoAccessToken
                              : currentSettings.mercadoPagoAccessToken,
    serviceFeePerTicket: newSettings.serviceFeePerTicket !== undefined && newSettings.serviceFeePerTicket >= 0
                              ? newSettings.serviceFeePerTicket
                              : currentSettings.serviceFeePerTicket,
  };
  await writeJsonFile(settingsFilePath, updatedSettingsData);
  return updatedSettingsData;
}


// Event functions
export async function getEvents(): Promise<EventData[]> {
  try {
    const { db } = await connectToDatabase();
    const events = await db.collection<EventData>('events').find({}).toArray();
    // MongoDB's _id is an ObjectId. We need to convert it to a string and map it to 'id'.
    return events.map(event => ({ ...event, id: event._id.toString() } as unknown as EventData));
  } catch (error) {
    console.error('Error getting events from MongoDB:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<EventData | undefined> {
  try {
    if (!ObjectId.isValid(id)) {
      console.warn('Invalid ObjectId format for getEventById:', id);
      return undefined;
    }
    const { db } = await connectToDatabase();
    const event = await db.collection<EventData>('events').findOne({ _id: new ObjectId(id) });
    if (!event) return undefined;
    return { ...event, id: event._id.toString() } as unknown as EventData;
  } catch (error) {
    console.error(`Error getting event by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getEventsByOrganizerId(organizerId: string): Promise<EventData[]> {
  try {
    const { db } = await connectToDatabase();
    // Assuming organizer_id is stored as a string that matches the User's ID.
    // If User IDs are ObjectIds, this query needs adjustment.
    const events = await db.collection<EventData>('events').find({ organizer_id: organizerId }).toArray();
    return events.map(event => ({ ...event, id: event._id.toString() } as unknown as EventData));
  } catch (error) {
    console.error(`Error getting events for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}

export async function addEvent(eventDetails: EventCreationData, organizerId: string): Promise<EventData> {
  try {
    const { db } = await connectToDatabase();
    const newEventDocument = {
      // _id will be auto-generated by MongoDB
      organizer_id: organizerId,
      ...eventDetails,
      quantidade_disponivel: eventDetails.quantidade_total,
      imagem_url: eventDetails.imagem_url || undefined,
      next_sale_reference_number: 1,
    };
    const result = await db.collection('events').insertOne(newEventDocument);
    return { ...newEventDocument, id: result.insertedId.toString() } as unknown as EventData;
  } catch (error) {
    console.error('Error adding event to MongoDB:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function updateEventSaleReferenceCounter(eventId: string, newCounterValue: number): Promise<boolean> {
  try {
    if (!ObjectId.isValid(eventId)) return false;
    const { db } = await connectToDatabase();
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { next_sale_reference_number: newCounterValue } }
    );
    return result.modifiedCount === 1;
  } catch (error) {
    console.error(`Error updating sale reference counter for event ${eventId} in MongoDB:`, error);
    return false;
  }
}


export async function updateEvent(eventId: string, updates: EventCreationData, currentOrganizerId: string): Promise<EventData | null> {
  // TODO: Implementar lógica do MongoDB aqui
  // 1. Conectar ao DB
  // 2. Encontrar o evento pelo eventId E currentOrganizerId para segurança.
  // 3. Verificar a lógica de tickets_sold vs updates.quantidade_total.
  // 4. Calcular newQuantidadeDisponivel.
  // 5. Usar db.collection('events').findOneAndUpdate(...) ou findOneAndUpdate(...) para atualizar e retornar o documento.
  // 6. Mapear _id para id.
  console.warn(`MongoDB updateEvent for ${eventId} not fully implemented.`);
  // Placeholder:
  const event = await getEventById(eventId);
  if (event && event.organizer_id === currentOrganizerId) {
    const { db } = await connectToDatabase();
    const ticketsSold = event.quantidade_total - event.quantidade_disponivel;
    if (updates.quantidade_total < ticketsSold) {
      console.error(`Cannot update event ${eventId}: new total quantity (${updates.quantidade_total}) is less than tickets already sold (${ticketsSold}).`);
      return null;
    }
    const newQuantidadeDisponivel = updates.quantidade_total - ticketsSold;
    const updateDoc = {
        $set: {
            ...updates,
            quantidade_disponivel: newQuantidadeDisponivel,
            imagem_url: updates.imagem_url || event.imagem_url,
        }
    };
    const result = await db.collection('events').findOneAndUpdate(
        { _id: new ObjectId(eventId), organizer_id: currentOrganizerId },
        updateDoc,
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result._id.toString() } as unknown as EventData;
  }
  return null;
}


export async function deleteEventAndSalesById(eventId: string): Promise<{success: boolean; message?: string}> {
  // TODO: Implementar lógica do MongoDB aqui
  // 1. Conectar ao DB.
  // 2. Deletar o evento: db.collection('events').deleteOne({ _id: new ObjectId(eventId) }).
  // 3. Deletar as vendas associadas: db.collection('sales').deleteMany({ evento_id: eventId }).
  //    (Certifique-se que evento_id em sales é uma string correspondente ao event.id, não um ObjectId).
  console.warn(`MongoDB deleteEventAndSalesById for ${eventId} not fully implemented.`);
  try {
    if (!ObjectId.isValid(eventId)) return { success: false, message: 'ID do evento inválido.'};
    const { db } = await connectToDatabase();
    const eventDeleteResult = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });
    if (eventDeleteResult.deletedCount === 0) {
        return { success: false, message: 'Evento não encontrado para exclusão.' };
    }
    await db.collection('sales').deleteMany({ evento_id: eventId }); // evento_id in sales is string
    return { success: true };
  } catch (error) {
    console.error('Error deleting event and sales from MongoDB:', error);
    return { success: false, message: 'Erro ao excluir evento e vendas.' };
  }
}


// Sale functions
export async function getAllSales(): Promise<SaleData[]> {
  // TODO: Implementar lógica do MongoDB aqui. db.collection('sales').find({}).toArray(). Map _id to id.
  console.warn("MongoDB getAllSales not fully implemented.");
  try {
    const { db } = await connectToDatabase();
    const sales = await db.collection<SaleData>('sales').find({}).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() } as unknown as SaleData));
  } catch (error) {
    console.error('Error getting all sales from MongoDB:', error);
    return [];
  }
}

export async function getSaleById(id: string): Promise<SaleData | undefined> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB getSaleById for ${id} not fully implemented.`);
   try {
    if (!ObjectId.isValid(id)) return undefined; // Sale IDs might not be ObjectIds if you use UUIDs
    const { db } = await connectToDatabase();
    // If your sale IDs are UUIDs, query by 'id' field not '_id'
    // Example: const sale = await db.collection<SaleData>('sales').findOne({ id: id });
    const sale = await db.collection<SaleData>('sales').findOne({ _id: new ObjectId(id) }); // Assuming sale ID becomes _id
    if (!sale) return undefined;
    return { ...sale, id: sale._id.toString() } as unknown as SaleData;
  } catch (error) {
    console.error(`Error getting sale by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getSalesByOrganizerId(organizerId: string): Promise<SaleData[]> {
  // TODO: Implementar lógica do MongoDB aqui
  // This is more complex as it might require a join or multiple queries if evento_id is not directly linking to organizer.
  // Simplest: Fetch all organizer's events, then fetch sales for those event_ids.
  console.warn(`MongoDB getSalesByOrganizerId for ${organizerId} not fully implemented.`);
  try {
    const organizerEvents = await getEventsByOrganizerId(organizerId);
    const organizerEventIds = organizerEvents.map(event => event.id);
    if (organizerEventIds.length === 0) return [];

    const { db } = await connectToDatabase();
    const sales = await db.collection<SaleData>('sales').find({ evento_id: { $in: organizerEventIds } }).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() } as unknown as SaleData));
  } catch (error) {
    console.error(`Error getting sales for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}


export async function getSaleByMercadoPagoExternalReference(mpExternalRef: string): Promise<SaleData | undefined> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB getSaleByMercadoPagoExternalReference for ${mpExternalRef} not fully implemented.`);
  try {
    const { db } = await connectToDatabase();
    const sale = await db.collection<SaleData>('sales').findOne({ mercado_pago_external_reference: mpExternalRef });
    if (!sale) return undefined;
    return { ...sale, id: sale._id.toString() } as unknown as SaleData;
  } catch (error) {
    console.error(`Error getting sale by MP external ref ${mpExternalRef} from MongoDB:`, error);
    return undefined;
  }
}


export async function addSale(saleData: NewSaleDataInternal): Promise<SaleData> {
  // TODO: Implementar lógica do MongoDB aqui. db.collection('sales').insertOne(...).
  // Remember to generate a unique string ID for the 'id' field if _id is not sufficient.
  console.warn("MongoDB addSale not fully implemented.");
  try {
    const { db } = await connectToDatabase();
    const newSaleDocument = {
      // _id will be auto-generated by MongoDB
      ...saleData,
      // Generate a TrinkaPass specific string ID if needed, or rely on MongoDB's _id
      // For consistency with previous structure, let's keep a string 'id'
      internal_sale_id: `sale-${uuidv4().substring(0,12)}`
    };
    const result = await db.collection('sales').insertOne(newSaleDocument);
    return { ...newSaleDocument, id: result.insertedId.toString() } as unknown as SaleData;
  } catch (error) {
    console.error('Error adding sale to MongoDB:', error);
    throw error;
  }
}

export async function updateSale(saleId: string, updates: Partial<Omit<SaleData, 'id' | 'evento_id' | 'nome_comprador' | 'email_comprador' | 'whatsapp' | 'quantidade' | 'preco_ingresso_unitario' | 'taxa_servico_unitaria' | 'valor_total_item' | 'valor_total_compra' | 'data_compra' | 'pix_copia_cola_mp' | 'mercado_pago_external_reference' >>): Promise<SaleData | null> {
  // TODO: Implementar lógica do MongoDB aqui. db.collection('sales').findOneAndUpdate(...)
  console.warn(`MongoDB updateSale for ${saleId} not fully implemented.`);
  try {
    // If saleId is MongoDB's _id as a string:
    if (!ObjectId.isValid(saleId)) return null;
    const { db } = await connectToDatabase();
    const result = await db.collection('sales').findOneAndUpdate(
        { _id: new ObjectId(saleId) },
        { $set: updates },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result._id.toString() } as unknown as SaleData;
  } catch (error) {
    console.error(`Error updating sale ${saleId} in MongoDB:`, error);
    return null;
  }
}


export async function getSalesByEventId(eventId: string): Promise<SaleData[]> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB getSalesByEventId for ${eventId} not fully implemented.`);
   try {
    const { db } = await connectToDatabase();
    // Assuming evento_id in sales collection is a string matching event.id
    const sales = await db.collection<SaleData>('sales').find({ evento_id: eventId }).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() } as unknown as SaleData));
  } catch (error) {
    console.error(`Error getting sales for event ${eventId} from MongoDB:`, error);
    return [];
  }
}


export async function updateEventStock(eventId: string, quantityChange: number, newAvailableQuantity?: number): Promise<boolean> {
  // TODO: Implementar lógica do MongoDB aqui
  // This will involve reading the event, calculating new stock, and updating. Consider atomicity.
  // db.collection('events').updateOne({ _id: new ObjectId(eventId) }, { $inc: { quantidade_disponivel: -quantityChange } }) could be part of it.
  // Or set newAvailableQuantity directly.
  console.warn(`MongoDB updateEventStock for ${eventId} not fully implemented.`);
  try {
    if (!ObjectId.isValid(eventId)) return false;
    const { db } = await connectToDatabase();
    const event = await db.collection<EventData>('events').findOne({ _id: new ObjectId(eventId) });
    if (!event) return false;

    let finalAvailable: number;
    if (newAvailableQuantity !== undefined) {
        finalAvailable = Math.max(0, Math.min(newAvailableQuantity, event.quantidade_total));
    } else {
        const proposedAvailable = event.quantidade_disponivel - quantityChange;
        finalAvailable = Math.max(0, Math.min(proposedAvailable, event.quantidade_total));
    }

    if (event.quantidade_disponivel === finalAvailable && quantityChange !==0 && newAvailableQuantity === undefined) { // Avoid update if no actual change and not a direct set
        if (quantityChange > 0 && event.quantidade_disponivel === 0) { // Trying to sell from 0 stock
             console.warn(`Not enough stock for event ID ${eventId}. Attempted to sell ${quantityChange}, available: ${event.quantidade_disponivel}`);
             return false;
        }
    }


    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { quantidade_disponivel: finalAvailable } }
    );
    return result.modifiedCount === 1 || (result.matchedCount === 1 && event.quantidade_disponivel === finalAvailable); // Success if modified or already correct
  } catch (error) {
    console.error(`Error updating event stock for ${eventId} in MongoDB:`, error);
    return false;
  }
}


// User functions
export async function getUsers(): Promise<UserData[]> {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection<UserData>('users').find({}).toArray();
    return users.map(user => ({ ...user, id: user._id.toString() } as unknown as UserData));
  } catch (error) {
    console.error('Error getting users from MongoDB:', error);
    return [];
  }
}

export async function getUserById(id: string): Promise<UserData | undefined> {
  try {
    // If your User IDs are UUIDs (like 'admin-001', 'org-...'), they are likely stored as strings.
    // MongoDB's _id is usually an ObjectId unless you explicitly set it.
    // Assuming 'id' field stores your UUIDs. If you decided to use _id as string UUIDs, adjust query.
    const { db } = await connectToDatabase();
    let user: UserData | null;
    if (ObjectId.isValid(id)) { // Check if 'id' could be an ObjectId string
        user = await db.collection<UserData>('users').findOne({ _id: new ObjectId(id) });
    } else { // Assume it's a custom string ID stored in an 'id' field or a specific field like 'userId'
        user = await db.collection<UserData>('users').findOne({ id: id }); // Or { userId: id }
    }

    if (!user) return undefined;
    // If _id is the source of truth for the document ID, ensure 'id' field reflects that string.
    // If 'id' field is your custom UUID, then it's already correct.
    return { ...user, id: user._id ? user._id.toString() : user.id } as unknown as UserData;
  } catch (error) {
    console.error(`Error getting user by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getUserByEmail(email: string): Promise<UserData | undefined> {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection<UserData>('users').findOne({ email: email });
    if (!user) return undefined;
    return { ...user, id: user._id.toString() } as unknown as UserData;
  } catch (error) {
    console.error(`Error getting user by email ${email} from MongoDB:`, error);
    return undefined;
  }
}

export async function addUser(userData: UserData): Promise<UserData> {
  try {
    const { db } = await connectToDatabase();
    // Ensure 'id' is a string as per UserData interface, MongoDB will create _id.
    // Or, if you want 'id' to be the MongoDB _id, then don't include it here and retrieve it from result.
    const userDocument = { ...userData };
    // delete userDocument.id; // if 'id' is meant to be MongoDB's _id represented as a string later.
                               // Or ensure userData.id is your unique string ID.

    const result = await db.collection('users').insertOne(userDocument);
    return { ...userDocument, id: result.insertedId.toString() } as unknown as UserData;
  } catch (error) {
    console.error('Error adding user to MongoDB:', error);
    throw error;
  }
}

export async function updateUser(userId: string, updates: Partial<Omit<UserData, 'id' | 'tipo'>>): Promise<UserData | null> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB updateUser for ${userId} not fully implemented.`);
  try {
    const { db } = await connectToDatabase();
    let query;
    if (ObjectId.isValid(userId)) {
        query = { _id: new ObjectId(userId) };
    } else {
        query = { id: userId }; // Assuming 'id' is the custom string field
    }

    // Prepare updates, handling undefined for clearing fields if necessary
    const finalUpdates: Partial<UserData> = {};
    if (updates.nome !== undefined) finalUpdates.nome = updates.nome;
    if (updates.email !== undefined) finalUpdates.email = updates.email;
    if (updates.whatsapp !== undefined) finalUpdates.whatsapp = updates.whatsapp === '' ? undefined : updates.whatsapp;
    if (updates.password_hash !== undefined) finalUpdates.password_hash = updates.password_hash;
    if (updates.pix_key_type !== undefined) finalUpdates.pix_key_type = updates.pix_key_type === '' ? undefined : updates.pix_key_type;
    if (updates.pix_key !== undefined) finalUpdates.pix_key = updates.pix_key === '' ? undefined : updates.pix_key;
    if (updates.id_photo_data_uri !== undefined) finalUpdates.id_photo_data_uri = updates.id_photo_data_uri === '' ? undefined : updates.id_photo_data_uri;
    if (updates.is_verified !== undefined) finalUpdates.is_verified = updates.is_verified;


    const result = await db.collection('users').findOneAndUpdate(
        query,
        { $set: finalUpdates },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result._id ? result._id.toString() : result.id } as unknown as UserData;
  } catch (error) {
    console.error(`Error updating user ${userId} in MongoDB:`, error);
    return null;
  }
}

export async function deleteUserById(userId: string): Promise<{success: boolean; message?: string}> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB deleteUserById for ${userId} not fully implemented.`);
   try {
    const { db } = await connectToDatabase();
    let query;
    if (ObjectId.isValid(userId)) {
        query = { _id: new ObjectId(userId) };
    } else {
        query = { id: userId }; // Assuming 'id' is the custom string field
    }
    const result = await db.collection('users').deleteOne(query);
    if (result.deletedCount === 0) {
        return { success: false, message: 'Usuário não encontrado para exclusão.' };
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting user from MongoDB:', error);
    return { success: false, message: 'Erro ao excluir usuário.' };
  }
}

// Withdrawal Request Functions
export async function getWithdrawalRequests(): Promise<WithdrawalRequestData[]> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn("MongoDB getWithdrawalRequests not fully implemented.");
  try {
    const { db } = await connectToDatabase();
    const requests = await db.collection<WithdrawalRequestData>('withdrawal_requests').find({}).toArray();
    return requests.map(req => ({ ...req, id: req._id.toString() } as unknown as WithdrawalRequestData));
  } catch (error) {
    console.error('Error getting withdrawal requests from MongoDB:', error);
    return [];
  }
}

export async function getWithdrawalRequestsByOrganizerId(organizerId: string): Promise<WithdrawalRequestData[]> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB getWithdrawalRequestsByOrganizerId for ${organizerId} not fully implemented.`);
   try {
    const { db } = await connectToDatabase();
    // Assuming organizerId is a string that matches the User's ID.
    const requests = await db.collection<WithdrawalRequestData>('withdrawal_requests').find({ organizerId: organizerId }).toArray();
    return requests.map(req => ({ ...req, id: req._id.toString() } as unknown as WithdrawalRequestData));
  } catch (error) {
    console.error(`Error getting withdrawal requests for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}

export async function addWithdrawalRequest(requestData: Omit<WithdrawalRequestData, 'id' | 'requestDate' | 'status'>): Promise<WithdrawalRequestData> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn("MongoDB addWithdrawalRequest not fully implemented.");
  try {
    const { db } = await connectToDatabase();
    const newRequestDocument = {
      // _id will be auto-generated
      ...requestData,
      requestDate: new Date().toISOString(),
      status: 'pending' as 'pending' | 'approved' | 'rejected',
      // internal_request_id: `wdrl-${uuidv4()}` // If you need a TrinkaPass specific string ID
    };
    const result = await db.collection('withdrawal_requests').insertOne(newRequestDocument);
    // Update sales (this logic might need adjustment based on how you link sales to withdrawals in MongoDB)
    // For now, this part of the logic is kept as it was, assuming sales collection is also in MongoDB
    const sales = await getAllSales(); // This now calls the MongoDB version
    let salesUpdated = false;
    sales.forEach(sale => {
      if (sale.evento_id && // Ensure evento_id exists
          sale.organizer_id === requestData.organizerId && // Check organizer_id on sale directly
          sale.organizer_revenue_status === 'cleared' &&
          sale.organizer_revenue_clearance_date &&
          new Date(sale.organizer_revenue_clearance_date) <= new Date()
         ) {
        sale.organizer_revenue_status = 'requested_withdrawal';
        // Here you'd update the sale document in MongoDB
        // Example: db.collection('sales').updateOne({ _id: new ObjectId(sale.id) }, { $set: { organizer_revenue_status: 'requested_withdrawal' } });
        // This requires making updateSale more flexible or adding a specific function.
        // For now, we'll assume updateSale can handle this if called appropriately.
        updateSale(sale.id, { organizer_revenue_status: 'requested_withdrawal' }); // This needs sale.id to be MongoDB _id string
        salesUpdated = true;
      }
    });
    // If salesUpdated, the individual updateSale calls would handle persisting.

    return { ...newRequestDocument, id: result.insertedId.toString() } as unknown as WithdrawalRequestData;
  } catch (error) {
    console.error('Error adding withdrawal request to MongoDB:', error);
    throw error;
  }
}

export async function updateWithdrawalRequestStatus(
  requestId: string,
  status: 'approved' | 'rejected',
  adminNotes?: string
): Promise<WithdrawalRequestData | null> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn(`MongoDB updateWithdrawalRequestStatus for ${requestId} not fully implemented.`);
  try {
    if (!ObjectId.isValid(requestId)) return null;
    const { db } = await connectToDatabase();
    const updateDoc: any = {
        $set: {
            status: status,
            processedDate: new Date().toISOString(),
        }
    };
    if (adminNotes) {
        updateDoc.$set.adminNotes = adminNotes;
    }
    const result = await db.collection('withdrawal_requests').findOneAndUpdate(
        { _id: new ObjectId(requestId), status: 'pending' }, // Only update if still pending
        updateDoc,
        { returnDocument: 'after' }
    );
    if (!result) {
        const currentReq = await db.collection('withdrawal_requests').findOne({_id: new ObjectId(requestId)});
        if (currentReq) console.warn(`Withdrawal request ${requestId} already processed or not found. Current status: ${currentReq.status}`);
        else console.warn(`Withdrawal request ${requestId} not found.`);
        return currentReq ? { ...currentReq, id: currentReq._id.toString() } as unknown as WithdrawalRequestData : null;
    }

    const updatedRequest = { ...result, id: result._id.toString() } as unknown as WithdrawalRequestData;

    if (status === 'approved') {
      const sales = await getAllSales(); // MongoDB version
      let amountToMarkAsPaidOut = updatedRequest.amount;
      
      for (const sale of sales) {
        if (amountToMarkAsPaidOut <= 0) break;
        if (sale.organizer_id === updatedRequest.organizerId &&
            sale.organizer_revenue_status === 'requested_withdrawal' &&
            sale.organizer_net_revenue && sale.organizer_net_revenue > 0) {
          
          // This simplified logic marks the entire sale as paid_out if part of it covers the withdrawal
          await updateSale(sale.id, { organizer_revenue_status: 'paid_out' }); // Ensure sale.id is correct for MongoDB
          amountToMarkAsPaidOut -= sale.organizer_net_revenue;
        }
      }
    }
    return updatedRequest;
  } catch (error) {
    console.error(`Error updating withdrawal request ${requestId} status in MongoDB:`, error);
    return null;
  }
}

// Cron job like function to update 'pending_clearance' to 'cleared'
export async function processRevenueClearance(): Promise<void> {
  // TODO: Implementar lógica do MongoDB aqui
  console.warn("MongoDB processRevenueClearance not fully implemented.");
  try {
    const { db } = await connectToDatabase();
    const now = new Date().toISOString();
    const result = await db.collection('sales').updateMany(
        {
            status: 'paid',
            organizer_revenue_status: 'pending_clearance',
            organizer_revenue_clearance_date: { $lte: now }
        },
        { $set: { organizer_revenue_status: 'cleared' } }
    );
    console.log(`Revenue clearance process completed. ${result.modifiedCount} sales updated.`);
  } catch (error) {
    console.error('Error processing revenue clearance in MongoDB:', error);
  }
}


// Admin User Seeding
export async function ensureAdminUserExists(): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    const adminEmail = 'admin@trinkapass.com';
    const existingAdmin = await db.collection('users').findOne({ email: adminEmail, tipo: 'admin' });

    if (!existingAdmin) {
      const adminUserData: Omit<UserData, '_id' | 'id'> = { // Omit _id and id, as MongoDB will generate _id
        id: `admin-${uuidv4()}`, // Keep your custom string ID if you prefer
        nome: 'Admin TrinkaPass',
        email: adminEmail,
        password_hash: 'admin123', // IMPORTANT: Hash this password in a real app!
        tipo: 'admin',
        is_verified: true,
      };
      await db.collection('users').insertOne(adminUserData);
      console.log('Default admin user created in MongoDB.');
    } else {
      // console.log('Default admin user already exists in MongoDB.');
    }
  } catch (error) {
    console.error('Error ensuring admin user exists in MongoDB:', error);
  }
}
// Call it on server startup (e.g., in a global setup file or a layout.tsx that runs on server)
// For this project structure, a good place might be to call it once when the server starts.
// However, since Next.js server actions run in separate contexts,
// you might call this at the beginning of an admin-related action if needed,
// or ensure it's run as part of your deployment/startup script.
// For now, let's assume it's called appropriately.
// ensureAdminUserExists(); // This might run too often here.

// Remove or adapt Firebase specific functions if they are no longer needed.
// e.g., initializeFirebaseApp, getFirebaseDb
