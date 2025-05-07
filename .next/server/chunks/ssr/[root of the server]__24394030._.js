module.exports = {

"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/lib/data-service.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/lib/data-service.ts
/* __next_internal_action_entry_do_not_use__ {"0007607d7e44a59f484f0c9d696782ce9c2facf507":"getWithdrawalRequests","002b5f27a2e2f455e5c328bc86d2a737283cab24e9":"getSettings","0030d745627f9d3cd278846af6be212078eb1f7e57":"getAllSales","00869318d389e83cf56b30f77696a26797a3c7286e":"getEvents","00e04a8467821bdb5759fcc49ecf4acfd31ee403c7":"getUsers","400dc759fb53c85845c01b5ab88bd17f53a0505403":"addSale","4014673f5690e6187f1c62240fc3ae881acdcd3adc":"getUserById","4026e311bfaaaf3557000f064cd249ee5523a65a7a":"deleteUserById","402926ba1018080446c6b1765554192471c8a1fec4":"getSalesByEventId","405ab1fe625e42ab781091328cb93a19e88f27d391":"getEventsByOrganizerId","406ad1c73c6ef28f644102274e35ded49a31e80dba":"deleteEventAndSalesById","4073bcb42221ef8af338bc9c1a218feade98efd128":"getSaleByMercadoPagoExternalReference","4076d2b943b1b24d404d72bc167dbc784005c54e5f":"getEventById","409093572bf375d086c4793d06c5c6c9418365bc61":"addWithdrawalRequest","4093a1e6ef524f63be3a4eb42187c1f268b418ecea":"getUserByEmail","40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771":"getSaleById","40cd309465f8aeb51d5cc09923f6c4405c0b3848fe":"updateSettings","40d72c8f54a7d748bceb1c82a652fcbb710419c091":"addUser","6013af2833dfff618e93787c68c5f0b886d1fc4ce8":"updateEventSaleReferenceCounter","6029f431b4c08562ede1aac5f7864ca80186be9151":"updateUser","6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889":"addEvent","606343ce85765f58ca0f6b721273aad072d540d9a5":"updateSale","7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94":"updateEventStock","70316a1274d8debf33b329c5b94c8299d4d535fcf9":"updateWithdrawalRequestStatus","7071552795d30a78b666f08b48776e476f0212d934":"updateEvent"} */ __turbopack_context__.s({
    "addEvent": (()=>addEvent),
    "addSale": (()=>addSale),
    "addUser": (()=>addUser),
    "addWithdrawalRequest": (()=>addWithdrawalRequest),
    "deleteEventAndSalesById": (()=>deleteEventAndSalesById),
    "deleteUserById": (()=>deleteUserById),
    "getAllSales": (()=>getAllSales),
    "getEventById": (()=>getEventById),
    "getEvents": (()=>getEvents),
    "getEventsByOrganizerId": (()=>getEventsByOrganizerId),
    "getSaleById": (()=>getSaleById),
    "getSaleByMercadoPagoExternalReference": (()=>getSaleByMercadoPagoExternalReference),
    "getSalesByEventId": (()=>getSalesByEventId),
    "getSettings": (()=>getSettings),
    "getUserByEmail": (()=>getUserByEmail),
    "getUserById": (()=>getUserById),
    "getUsers": (()=>getUsers),
    "getWithdrawalRequests": (()=>getWithdrawalRequests),
    "updateEvent": (()=>updateEvent),
    "updateEventSaleReferenceCounter": (()=>updateEventSaleReferenceCounter),
    "updateEventStock": (()=>updateEventStock),
    "updateSale": (()=>updateSale),
    "updateSettings": (()=>updateSettings),
    "updateUser": (()=>updateUser),
    "updateWithdrawalRequestStatus": (()=>updateWithdrawalRequestStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'data');
const eventsFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'eventos.json');
const salesFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'vendas.json');
const usersFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'usuarios.json');
const settingsFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'settings.json');
const withdrawalRequestsFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, 'withdrawal-requests.json');
// Helper to read JSON
async function readJsonFile(filePath, defaultValue) {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with default value or empty structure
            const dataToStore = defaultValue !== undefined ? defaultValue : filePath.endsWith('s.json') || filePath.endsWith('os.json') ? [] : {};
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
            return dataToStore;
        }
        console.error(`Error accessing file ${filePath}:`, error);
        throw error; // Re-throw other errors
    }
    // File exists, proceed to read and parse
    try {
        const jsonData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading or parsing JSON from ${filePath}:`, error);
        // Fallback to default value if provided on read/parse error
        if (defaultValue !== undefined) return defaultValue;
        // Specific fallback for list-like files if no default is provided
        if (filePath.endsWith('s.json') || filePath.endsWith('os.json')) {
            return []; // Treat as empty list on error if it's a list file
        }
        throw error; // Re-throw other errors
    }
}
// Helper to write JSON
async function writeJsonFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, jsonData, 'utf-8');
    } catch (error) {
        console.error(`Error writing JSON to ${filePath}:`, error);
        throw error;
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getSettings() {
    return readJsonFile(settingsFilePath, {
        mercadoPagoAccessToken: ''
    });
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateSettings(newSettings) {
    const currentSettings = await getSettings();
    const updatedSettings = {
        ...currentSettings,
        ...newSettings
    };
    await writeJsonFile(settingsFilePath, updatedSettings);
    return updatedSettings;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getEvents() {
    return readJsonFile(eventsFilePath, []);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getEventById(id) {
    const events = await getEvents();
    return events.find((event)=>event.id === id);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getEventsByOrganizerId(organizerId) {
    const events = await getEvents();
    return events.filter((event)=>event.organizer_id === organizerId);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ addEvent(eventDetails, organizerId) {
    const events = await getEvents();
    const newEvent = {
        id: `evt-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])()}`,
        organizer_id: organizerId,
        ...eventDetails,
        quantidade_disponivel: eventDetails.quantidade_total,
        imagem_url: eventDetails.imagem_url || undefined,
        next_sale_reference_number: 1
    };
    events.push(newEvent);
    await writeJsonFile(eventsFilePath, events);
    return newEvent;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateEventSaleReferenceCounter(eventId, newCounterValue) {
    const events = await getEvents();
    const eventIndex = events.findIndex((event)=>event.id === eventId);
    if (eventIndex === -1) {
        console.error(`Event with ID ${eventId} not found for counter update.`);
        return false;
    }
    events[eventIndex].next_sale_reference_number = newCounterValue;
    await writeJsonFile(eventsFilePath, events);
    console.log(`Event ${eventId} sale reference counter updated to ${newCounterValue}`);
    return true;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateEvent(eventId, updates, currentOrganizerId) {
    const events = await getEvents();
    const eventIndex = events.findIndex((event)=>event.id === eventId);
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
    const updatedEvent = {
        ...currentEvent,
        ...updates,
        quantidade_disponivel: newQuantidadeDisponivel,
        imagem_url: updates.imagem_url || currentEvent.imagem_url,
        next_sale_reference_number: currentEvent.next_sale_reference_number || 1
    };
    events[eventIndex] = updatedEvent;
    await writeJsonFile(eventsFilePath, events);
    return updatedEvent;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ deleteEventAndSalesById(eventId) {
    try {
        let events = await getEvents();
        const eventExists = events.some((event)=>event.id === eventId);
        if (!eventExists) {
            return {
                success: false,
                message: 'Evento não encontrado.'
            };
        }
        events = events.filter((event)=>event.id !== eventId);
        await writeJsonFile(eventsFilePath, events);
        let sales = await getAllSales();
        sales = sales.filter((sale)=>sale.evento_id !== eventId);
        await writeJsonFile(salesFilePath, sales);
        return {
            success: true
        };
    } catch (error) {
        console.error('Error deleting event and associated sales:', error);
        return {
            success: false,
            message: 'Erro ao excluir evento e vendas associadas.'
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getAllSales() {
    return readJsonFile(salesFilePath, []);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getSaleById(id) {
    const sales = await getAllSales();
    return sales.find((sale)=>sale.id === id);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getSaleByMercadoPagoExternalReference(mpExternalRef) {
    const sales = await getAllSales();
    return sales.find((sale)=>sale.mercado_pago_external_reference === mpExternalRef);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ addSale(saleData) {
    const sales = await getAllSales();
    const newSale = {
        id: `sale-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])().substring(0, 12)}`,
        ...saleData
    };
    sales.push(newSale);
    await writeJsonFile(salesFilePath, sales);
    return newSale;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateSale(saleId, updates) {
    const sales = await getAllSales();
    const saleIndex = sales.findIndex((s)=>s.id === saleId);
    if (saleIndex === -1) {
        console.error(`Sale with ID ${saleId} not found for update.`);
        return null;
    }
    sales[saleIndex] = {
        ...sales[saleIndex],
        ...updates
    };
    await writeJsonFile(salesFilePath, sales);
    return sales[saleIndex];
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getSalesByEventId(eventId) {
    const sales = await getAllSales();
    return sales.filter((sale)=>sale.evento_id === eventId);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateEventStock(eventId, quantityChange, newAvailableQuantity) {
    const events = await getEvents();
    const eventIndex = events.findIndex((event)=>event.id === eventId);
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
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getUsers() {
    return readJsonFile(usersFilePath, []);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getUserById(id) {
    const users = await getUsers();
    return users.find((user)=>user.id === id);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getUserByEmail(email) {
    const users = await getUsers();
    return users.find((user)=>user.email === email);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ addUser(userData) {
    const users = await getUsers();
    users.push(userData);
    await writeJsonFile(usersFilePath, users);
    return userData;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateUser(userId, updates) {
    const users = await getUsers();
    const userIndex = users.findIndex((user)=>user.id === userId);
    if (userIndex === -1) {
        console.error(`User with ID ${userId} not found for update.`);
        return null;
    }
    const updatedUser = {
        ...users[userIndex]
    };
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
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ deleteUserById(userId) {
    try {
        let users = await getUsers();
        const userExists = users.some((user)=>user.id === userId);
        if (!userExists) {
            return {
                success: false,
                message: 'Usuário não encontrado.'
            };
        }
        users = users.filter((user)=>user.id !== userId);
        await writeJsonFile(usersFilePath, users);
        return {
            success: true
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        return {
            success: false,
            message: 'Erro ao excluir usuário.'
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getWithdrawalRequests() {
    return readJsonFile(withdrawalRequestsFilePath, []);
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ addWithdrawalRequest(requestData) {
    const requests = await getWithdrawalRequests();
    const newRequest = {
        id: `wdrl-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])()}`,
        ...requestData,
        requestDate: new Date().toISOString(),
        status: 'pending'
    };
    requests.push(newRequest);
    await writeJsonFile(withdrawalRequestsFilePath, requests);
    return newRequest;
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateWithdrawalRequestStatus(requestId, status, adminNotes) {
    const requests = await getWithdrawalRequests();
    const requestIndex = requests.findIndex((req)=>req.id === requestId);
    if (requestIndex === -1) {
        console.error(`Withdrawal request with ID ${requestId} not found.`);
        return null;
    }
    if (requests[requestIndex].status !== 'pending') {
        console.warn(`Withdrawal request ${requestId} is already processed. Current status: ${requests[requestIndex].status}`);
        return requests[requestIndex]; // Or return null if re-processing is not allowed
    }
    requests[requestIndex].status = status;
    requests[requestIndex].processedDate = new Date().toISOString();
    if (adminNotes) {
        requests[requestIndex].adminNotes = adminNotes;
    }
    await writeJsonFile(withdrawalRequestsFilePath, requests);
    return requests[requestIndex];
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSettings,
    updateSettings,
    getEvents,
    getEventById,
    getEventsByOrganizerId,
    addEvent,
    updateEventSaleReferenceCounter,
    updateEvent,
    deleteEventAndSalesById,
    getAllSales,
    getSaleById,
    getSaleByMercadoPagoExternalReference,
    addSale,
    updateSale,
    getSalesByEventId,
    updateEventStock,
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUserById,
    getWithdrawalRequests,
    addWithdrawalRequest,
    updateWithdrawalRequestStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSettings, "002b5f27a2e2f455e5c328bc86d2a737283cab24e9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSettings, "40cd309465f8aeb51d5cc09923f6c4405c0b3848fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEvents, "00869318d389e83cf56b30f77696a26797a3c7286e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventById, "4076d2b943b1b24d404d72bc167dbc784005c54e5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventsByOrganizerId, "405ab1fe625e42ab781091328cb93a19e88f27d391", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addEvent, "6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEventSaleReferenceCounter, "6013af2833dfff618e93787c68c5f0b886d1fc4ce8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEvent, "7071552795d30a78b666f08b48776e476f0212d934", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteEventAndSalesById, "406ad1c73c6ef28f644102274e35ded49a31e80dba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllSales, "0030d745627f9d3cd278846af6be212078eb1f7e57", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSaleById, "40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSaleByMercadoPagoExternalReference, "4073bcb42221ef8af338bc9c1a218feade98efd128", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSale, "400dc759fb53c85845c01b5ab88bd17f53a0505403", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSale, "606343ce85765f58ca0f6b721273aad072d540d9a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSalesByEventId, "402926ba1018080446c6b1765554192471c8a1fec4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEventStock, "7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUsers, "00e04a8467821bdb5759fcc49ecf4acfd31ee403c7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserById, "4014673f5690e6187f1c62240fc3ae881acdcd3adc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserByEmail, "4093a1e6ef524f63be3a4eb42187c1f268b418ecea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addUser, "40d72c8f54a7d748bceb1c82a652fcbb710419c091", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUser, "6029f431b4c08562ede1aac5f7864ca80186be9151", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteUserById, "4026e311bfaaaf3557000f064cd249ee5523a65a7a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getWithdrawalRequests, "0007607d7e44a59f484f0c9d696782ce9c2facf507", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addWithdrawalRequest, "409093572bf375d086c4793d06c5c6c9418365bc61", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateWithdrawalRequestStatus, "70316a1274d8debf33b329c5b94c8299d4d535fcf9", null);
}}),
"[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/actions/event-actions.ts
/* __next_internal_action_entry_do_not_use__ {"600d7b57e47a8c2435b84747a85de567ce8543a7b6":"createEventAction","70790d0f15bac42d5d2629667e78c2cafe96686834":"updateEventAction"} */ __turbopack_context__.s({
    "createEventAction": (()=>createEventAction),
    "updateEventAction": (()=>updateEventAction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ createEventAction(eventDetails, organizerId) {
    // Basic server-side validation (Zod schema validation should also happen on client)
    if (!eventDetails.nome_evento || eventDetails.nome_evento.length < 3) {
        return {
            success: false,
            error: 'Nome do evento é obrigatório e deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                nome_evento: 'Nome do evento é obrigatório.'
            }
        };
    }
    if (!eventDetails.descricao || eventDetails.descricao.length < 10) {
        return {
            success: false,
            error: 'Descrição é obrigatória e deve ter pelo menos 10 caracteres.',
            fieldErrors: {
                descricao: 'Descrição é obrigatória.'
            }
        };
    }
    if (!eventDetails.data_horario) {
        return {
            success: false,
            error: 'Data e horário são obrigatórios.',
            fieldErrors: {
                data_horario_date: 'Data é obrigatória.',
                data_horario_time: 'Horário é obrigatório.'
            }
        };
    }
    // Check if date is in the past - simple check
    if (new Date(eventDetails.data_horario) < new Date()) {
        return {
            success: false,
            error: 'A data do evento não pode ser no passado.',
            fieldErrors: {
                data_horario_date: 'Data não pode ser no passado.'
            }
        };
    }
    if (eventDetails.nome_local_evento && eventDetails.nome_local_evento.length < 3) {
        return {
            success: false,
            error: 'Nome do local do evento deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                nome_local_evento: 'Nome do local do evento inválido.'
            }
        };
    }
    if (!eventDetails.cep || !/^\d{5}-?\d{3}$/.test(eventDetails.cep)) {
        return {
            success: false,
            error: 'CEP é obrigatório e deve estar no formato correto.',
            fieldErrors: {
                cep: 'CEP inválido.'
            }
        };
    }
    if (!eventDetails.local || eventDetails.local.length < 5) {
        return {
            success: false,
            error: 'Endereço (Rua, Bairro, Número) é obrigatório e deve ter pelo menos 5 caracteres.',
            fieldErrors: {
                local: 'Endereço é obrigatório.'
            }
        };
    }
    if (!eventDetails.cidade || eventDetails.cidade.length < 3) {
        return {
            success: false,
            error: 'Cidade é obrigatória e deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                cidade: 'Cidade é obrigatória.'
            }
        };
    }
    if (eventDetails.preco_ingresso === undefined || eventDetails.preco_ingresso < 0) {
        return {
            success: false,
            error: 'Preço do ingresso deve ser um valor positivo ou zero.',
            fieldErrors: {
                preco_ingresso: 'Preço inválido.'
            }
        };
    }
    if (eventDetails.quantidade_total === undefined || eventDetails.quantidade_total <= 0) {
        return {
            success: false,
            error: 'Quantidade total de ingressos deve ser maior que zero.',
            fieldErrors: {
                quantidade_total: 'Quantidade inválida.'
            }
        };
    }
    if (!organizerId) {
        return {
            success: false,
            error: 'ID do organizador não fornecido. Faça login novamente.'
        };
    }
    if (eventDetails.imagem_url && !eventDetails.imagem_url.startsWith('data:image/')) {
        return {
            success: false,
            error: 'Formato de imagem inválido. Use o upload.',
            fieldErrors: {
                imagem_url: 'Imagem inválida.'
            }
        };
    }
    try {
        const newEvent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addEvent"])(eventDetails, organizerId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/organizer/dashboard');
        return {
            success: true,
            event: newEvent
        };
    } catch (error) {
        console.error('Error creating event:', error);
        let errorMessage = 'Ocorreu um erro ao criar o evento.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ updateEventAction(eventId, eventDetails, organizerId) {
    // Basic server-side validation
    if (!eventDetails.nome_evento || eventDetails.nome_evento.length < 3) {
        return {
            success: false,
            error: 'Nome do evento é obrigatório e deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                nome_evento: 'Nome do evento é obrigatório.'
            }
        };
    }
    if (!eventDetails.descricao || eventDetails.descricao.length < 10) {
        return {
            success: false,
            error: 'Descrição é obrigatória e deve ter pelo menos 10 caracteres.',
            fieldErrors: {
                descricao: 'Descrição é obrigatória.'
            }
        };
    }
    if (!eventDetails.data_horario) {
        return {
            success: false,
            error: 'Data e horário são obrigatórios.',
            fieldErrors: {
                data_horario_date: 'Data é obrigatória.',
                data_horario_time: 'Horário é obrigatório.'
            }
        };
    }
    if (new Date(eventDetails.data_horario).toString() === "Invalid Date") {
        return {
            success: false,
            error: 'Data do evento inválida.',
            fieldErrors: {
                data_horario_date: 'Data inválida.'
            }
        };
    }
    if (eventDetails.nome_local_evento && eventDetails.nome_local_evento.length < 3) {
        return {
            success: false,
            error: 'Nome do local do evento deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                nome_local_evento: 'Nome do local do evento inválido.'
            }
        };
    }
    if (!eventDetails.cep || !/^\d{5}-?\d{3}$/.test(eventDetails.cep)) {
        return {
            success: false,
            error: 'CEP é obrigatório e deve estar no formato correto.',
            fieldErrors: {
                cep: 'CEP inválido.'
            }
        };
    }
    if (!eventDetails.local || eventDetails.local.length < 5) {
        return {
            success: false,
            error: 'Endereço (Rua, Bairro, Número) é obrigatório e deve ter pelo menos 5 caracteres.',
            fieldErrors: {
                local: 'Endereço é obrigatório.'
            }
        };
    }
    if (!eventDetails.cidade || eventDetails.cidade.length < 3) {
        return {
            success: false,
            error: 'Cidade é obrigatória e deve ter pelo menos 3 caracteres.',
            fieldErrors: {
                cidade: 'Cidade é obrigatória.'
            }
        };
    }
    if (eventDetails.preco_ingresso === undefined || eventDetails.preco_ingresso < 0) {
        return {
            success: false,
            error: 'Preço do ingresso deve ser um valor positivo ou zero.',
            fieldErrors: {
                preco_ingresso: 'Preço inválido.'
            }
        };
    }
    if (eventDetails.quantidade_total === undefined || eventDetails.quantidade_total <= 0) {
        return {
            success: false,
            error: 'Quantidade total de ingressos deve ser maior que zero.',
            fieldErrors: {
                quantidade_total: 'Quantidade inválida.'
            }
        };
    }
    if (!organizerId) {
        return {
            success: false,
            error: 'ID do organizador não fornecido. Faça login novamente.'
        };
    }
    if (!eventId) {
        return {
            success: false,
            error: 'ID do evento não fornecido para atualização.'
        };
    }
    if (eventDetails.imagem_url && !eventDetails.imagem_url.startsWith('data:image/')) {
        return {
            success: false,
            error: 'Formato de imagem inválido. Use o upload.',
            fieldErrors: {
                imagem_url: 'Imagem inválida.'
            }
        };
    }
    try {
        const existingEvent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"])(eventId);
        if (!existingEvent) {
            return {
                success: false,
                error: 'Evento não encontrado para atualização.'
            };
        }
        if (existingEvent.organizer_id !== organizerId) {
            return {
                success: false,
                error: 'Você não tem permissão para editar este evento.'
            };
        }
        const ticketsSold = existingEvent.quantidade_total - existingEvent.quantidade_disponivel;
        if (eventDetails.quantidade_total < ticketsSold) {
            return {
                success: false,
                error: `A nova quantidade total de ingressos (${eventDetails.quantidade_total}) não pode ser menor que a quantidade já vendida (${ticketsSold}).`,
                fieldErrors: {
                    quantidade_total: 'Quantidade total inválida devido aos ingressos já vendidos.'
                }
            };
        }
        const updatedEvent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEvent"])(eventId, eventDetails, organizerId);
        if (!updatedEvent) {
            return {
                success: false,
                error: 'Falha ao atualizar o evento no serviço de dados.'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/organizer/dashboard');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/event/${eventId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/organizer/events/${eventId}/edit`);
        return {
            success: true,
            event: updatedEvent
        };
    } catch (error) {
        console.error('Error updating event:', error);
        let errorMessage = 'Ocorreu um erro ao atualizar o evento.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            error: errorMessage
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createEventAction,
    updateEventAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEventAction, "600d7b57e47a8c2435b84747a85de567ce8543a7b6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEventAction, "70790d0f15bac42d5d2629667e78c2cafe96686834", null);
}}),
"[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"40b42b3cde92dc1b4bd1af826fb2f017930a95c57c":"fetchAddressByCepAction"} */ __turbopack_context__.s({
    "fetchAddressByCepAction": (()=>fetchAddressByCepAction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ fetchAddressByCepAction(cep) {
    const cleanedCep = cep.replace(/\D/g, ''); // Remove non-digits
    if (cleanedCep.length !== 8) {
        return {
            success: false,
            error: 'CEP inválido. Deve conter 8 dígitos.'
        };
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        if (!response.ok) {
            // ViaCEP might return non-200 for errors like too many requests, though usually it's 200 with "erro: true"
            console.error(`ViaCEP API request failed with status ${response.status} for CEP ${cleanedCep}`);
            return {
                success: false,
                error: `Falha ao buscar CEP. Status: ${response.status}`
            };
        }
        const data = await response.json();
        if (data.erro) {
            return {
                success: false,
                error: 'CEP não encontrado.'
            };
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('Error fetching CEP data:', error);
        return {
            success: false,
            error: 'Ocorreu um erro ao buscar o CEP. Verifique sua conexão.'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchAddressByCepAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAddressByCepAction, "40b42b3cde92dc1b4bd1af826fb2f017930a95c57c", null);
}}),
"[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
}}),
"[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40b42b3cde92dc1b4bd1af826fb2f017930a95c57c": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAddressByCepAction"]),
    "600d7b57e47a8c2435b84747a85de567ce8543a7b6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEventAction"]),
    "70790d0f15bac42d5d2629667e78c2cafe96686834": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEventAction"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "40b42b3cde92dc1b4bd1af826fb2f017930a95c57c": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40b42b3cde92dc1b4bd1af826fb2f017930a95c57c"]),
    "600d7b57e47a8c2435b84747a85de567ce8543a7b6": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["600d7b57e47a8c2435b84747a85de567ce8543a7b6"]),
    "70790d0f15bac42d5d2629667e78c2cafe96686834": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["70790d0f15bac42d5d2629667e78c2cafe96686834"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$organizer$2f$events$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$event$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$cep$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/organizer/events/create/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/event-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/cep-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/organizer/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/organizer/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/organizer/events/create/page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/organizer/events/create/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/organizer/events/create/page.tsx <module evaluation>", "default");
}}),
"[project]/src/app/organizer/events/create/page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/organizer/events/create/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/organizer/events/create/page.tsx", "default");
}}),
"[project]/src/app/organizer/events/create/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$organizer$2f$events$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/organizer/events/create/page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$organizer$2f$events$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/organizer/events/create/page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$organizer$2f$events$2f$create$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/organizer/events/create/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/organizer/events/create/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__24394030._.js.map