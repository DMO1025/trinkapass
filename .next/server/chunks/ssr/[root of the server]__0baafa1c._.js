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
/* __next_internal_action_entry_do_not_use__ {"0030d745627f9d3cd278846af6be212078eb1f7e57":"getAllSales","00869318d389e83cf56b30f77696a26797a3c7286e":"getEvents","00e04a8467821bdb5759fcc49ecf4acfd31ee403c7":"getUsers","400dc759fb53c85845c01b5ab88bd17f53a0505403":"addSale","4014673f5690e6187f1c62240fc3ae881acdcd3adc":"getUserById","4026e311bfaaaf3557000f064cd249ee5523a65a7a":"deleteUserById","402926ba1018080446c6b1765554192471c8a1fec4":"getSalesByEventId","405ab1fe625e42ab781091328cb93a19e88f27d391":"getEventsByOrganizerId","406ad1c73c6ef28f644102274e35ded49a31e80dba":"deleteEventAndSalesById","4073bcb42221ef8af338bc9c1a218feade98efd128":"getSaleByMercadoPagoExternalReference","4076d2b943b1b24d404d72bc167dbc784005c54e5f":"getEventById","4093a1e6ef524f63be3a4eb42187c1f268b418ecea":"getUserByEmail","40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771":"getSaleById","40d72c8f54a7d748bceb1c82a652fcbb710419c091":"addUser","6013af2833dfff618e93787c68c5f0b886d1fc4ce8":"updateEventSaleReferenceCounter","6029f431b4c08562ede1aac5f7864ca80186be9151":"updateUser","6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889":"addEvent","606343ce85765f58ca0f6b721273aad072d540d9a5":"updateSale","7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94":"updateEventStock","7071552795d30a78b666f08b48776e476f0212d934":"updateEvent"} */ __turbopack_context__.s({
    "addEvent": (()=>addEvent),
    "addSale": (()=>addSale),
    "addUser": (()=>addUser),
    "deleteEventAndSalesById": (()=>deleteEventAndSalesById),
    "deleteUserById": (()=>deleteUserById),
    "getAllSales": (()=>getAllSales),
    "getEventById": (()=>getEventById),
    "getEvents": (()=>getEvents),
    "getEventsByOrganizerId": (()=>getEventsByOrganizerId),
    "getSaleById": (()=>getSaleById),
    "getSaleByMercadoPagoExternalReference": (()=>getSaleByMercadoPagoExternalReference),
    "getSalesByEventId": (()=>getSalesByEventId),
    "getUserByEmail": (()=>getUserByEmail),
    "getUserById": (()=>getUserById),
    "getUsers": (()=>getUsers),
    "updateEvent": (()=>updateEvent),
    "updateEventSaleReferenceCounter": (()=>updateEventSaleReferenceCounter),
    "updateEventStock": (()=>updateEventStock),
    "updateSale": (()=>updateSale),
    "updateUser": (()=>updateUser)
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
// const settingsFilePath = path.join(dataDir, 'settings.json'); // Removed
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
    // Add updates for PIX key and ID photo
    if (updates.pix_key_type !== undefined) {
        updatedUser.pix_key_type = updates.pix_key_type === '' ? undefined : updates.pix_key_type;
    }
    if (updates.pix_key !== undefined) {
        updatedUser.pix_key = updates.pix_key === '' ? undefined : updates.pix_key;
    }
    if (updates.id_photo_data_uri !== undefined) {
        updatedUser.id_photo_data_uri = updates.id_photo_data_uri === '' ? undefined : updates.id_photo_data_uri;
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
    deleteUserById
]);
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
}}),
"[project]/src/lib/constants.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/lib/constants.ts
__turbopack_context__.s({
    "SERVICE_FEE_PER_TICKET": (()=>SERVICE_FEE_PER_TICKET)
});
const SERVICE_FEE_PER_TICKET = 2.00; // R$ 2,00
}}),
"[project]/src/services/mercado-pago-service.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/services/mercado-pago-service.ts
/* __next_internal_action_entry_do_not_use__ {"40083e2f6bb4dc91241464c0d25ac25b0cd1d120bb":"getPaymentStatusMP","7866de1c36421ed7f6147fc584d53fa37e4db31b58":"createPixPaymentMP"} */ __turbopack_context__.s({
    "createPixPaymentMP": (()=>createPixPaymentMP),
    "getPaymentStatusMP": (()=>getPaymentStatusMP)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ createPixPaymentMP(amount, description, payerEmail, externalReference// Your internal sale ID
) {
    // const appSettings = await getSettings(); // Removed
    // const accessToken = appSettings.mercadoPagoAccessToken || process.env.MERCADO_PAGO_ACCESS_TOKEN; // Modified
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
        console.error('Mercado Pago Access Token is not configured in environment variables.');
        return {
            success: false,
            error: 'Configuração de pagamento indisponível. Contate o administrador.'
        };
    }
    // Ensure amount is correctly formatted (e.g., two decimal places for Mercado Pago)
    const formattedAmount = parseFloat(amount.toFixed(2));
    const paymentData = {
        transaction_amount: formattedAmount,
        description: description,
        payment_method_id: 'pix',
        payer: {
            email: payerEmail
        },
        external_reference: externalReference
    };
    try {
        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Idempotency-Key': externalReference
            },
            body: JSON.stringify(paymentData)
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
                displayMessage = 'Valor da transação inválido para o Mercado Pago.';
            }
            return {
                success: false,
                error: displayMessage
            };
        }
        const pixCopyPaste = responseData.point_of_interaction?.transaction_data?.qr_code;
        const qrCodeBase64 = responseData.point_of_interaction?.transaction_data?.qr_code_base64;
        const paymentId = responseData.id?.toString();
        if (!pixCopyPaste) {
            console.error('Mercado Pago API did not return PIX copy/paste code:', responseData);
            return {
                success: false,
                error: 'Não foi possível obter o código PIX Copia e Cola do Mercado Pago.'
            };
        }
        return {
            success: true,
            pixCopyPaste,
            qrCodeBase64,
            paymentId
        };
    } catch (error) {
        console.error('Network or other error creating Mercado Pago PIX payment:', error);
        return {
            success: false,
            error: 'Erro de comunicação ao tentar gerar PIX. Tente novamente.'
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ getPaymentStatusMP(mpPaymentId) {
    // const appSettings = await getSettings(); // Removed
    // const accessToken = appSettings.mercadoPagoAccessToken || process.env.MERCADO_PAGO_ACCESS_TOKEN; // Modified
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
        console.error('Mercado Pago Access Token is not configured in environment variables.');
        return {
            success: false,
            error: 'Configuração de pagamento indisponível. Contate o administrador.'
        };
    }
    if (!mpPaymentId) {
        return {
            success: false,
            error: 'ID do Pagamento Mercado Pago não fornecido.'
        };
    }
    try {
        console.log(`Fetching payment status for MP Payment ID: ${mpPaymentId}`);
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${mpPaymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const responseData = await response.json();
        console.log(`MP API Response for ${mpPaymentId} status: ${response.status}`, responseData);
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
            externalReference: responseData.external_reference
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPixPaymentMP,
    getPaymentStatusMP
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPixPaymentMP, "7866de1c36421ed7f6147fc584d53fa37e4db31b58", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPaymentStatusMP, "40083e2f6bb4dc91241464c0d25ac25b0cd1d120bb", null);
}}),
"[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/actions/purchase-actions.ts
/* __next_internal_action_entry_do_not_use__ {"40f2385f2b646e244457ea7d02d16256e917be1420":"initiatePurchaseAction","60917a2160a989255df04d6937d268a2ace3e57d4d":"checkPaymentStatusAction"} */ __turbopack_context__.s({
    "checkPaymentStatusAction": (()=>checkPaymentStatusAction),
    "initiatePurchaseAction": (()=>initiatePurchaseAction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mercado$2d$pago$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/mercado-pago-service.ts [app-rsc] (ecmascript)");
// import { v4 as uuidv4 } from 'uuid'; // No longer needed for tempSaleId if mpExternalReference is the primary external key for MP
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ initiatePurchaseAction(purchaseData) {
    try {
        const event = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"])(purchaseData.evento_id);
        if (!event) {
            return {
                success: false,
                error: 'Evento não encontrado.'
            };
        }
        if (event.quantidade_disponivel < purchaseData.quantidade) {
            return {
                success: false,
                error: 'Ingressos insuficientes disponíveis.'
            };
        }
        // Generate sequential external reference for Mercado Pago
        const currentCounter = event.next_sale_reference_number || 1;
        const eventIdPart = event.id.startsWith('evt-') ? event.id.substring(4, 12) : event.id.substring(0, 8);
        const mercadoPagoExternalReference = `TRK-${eventIdPart}-${String(currentCounter).padStart(9, '0')}`;
        const precoIngressoUnitario = event.preco_ingresso;
        const taxaServicoUnitaria = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICE_FEE_PER_TICKET"];
        const valorTotalItem = precoIngressoUnitario + taxaServicoUnitaria;
        const valorTotalCompra = valorTotalItem * purchaseData.quantidade;
        const mpResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mercado$2d$pago$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPixPaymentMP"])(valorTotalCompra, `Ingressos para ${event.nome_evento} (TrinkaPass)`, purchaseData.email_comprador, mercadoPagoExternalReference // Use the new sequential reference for MP
        );
        if (!mpResult.success || !mpResult.pixCopyPaste || !mpResult.paymentId) {
            return {
                success: false,
                error: mpResult.error || 'Falha ao gerar PIX com o Mercado Pago.'
            };
        }
        // Update event counter after successful MP PIX generation
        const counterUpdated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEventSaleReferenceCounter"])(event.id, currentCounter + 1);
        if (!counterUpdated) {
            console.error(`CRITICAL: Failed to update sale reference counter for event ${event.id} after MP PIX generation. Expected next: ${currentCounter + 1}`);
        }
        const newSaleRecord = {
            evento_id: purchaseData.evento_id,
            nome_comprador: purchaseData.nome_comprador,
            email_comprador: purchaseData.email_comprador,
            whatsapp: purchaseData.whatsapp,
            quantidade: purchaseData.quantidade,
            preco_ingresso_unitario: precoIngressoUnitario,
            taxa_servico_unitaria: taxaServicoUnitaria,
            valor_total_item: valorTotalItem,
            valor_total_compra: valorTotalCompra,
            data_compra: new Date().toISOString(),
            status: 'pending_payment',
            pix_copia_cola_mp: mpResult.pixCopyPaste,
            mp_payment_id: mpResult.paymentId,
            mercado_pago_external_reference: mercadoPagoExternalReference
        };
        const createdSale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSale"])(newSaleRecord);
        return {
            success: true,
            pixCopyPaste: mpResult.pixCopyPaste,
            qrCodeBase64: mpResult.qrCodeBase64,
            saleId: createdSale.id,
            totalAmount: valorTotalCompra,
            mpPaymentId: mpResult.paymentId,
            mpExternalReference: mercadoPagoExternalReference
        };
    } catch (error) {
        console.error('Error initiating purchase:', error);
        let errorMessage = 'Ocorreu um erro ao iniciar sua compra.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            error: errorMessage
        };
    }
}
async function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ checkPaymentStatusAction(mpPaymentId, mpExternalReference) {
    if (!mpPaymentId) {
        return {
            success: false,
            message: 'ID do Pagamento do Mercado Pago não fornecido.'
        };
    }
    try {
        const mpApiResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$mercado$2d$pago$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPaymentStatusMP"])(mpPaymentId);
        if (!mpApiResult.success || !mpApiResult.status) {
            return {
                success: false,
                message: mpApiResult.error || 'Falha ao verificar status do pagamento com Mercado Pago.',
                mpPaymentId: mpPaymentId,
                saleId: mpExternalReference || mpApiResult.externalReference
            };
        }
        let userMessage = `Status do Pagamento: ${mpApiResult.status}`;
        let organizerWhatsAppNumber;
        let prefilledWhatsAppMessageToOrganizer;
        const effectiveExternalReference = mpApiResult.externalReference || mpExternalReference;
        if (mpApiResult.status === 'approved' && effectiveExternalReference) {
            const saleToConfirm = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSaleByMercadoPagoExternalReference"])(effectiveExternalReference);
            if (saleToConfirm) {
                if (saleToConfirm.status === 'pending_payment') {
                    console.log(`checkPaymentStatusAction: Confirming sale ${saleToConfirm.id} (MP Ext Ref: ${effectiveExternalReference}) based on MP status 'approved'. Current DB status: '${saleToConfirm.status}'.`);
                    const updatedSale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSale"])(saleToConfirm.id, {
                        status: 'paid',
                        data_pagamento_confirmado: new Date().toISOString(),
                        mp_payment_id: mpApiResult.paymentId
                    });
                    if (updatedSale) {
                        console.log(`checkPaymentStatusAction: Sale ${updatedSale.id} status updated to 'paid'. Updating stock.`);
                        const stockUpdated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEventStock"])(updatedSale.evento_id, updatedSale.quantidade);
                        if (!stockUpdated) {
                            console.error(`checkPaymentStatusAction: CRITICAL - Failed to update stock for event ${updatedSale.evento_id} after sale ${updatedSale.id} confirmation.`);
                        } else {
                            console.log(`checkPaymentStatusAction: Stock for event ${updatedSale.evento_id} updated.`);
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/event/${updatedSale.evento_id}`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/events/${updatedSale.evento_id}/buyers`);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/organizer/dashboard');
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/organizer/events/${updatedSale.evento_id}/buyers`);
                        console.log(`checkPaymentStatusAction: Paths revalidated for sale ${updatedSale.id}.`);
                    } else {
                        console.error(`checkPaymentStatusAction: Failed to update sale ${saleToConfirm.id} in DB.`);
                    }
                } else {
                    console.log(`checkPaymentStatusAction: Sale ${saleToConfirm.id} (MP Ext Ref: ${effectiveExternalReference}) is already in status '${saleToConfirm.status}'. No DB update needed by manual check.`);
                }
                // Prepare WhatsApp info regardless of DB update if MP says approved
                const event = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"])(saleToConfirm.evento_id);
                if (event && event.organizer_id) {
                    const organizer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"])(event.organizer_id);
                    if (organizer && organizer.whatsapp) {
                        organizerWhatsAppNumber = `55${organizer.whatsapp.replace(/\D/g, '')}`;
                        prefilledWhatsAppMessageToOrganizer = `Olá ${organizer.nome || 'Organizador(a)'},
Uma compra de ${saleToConfirm.quantidade} ingresso(s) para o seu evento "${event.nome_evento}" (TrinkaPass) foi APROVADA!
Referência da Compra (Mercado Pago): ${effectiveExternalReference}.
ID da Venda (TrinkaPass): ${saleToConfirm.id}.
Valor total da compra: R$ ${saleToConfirm.valor_total_compra.toFixed(2).replace('.', ',')}.
Nome do Comprador: ${saleToConfirm.nome_comprador}.
Obrigado(a)!`;
                    }
                }
            } else {
                console.warn(`checkPaymentStatusAction: Sale with MP External Reference ${effectiveExternalReference} not found, but MP API reported 'approved'.`);
            // User message will be set below if not 'approved'
            }
            userMessage = 'Pagamento Aprovado!'; // This is the primary message if MP status is 'approved'
        } else {
            switch(mpApiResult.status){
                case 'pending_payment':
                case 'in_process':
                case 'pending':
                    userMessage = 'Pagamento ainda está pendente ou em processamento.';
                    break;
                case 'rejected':
                    userMessage = 'Pagamento Rejeitado.';
                    break;
                case 'cancelled':
                    userMessage = 'Pagamento Cancelado.';
                    break;
                case 'refunded':
                    userMessage = 'Pagamento Estornado.';
                    break;
                case 'charged_back':
                    userMessage = 'Pagamento Revertido (Chargeback).';
                    break;
                default:
                    userMessage = `Status do pagamento: ${mpApiResult.status || 'Desconhecido'}. Aguarde a confirmação.`;
            }
        }
        return {
            success: true,
            paymentStatus: mpApiResult.status,
            message: userMessage,
            saleId: effectiveExternalReference,
            mpPaymentId: mpApiResult.paymentId,
            organizerWhatsAppNumber,
            prefilledWhatsAppMessageToOrganizer
        };
    } catch (error) {
        console.error(`Error in checkPaymentStatusAction for MP Payment ID ${mpPaymentId}:`, error);
        return {
            success: false,
            message: 'Ocorreu um erro interno ao verificar o status do pagamento.',
            mpPaymentId: mpPaymentId,
            saleId: mpExternalReference
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    initiatePurchaseAction,
    checkPaymentStatusAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(initiatePurchaseAction, "40f2385f2b646e244457ea7d02d16256e917be1420", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkPaymentStatusAction, "60917a2160a989255df04d6937d268a2ace3e57d4d", null);
}}),
"[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/data-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/data-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/data-service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/data-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "0030d745627f9d3cd278846af6be212078eb1f7e57": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllSales"]),
    "00869318d389e83cf56b30f77696a26797a3c7286e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEvents"]),
    "00e04a8467821bdb5759fcc49ecf4acfd31ee403c7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUsers"]),
    "400dc759fb53c85845c01b5ab88bd17f53a0505403": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSale"]),
    "4014673f5690e6187f1c62240fc3ae881acdcd3adc": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserById"]),
    "4026e311bfaaaf3557000f064cd249ee5523a65a7a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteUserById"]),
    "402926ba1018080446c6b1765554192471c8a1fec4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSalesByEventId"]),
    "405ab1fe625e42ab781091328cb93a19e88f27d391": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventsByOrganizerId"]),
    "406ad1c73c6ef28f644102274e35ded49a31e80dba": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteEventAndSalesById"]),
    "4073bcb42221ef8af338bc9c1a218feade98efd128": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSaleByMercadoPagoExternalReference"]),
    "4076d2b943b1b24d404d72bc167dbc784005c54e5f": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"]),
    "4093a1e6ef524f63be3a4eb42187c1f268b418ecea": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserByEmail"]),
    "40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSaleById"]),
    "40d72c8f54a7d748bceb1c82a652fcbb710419c091": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addUser"]),
    "40f2385f2b646e244457ea7d02d16256e917be1420": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initiatePurchaseAction"]),
    "6013af2833dfff618e93787c68c5f0b886d1fc4ce8": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEventSaleReferenceCounter"]),
    "6029f431b4c08562ede1aac5f7864ca80186be9151": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUser"]),
    "6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addEvent"]),
    "606343ce85765f58ca0f6b721273aad072d540d9a5": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSale"]),
    "60917a2160a989255df04d6937d268a2ace3e57d4d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkPaymentStatusAction"]),
    "7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEventStock"]),
    "7071552795d30a78b666f08b48776e476f0212d934": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEvent"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/data-service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/data-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "0030d745627f9d3cd278846af6be212078eb1f7e57": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["0030d745627f9d3cd278846af6be212078eb1f7e57"]),
    "00869318d389e83cf56b30f77696a26797a3c7286e": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00869318d389e83cf56b30f77696a26797a3c7286e"]),
    "00e04a8467821bdb5759fcc49ecf4acfd31ee403c7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00e04a8467821bdb5759fcc49ecf4acfd31ee403c7"]),
    "400dc759fb53c85845c01b5ab88bd17f53a0505403": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["400dc759fb53c85845c01b5ab88bd17f53a0505403"]),
    "4014673f5690e6187f1c62240fc3ae881acdcd3adc": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4014673f5690e6187f1c62240fc3ae881acdcd3adc"]),
    "4026e311bfaaaf3557000f064cd249ee5523a65a7a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4026e311bfaaaf3557000f064cd249ee5523a65a7a"]),
    "402926ba1018080446c6b1765554192471c8a1fec4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["402926ba1018080446c6b1765554192471c8a1fec4"]),
    "405ab1fe625e42ab781091328cb93a19e88f27d391": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["405ab1fe625e42ab781091328cb93a19e88f27d391"]),
    "406ad1c73c6ef28f644102274e35ded49a31e80dba": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["406ad1c73c6ef28f644102274e35ded49a31e80dba"]),
    "4073bcb42221ef8af338bc9c1a218feade98efd128": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4073bcb42221ef8af338bc9c1a218feade98efd128"]),
    "4076d2b943b1b24d404d72bc167dbc784005c54e5f": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4076d2b943b1b24d404d72bc167dbc784005c54e5f"]),
    "4093a1e6ef524f63be3a4eb42187c1f268b418ecea": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4093a1e6ef524f63be3a4eb42187c1f268b418ecea"]),
    "40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40bbd3506ae71c16a8f55aab1efaa6c9fad9a1d771"]),
    "40d72c8f54a7d748bceb1c82a652fcbb710419c091": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40d72c8f54a7d748bceb1c82a652fcbb710419c091"]),
    "40f2385f2b646e244457ea7d02d16256e917be1420": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["40f2385f2b646e244457ea7d02d16256e917be1420"]),
    "6013af2833dfff618e93787c68c5f0b886d1fc4ce8": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["6013af2833dfff618e93787c68c5f0b886d1fc4ce8"]),
    "6029f431b4c08562ede1aac5f7864ca80186be9151": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["6029f431b4c08562ede1aac5f7864ca80186be9151"]),
    "6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["6041c5ba741b5ce06fe6de8eaa67e65c4d1eece889"]),
    "606343ce85765f58ca0f6b721273aad072d540d9a5": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["606343ce85765f58ca0f6b721273aad072d540d9a5"]),
    "60917a2160a989255df04d6937d268a2ace3e57d4d": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["60917a2160a989255df04d6937d268a2ace3e57d4d"]),
    "7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["7021ae6cfd58bfb0ed32cce91eec4d7d2427578d94"]),
    "7071552795d30a78b666f08b48776e476f0212d934": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["7071552795d30a78b666f08b48776e476f0212d934"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/data-service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$event$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$purchase$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/event/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/data-service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/actions/purchase-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
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
"[project]/src/components/purchase-form.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/purchase-form.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/purchase-form.tsx <module evaluation>", "default");
}}),
"[project]/src/components/purchase-form.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/purchase-form.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/purchase-form.tsx", "default");
}}),
"[project]/src/components/purchase-form.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$purchase$2d$form$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/purchase-form.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$purchase$2d$form$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/purchase-form.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$purchase$2d$form$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/event/[id]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EventPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-rsc] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-rsc] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-rsc] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-rsc] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-rsc] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-rsc] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$purchase$2d$form$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/purchase-form.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function EventPage({ params }) {
    const event = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"])(params.id);
    if (!event) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container text-center py-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "display-5 fw-bold text-danger",
                    children: "Evento não encontrado"
                }, void 0, false, {
                    fileName: "[project]/src/app/event/[id]/page.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted mt-2",
                    children: "O evento que você está procurando não existe ou foi removido."
                }, void 0, false, {
                    fileName: "[project]/src/app/event/[id]/page.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/event/[id]/page.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this);
    }
    const eventDate = new Date(event.data_horario);
    const timeZone = 'America/Sao_Paulo';
    const formattedDate = eventDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone
    });
    const formattedTime = eventDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone
    });
    const isSoldOut = event.quantidade_disponivel <= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container-fluid container-lg py-4 py-md-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card shadow-lg overflow-hidden",
            children: [
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "position-relative",
                    style: {
                        height: '300px',
                        width: '100%'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: event.imagem_url || `https://picsum.photos/seed/${event.id}/1200/400`,
                        alt: event.nome_evento,
                        layout: "fill",
                        objectFit: "cover",
                        priority: true,
                        "data-ai-hint": "event detail banner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/event/[id]/page.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/event/[id]/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-header p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "card-title display-5 fw-bold text-primary",
                        children: event.nome_evento
                    }, void 0, false, {
                        fileName: "[project]/src/app/event/[id]/page.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/event/[id]/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-body p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "fs-5 text-dark lh-base mb-4",
                            children: event.descricao
                        }, void 0, false, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                            className: "my-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row g-4 text-dark",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "d-grid gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 33
                                                }, void 0),
                                                label: "Data e Hora",
                                                value: `${formattedDate} às ${formattedTime}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this),
                                            event.nome_local_evento && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 61
                                                }, void 0),
                                                label: "Nome do Local",
                                                value: event.nome_local_evento
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 67,
                                                columnNumber: 45
                                            }, this),
                                            event.cep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 47
                                                }, void 0),
                                                label: "CEP",
                                                value: event.cep
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 33
                                                }, void 0),
                                                label: "Endereço",
                                                value: event.local
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 33
                                                }, void 0),
                                                label: "Cidade",
                                                value: event.cidade
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/event/[id]/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "col-md-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "d-grid gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 33
                                                }, void 0),
                                                label: "Preço",
                                                value: `R$ ${event.preco_ingresso.toFixed(2).replace('.', ',')}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoItem, {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 25
                                                }, void 0),
                                                label: "Ingressos Disponíveis",
                                                value: `${event.quantidade_disponivel}`,
                                                badge: isSoldOut ? "Esgotado" : event.quantidade_disponivel < 20 ? "Últimos ingressos" : undefined,
                                                badgeVariant: isSoldOut ? "danger" : event.quantidade_disponivel < 20 ? "warning" : "info"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/event/[id]/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                            className: "my-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        isSoldOut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-4 bg-light rounded border border-danger",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "fs-3 fw-semibold text-danger",
                                    children: "Ingressos Esgotados!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted",
                                    children: "Não há mais ingressos disponíveis para este evento."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/event/[id]/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$purchase$2d$form$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            event: event
                        }, void 0, false, {
                            fileName: "[project]/src/app/event/[id]/page.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/event/[id]/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/event/[id]/page.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/event/[id]/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function InfoItem({ icon, label, value, badge, badgeVariant }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "d-flex align-items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-primary mt-1 me-3 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cloneElement"])(icon, {
                    className: 'h-6 w-6'
                })
            }, void 0, false, {
                fileName: "[project]/src/app/event/[id]/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "fw-semibold text-dark mb-0",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/app/event/[id]/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mb-0",
                        children: [
                            value,
                            badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `badge bg-${badgeVariant || 'secondary'} ms-2`,
                                children: badge
                            }, void 0, false, {
                                fileName: "[project]/src/app/event/[id]/page.tsx",
                                lineNumber: 120,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/event/[id]/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/event/[id]/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/event/[id]/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/event/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/event/[id]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0baafa1c._.js.map