// src/components/BootstrapClient.tsx
'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Check if running in a browser environment and if Bootstrap hasn't been initialized yet
    if (typeof window !== 'undefined' && !(window as any).bootstrapInitialized) {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
        .then(() => {
          // Set a flag to indicate Bootstrap JS has been loaded
          (window as any).bootstrapInitialized = true;
          // You could optionally console.log here for debugging, e.g.:
          // console.log("Bootstrap JS initialized successfully.");
        })
        .catch(err => {
          console.error("Failed to load Bootstrap JS bundle:", err);
        });
    }
  }, []);

  return null; // This component doesn't render anything
}
