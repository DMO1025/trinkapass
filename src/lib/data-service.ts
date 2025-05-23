// src/lib/data-service.ts
'use server';

import { connectToDatabase } from './mongodb';
import type { EventData, SaleData, NewSaleDataInternal, UserData, EventCreationData, OrganizerSafeData, WithdrawalRequestData, SettingsData, PlatformSettingsUpdatePayload } from './types';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

const DEFAULT_SERVICE_FEE_PER_TICKET = 2.00;

// Settings functions (using MongoDB)
export async function getSettings(): Promise<SettingsData> {
  try {
    const { db } = await connectToDatabase();
    const settingsCollection = db.collection('platform_settings');
    const settings = await settingsCollection.findOne({});
    if (settings) {
      return {
        mercadoPagoAccessToken: settings.mercadoPagoAccessToken || process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
        serviceFeePerTicket: settings.serviceFeePerTicket !== undefined ? settings.serviceFeePerTicket : DEFAULT_SERVICE_FEE_PER_TICKET,
      };
    }
    return {
      mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      serviceFeePerTicket: DEFAULT_SERVICE_FEE_PER_TICKET,
    };
  } catch (error) {
    console.error('Error getting settings from MongoDB, returning defaults:', error);
    return {
      mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      serviceFeePerTicket: DEFAULT_SERVICE_FEE_PER_TICKET,
    };
  }
}

export async function updateSettings(newSettings: PlatformSettingsUpdatePayload): Promise<SettingsData> {
  try {
    const { db } = await connectToDatabase();
    const settingsCollection = db.collection('platform_settings');
    const currentSettings = await getSettings(); // Get current to merge, respecting defaults

    const updateData: Partial<SettingsData> = {};
    if (newSettings.mercadoPagoAccessToken !== undefined) {
      // Note: Storing MP Access Token in DB is generally not recommended if it can be solely from env vars.
      // This example allows it to be set via admin dashboard, but env var should take precedence if available.
      updateData.mercadoPagoAccessToken = newSettings.mercadoPagoAccessToken;
    }
    if (newSettings.serviceFeePerTicket !== undefined && newSettings.serviceFeePerTicket >= 0) {
      updateData.serviceFeePerTicket = newSettings.serviceFeePerTicket;
    }
    
    if (Object.keys(updateData).length === 0) {
        return currentSettings; // No changes to apply
    }

    const result = await settingsCollection.findOneAndUpdate(
      {}, // Assuming a single settings document
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );
    
    const finalSettings = result ? {
        mercadoPagoAccessToken: result.mercadoPagoAccessToken || process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
        serviceFeePerTicket: result.serviceFeePerTicket !== undefined ? result.serviceFeePerTicket : DEFAULT_SERVICE_FEE_PER_TICKET,
    } : currentSettings; // Fallback if update somehow fails to return

    return finalSettings;
  } catch (error) {
    console.error('Error updating settings in MongoDB:', error);
    throw error;
  }
}


// Event functions
export async function getEvents(): Promise<EventData[]> {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const events = await eventsCollection.find({}).toArray();
    return events.map(event => ({ ...event, id: event._id.toString() }));
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
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
    if (!event) return undefined;
    return { ...event, id: event._id.toString() };
  } catch (error) {
    console.error(`Error getting event by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getEventsByOrganizerId(organizerId: string): Promise<EventData[]> {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const events = await eventsCollection.find({ organizer_id: organizerId }).toArray();
    return events.map(event => ({ ...event, id: event._id.toString() }));
  } catch (error) {
    console.error(`Error getting events for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}

export async function addEvent(eventDetails: EventCreationData, organizerId: string): Promise<EventData> {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const newEventDocument: Omit<EventData, 'id' | '_id'> = {
      organizer_id: organizerId,
      ...eventDetails,
      quantidade_disponivel: eventDetails.quantidade_total,
      imagem_url: eventDetails.imagem_url || undefined,
      next_sale_reference_number: 1,
    };
    const result = await eventsCollection.insertOne(newEventDocument as any);
    return { ...newEventDocument, id: result.insertedId.toString() } as EventData;
  } catch (error) {
    console.error('Error adding event to MongoDB:', error);
    throw error;
  }
}

export async function updateEventSaleReferenceCounter(eventId: string, newCounterValue: number): Promise<boolean> {
  try {
    if (!ObjectId.isValid(eventId)) return false;
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection('events');
    const result = await eventsCollection.updateOne(
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
  try {
    if (!ObjectId.isValid(eventId)) {
      console.warn('Invalid ObjectId format for updateEvent:', eventId);
      return null;
    }
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const event = await eventsCollection.findOne({ _id: new ObjectId(eventId), organizer_id: currentOrganizerId });

    if (!event) {
      console.error(`Event ${eventId} not found or organizer mismatch for update.`);
      return null;
    }

    const ticketsSold = event.quantidade_total - event.quantidade_disponivel;
    if (updates.quantidade_total < ticketsSold) {
      console.error(`Cannot update event ${eventId}: new total quantity (${updates.quantidade_total}) is less than tickets already sold (${ticketsSold}).`);
      return null;
    }
    const newQuantidadeDisponivel = updates.quantidade_total - ticketsSold;
    
    const updateDoc: Partial<Omit<EventData, 'id' | '_id'>> = {
        ...updates,
        quantidade_disponivel: newQuantidadeDisponivel,
        imagem_url: updates.imagem_url || event.imagem_url, 
    };

    const result = await eventsCollection.findOneAndUpdate(
        { _id: new ObjectId(eventId), organizer_id: currentOrganizerId },
        { $set: updateDoc },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result._id.toString() };
  } catch (error) {
    console.error(`Error updating event ${eventId} in MongoDB:`, error);
    return null;
  }
}

export async function deleteEventAndSalesById(eventId: string): Promise<{success: boolean; message?: string}> {
  try {
    if (!ObjectId.isValid(eventId)) return { success: false, message: 'ID do evento inválido.'};
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection('events');
    const salesCollection = db.collection('sales');

    const eventDeleteResult = await eventsCollection.deleteOne({ _id: new ObjectId(eventId) });
    if (eventDeleteResult.deletedCount === 0) {
        return { success: false, message: 'Evento não encontrado para exclusão.' };
    }
    await salesCollection.deleteMany({ evento_id: eventId });
    return { success: true };
  } catch (error) {
    console.error('Error deleting event and sales from MongoDB:', error);
    return { success: false, message: 'Erro ao excluir evento e vendas.' };
  }
}

// Sale functions
export async function getAllSales(): Promise<SaleData[]> {
  try {
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const sales = await salesCollection.find({}).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() }));
  } catch (error) {
    console.error('Error getting all sales from MongoDB:', error);
    return [];
  }
}

export async function getSaleById(id: string): Promise<SaleData | undefined> {
  try {
    if (!ObjectId.isValid(id)) {
       console.warn('Invalid ObjectId format for getSaleById:', id);
       return undefined;
    }
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const sale = await salesCollection.findOne({ _id: new ObjectId(id) });
    if (!sale) return undefined;
    return { ...sale, id: sale._id.toString() };
  } catch (error) {
    console.error(`Error getting sale by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getSalesByOrganizerId(organizerId: string): Promise<SaleData[]> {
  try {
    const organizerEvents = await getEventsByOrganizerId(organizerId);
    const organizerEventIds = organizerEvents.map(event => event.id);
    if (organizerEventIds.length === 0) return [];

    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const sales = await salesCollection.find({ evento_id: { $in: organizerEventIds } }).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() }));
  } catch (error) {
    console.error(`Error getting sales for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}

export async function getSaleByMercadoPagoExternalReference(mpExternalRef: string): Promise<SaleData | undefined> {
  try {
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const sale = await salesCollection.findOne({ mercado_pago_external_reference: mpExternalRef });
    if (!sale) return undefined;
    return { ...sale, id: sale._id.toString() };
  } catch (error) {
    console.error(`Error getting sale by MP external ref ${mpExternalRef} from MongoDB:`, error);
    return undefined;
  }
}

export async function addSale(saleData: NewSaleDataInternal): Promise<SaleData> {
  try {
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const newSaleDocument: Omit<SaleData, 'id' | '_id'> = { ...saleData };
    const result = await salesCollection.insertOne(newSaleDocument as any);
    return { ...newSaleDocument, id: result.insertedId.toString() } as SaleData;
  } catch (error) {
    console.error('Error adding sale to MongoDB:', error);
    throw error;
  }
}

export async function updateSale(saleId: string, updates: Partial<Omit<SaleData, 'id' | 'evento_id' | 'nome_comprador' | 'email_comprador' | 'whatsapp' | 'quantidade' | 'preco_ingresso_unitario' | 'taxa_servico_unitaria' | 'valor_total_item' | 'valor_total_compra' | 'data_compra' | 'pix_copia_cola_mp' | 'mercado_pago_external_reference' >>): Promise<SaleData | null> {
  try {
    if (!ObjectId.isValid(saleId)) {
        console.warn('Invalid ObjectId format for updateSale:', saleId);
        return null;
    }
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const result = await salesCollection.findOneAndUpdate(
        { _id: new ObjectId(saleId) },
        { $set: updates },
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result._id.toString() };
  } catch (error) {
    console.error(`Error updating sale ${saleId} in MongoDB:`, error);
    return null;
  }
}

export async function getSalesByEventId(eventId: string): Promise<SaleData[]> {
   try {
    const { db } = await connectToDatabase();
    const salesCollection = db.collection<Omit<SaleData, 'id'>>('sales');
    const sales = await salesCollection.find({ evento_id: eventId }).toArray();
    return sales.map(sale => ({ ...sale, id: sale._id.toString() }));
  } catch (error) {
    console.error(`Error getting sales for event ${eventId} from MongoDB:`, error);
    return [];
  }
}

export async function updateEventStock(eventId: string, quantityChange: number, newAvailableQuantity?: number): Promise<boolean> {
  try {
    if (!ObjectId.isValid(eventId)) {
        console.warn('Invalid ObjectId format for updateEventStock:', eventId);
        return false;
    }
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Omit<EventData, 'id'>>('events');
    const event = await eventsCollection.findOne({ _id: new ObjectId(eventId) });
    if (!event) {
        console.error(`Event ${eventId} not found for stock update.`);
        return false;
    }

    let finalAvailable: number;
    if (newAvailableQuantity !== undefined) {
        finalAvailable = Math.max(0, Math.min(newAvailableQuantity, event.quantidade_total));
    } else {
        const proposedAvailable = event.quantidade_disponivel - quantityChange;
        finalAvailable = Math.max(0, Math.min(proposedAvailable, event.quantidade_total));
    }

    if (event.quantidade_disponivel === finalAvailable) {
        if (quantityChange > 0 && event.quantidade_disponivel === 0) {
             console.warn(`Stock update for event ${eventId}: No change needed or attempted to sell from 0 stock. Current: ${event.quantidade_disponivel}, Proposed by change: ${event.quantidade_disponivel - quantityChange}. Final: ${finalAvailable}`);
             return true;
        }
        return true; 
    }

    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: { quantidade_disponivel: finalAvailable } }
    );
    return result.modifiedCount === 1;
  } catch (error) {
    console.error(`Error updating event stock for ${eventId} in MongoDB:`, error);
    return false;
  }
}

// User functions
export async function getUsers(): Promise<UserData[]> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    const users = await usersCollection.find({}).toArray();
    return users.map(user => ({ ...user, id: user.id || user._id.toString() }));
  } catch (error) {
    console.error('Error getting users from MongoDB:', error);
    return [];
  }
}

export async function getUserById(id: string): Promise<UserData | undefined> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    let user: Omit<UserData, 'id'> | null = null;
    if (!ObjectId.isValid(id)) { 
        user = await usersCollection.findOne({ id: id });
    }
    if (!user && ObjectId.isValid(id)) {
        user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }
    if (!user) return undefined;
    return { ...user, id: user.id || user._id.toString() };
  } catch (error) {
    console.error(`Error getting user by ID ${id} from MongoDB:`, error);
    return undefined;
  }
}

export async function getUserByEmail(email: string): Promise<UserData | undefined> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    const user = await usersCollection.findOne({ email: email });
    if (!user) return undefined;
    return { ...user, id: user.id || user._id.toString() };
  } catch (error) {
    console.error(`Error getting user by email ${email} from MongoDB:`, error);
    return undefined;
  }
}

export async function addUser(userData: UserData): Promise<UserData> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    const userDocument: Omit<UserData, '_id'> & { _id?: ObjectId } = { ...userData };
    if (userDocument._id && !ObjectId.isValid(userDocument._id.toString())) {
        delete userDocument._id;
    }
    const result = await usersCollection.insertOne(userDocument as any);
    return { ...userData, _id: result.insertedId } as UserData;
  } catch (error) {
    console.error('Error adding user to MongoDB:', error);
    throw error;
  }
}

export async function updateUser(userId: string, updates: Partial<Omit<UserData, 'id' | 'tipo'>>): Promise<UserData | null> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    let query;
    if (ObjectId.isValid(userId)) {
        query = { _id: new ObjectId(userId) };
    } else {
        query = { id: userId };
    }

    const finalUpdates: Partial<UserData> = {};
    const fieldsToUnset: any = {};

    (Object.keys(updates) as Array<keyof typeof updates>).forEach(key => {
        if (updates[key] === '' && (key === 'whatsapp' || key === 'pix_key_type' || key === 'pix_key' || key === 'id_photo_data_uri')) {
            fieldsToUnset[key] = ""; 
        } else if (updates[key] !== undefined) {
            (finalUpdates as any)[key] = updates[key];
        }
    });
    
    const updateOperation: any = {};
    if (Object.keys(finalUpdates).length > 0) updateOperation.$set = finalUpdates;
    if (Object.keys(fieldsToUnset).length > 0) updateOperation.$unset = fieldsToUnset;

    if (Object.keys(updateOperation).length === 0) {
        const currentUser = await usersCollection.findOne(query);
        return currentUser ? { ...currentUser, id: currentUser.id || currentUser._id.toString()} : null;
    }

    const result = await usersCollection.findOneAndUpdate(
        query,
        updateOperation,
        { returnDocument: 'after' }
    );
    if (!result) return null;
    return { ...result, id: result.id || result._id.toString() };
  } catch (error) {
    console.error(`Error updating user ${userId} in MongoDB:`, error);
    return null;
  }
}

export async function deleteUserById(userId: string): Promise<{success: boolean; message?: string}> {
   try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    let query;
    if (ObjectId.isValid(userId)) {
        query = { _id: new ObjectId(userId) };
    } else {
        query = { id: userId };
    }
    const result = await usersCollection.deleteOne(query);
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
  try {
    const { db } = await connectToDatabase();
    const requestsCollection = db.collection<Omit<WithdrawalRequestData, 'id'>>('withdrawal_requests');
    const requests = await requestsCollection.find({}).toArray();
    return requests.map(req => ({ ...req, id: req._id.toString() }));
  } catch (error) {
    console.error('Error getting withdrawal requests from MongoDB:', error);
    return [];
  }
}

export async function getWithdrawalRequestsByOrganizerId(organizerId: string): Promise<WithdrawalRequestData[]> {
   try {
    const { db } = await connectToDatabase();
    const requestsCollection = db.collection<Omit<WithdrawalRequestData, 'id'>>('withdrawal_requests');
    const requests = await requestsCollection.find({ organizerId: organizerId }).toArray();
    return requests.map(req => ({ ...req, id: req._id.toString() }));
  } catch (error) {
    console.error(`Error getting withdrawal requests for organizer ${organizerId} from MongoDB:`, error);
    return [];
  }
}

export async function addWithdrawalRequest(requestData: Omit<WithdrawalRequestData, 'id' | 'requestDate' | 'status' | 'processedDate' | 'adminNotes'>): Promise<WithdrawalRequestData> {
  try {
    const { db } = await connectToDatabase();
    const requestsCollection = db.collection<Omit<WithdrawalRequestData, 'id'>>('withdrawal_requests');
    const salesCollection = db.collection('sales');

    const newRequestDocument: Omit<WithdrawalRequestData, 'id' | '_id'> = {
      ...requestData,
      requestDate: new Date().toISOString(),
      status: 'pending',
    };
    const result = await requestsCollection.insertOne(newRequestDocument as any);
    
    await salesCollection.updateMany(
        {
            organizer_id: requestData.organizerId,
            organizer_revenue_status: 'cleared'
        },
        { $set: { organizer_revenue_status: 'requested_withdrawal' } }
    );

    return { ...newRequestDocument, id: result.insertedId.toString() } as WithdrawalRequestData;
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
  try {
    if (!ObjectId.isValid(requestId)) {
        console.warn('Invalid ObjectId format for updateWithdrawalRequestStatus:', requestId);
        return null;
    }
    const { db } = await connectToDatabase();
    const requestsCollection = db.collection<Omit<WithdrawalRequestData, 'id'>>('withdrawal_requests');
    const salesCollection = db.collection('sales');

    const updateDoc: any = {
        status: status,
        processedDate: new Date().toISOString(),
    };
    if (adminNotes) {
        updateDoc.adminNotes = adminNotes;
    }

    const result = await requestsCollection.findOneAndUpdate(
        { _id: new ObjectId(requestId), status: 'pending' },
        { $set: updateDoc },
        { returnDocument: 'after' }
    );

    if (!result) {
        const currentReq = await requestsCollection.findOne({_id: new ObjectId(requestId)});
        if (currentReq) console.warn(`Withdrawal request ${requestId} already processed or not found. Current status: ${currentReq.status}`);
        else console.warn(`Withdrawal request ${requestId} not found.`);
        return currentReq ? { ...currentReq, id: currentReq._id.toString() } : null;
    }
    
    const updatedRequest = { ...result, id: result._id.toString() };

    if (status === 'approved') {
        await salesCollection.updateMany(
            {
                organizer_id: updatedRequest.organizerId, 
                organizer_revenue_status: 'requested_withdrawal'
            },
            { $set: { organizer_revenue_status: 'paid_out' } }
        );
    } else if (status === 'rejected') {
         await salesCollection.updateMany(
            {
                organizer_id: updatedRequest.organizerId,
                organizer_revenue_status: 'requested_withdrawal'
            },
            { $set: { organizer_revenue_status: 'cleared' } }
        );
    }
    return updatedRequest;
  } catch (error) {
    console.error(`Error updating withdrawal request ${requestId} status in MongoDB:`, error);
    return null;
  }
}

export async function processRevenueClearance(): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    const salesCollection = db.collection('sales');
    const now = new Date().toISOString();
    
    const result = await salesCollection.updateMany(
        {
            status: 'paid',
            organizer_revenue_status: 'pending_clearance',
            organizer_revenue_clearance_date: { $lte: now }
        },
        { $set: { organizer_revenue_status: 'cleared' } }
    );
    if (result.modifiedCount > 0) {
      console.log(`Revenue clearance process completed. ${result.modifiedCount} sales updated to 'cleared'.`);
    }
  } catch (error) {
    console.error('Error processing revenue clearance in MongoDB:', error);
  }
}

export async function ensureAdminUserExists(): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<Omit<UserData, 'id'>>('users');
    const adminEmail = 'admin@trinkapass.com';
    const existingAdmin = await usersCollection.findOne({ email: adminEmail, tipo: 'admin' });

    if (!existingAdmin) {
      const adminUserData: Omit<UserData, '_id'> = { 
        id: `admin-${uuidv4()}`,
        nome: 'Admin TrinkaPass',
        email: adminEmail,
        password_hash: 'admin123', 
        tipo: 'admin',
        is_verified: true,
      };
      await usersCollection.insertOne(adminUserData as any);
      console.log('Default admin user created in MongoDB.');
    }
  } catch (error) {
    console.error('Error ensuring admin user exists in MongoDB:', error);
  }
}
// ensureAdminUserExists(); // Call this on application startup if needed, e.g., in a global setup file.
