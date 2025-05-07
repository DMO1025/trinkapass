// src/lib/data-service.server.ts
// This file should contain server-side specific data access logic if needed,
// or it can re-export functions from data-service.ts if they are safe for server-only use.
// For now, it seems most data logic is in data-service.ts and designed to be server-side already.

export * from './data-service'; // Re-exporting all from data-service

// If there were specific server-only functions, they would be defined here.
// For example, functions that use server-only libraries or environment variables
// that should not be exposed to the client.

// Example of a server-only function (if needed):
// export async function getSensitiveData(): Promise<string> {
//   // Access server-only resources
//   return "sensitive server data";
// }
