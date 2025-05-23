
// src/lib/firebase.ts
// This file is no longer needed if fully migrating to MongoDB.
// You can delete it or keep it if you plan to use other Firebase services (e.g., Auth, Storage)
// but not Firestore for the database.

// For now, I will leave it empty to signify its deprecation for Firestore use.
// If you use Firebase Auth or other services, you'd keep the relevant initialization.

// import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
// import { getFirestore, type Firestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// let app: FirebaseApp;
// let db: Firestore;

// if (typeof window !== 'undefined' && getApps().length === 0) {
//   app = initializeApp(firebaseConfig);
//   db = getFirestore(app);
// } else if (typeof window !== 'undefined') {
//   app = getApps()[0];
//   db = getFirestore(app);
// }

// export { db, app }; // app and db might be undefined on the server if not handled carefully

// It's better to initialize Firebase on the server-side separately if needed,
// or use a pattern that ensures initialization before use.

// Since we are moving to MongoDB for the database,
// the Firestore specific 'db' export is no longer relevant for data-service.
// If Firebase Auth is still in use, 'app' might be.

export {}; // Placeholder to make it a module
