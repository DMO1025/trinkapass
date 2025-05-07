// This file is intended to re-export functions from data-service.ts
// that are safe to be called from server components or server actions.
// In Next.js 13+ with App Router, direct imports from 'data-service.ts'
// in server components or actions will run on the server.
// This file is more for logical separation or if you have specific
// server-only augmentations. For now, it will just re-export.
// If you have specific server-only logic, it would go here.

import { 
    getEvents, 
    getEventById, 
    addSale, 
    updateEventStock, 
    getUsers, 
    getUserById, 
    getUserByEmail,
    addUser,
    addEvent,
    updateEvent, 
    updateUser, 
    getEventsByOrganizerId,
    getSalesByEventId,
    getAllSales,
    deleteUserById,
    deleteEventAndSalesById,
    getSettings, 
    updateSettings,
    getWithdrawalRequests, 
    addWithdrawalRequest, 
    updateWithdrawalRequestStatus,
    getWithdrawalRequestsByOrganizerId,
    getSaleByMercadoPagoExternalReference, // Added
    updateSale // Added
} from './data-service';

// Re-export all functions that are intended for server-side use.
// This makes it explicit that these are server-side operations when imported from this file.
export {
    getEvents, 
    getEventById, 
    addSale, 
    updateEventStock, 
    getUsers, 
    getUserById, 
    getUserByEmail,
    addUser,
    addEvent,
    updateEvent,
    updateUser, 
    getEventsByOrganizerId,
    getSalesByEventId,
    getAllSales,
    deleteUserById,
    deleteEventAndSalesById,
    getSettings, 
    updateSettings,
    getWithdrawalRequests, 
    addWithdrawalRequest, 
    updateWithdrawalRequestStatus,
    getWithdrawalRequestsByOrganizerId,
    getSaleByMercadoPagoExternalReference, // Export
    updateSale // Export
};

// Example of a server-only function if you needed one that isn't in data-service.ts
// export async function getSensitiveServerData(): Promise<any> {
//   // ... server-only logic, e.g., accessing environment variables directly
//   return { data: "sensitive server data" };
// }

