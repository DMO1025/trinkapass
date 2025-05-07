/**
 * Represents a QR Code.
 */
export interface QRCode {
  /**
   * The data URL representing the QR code image.
   */
  dataUrl: string;
}

/**
 * Asynchronously generates a QR code from the given PIX code.
 * For this version, it returns a placeholder image URL.
 *
 * @param pixCode The PIX code to encode in the QR code.
 * @returns A promise that resolves to a QRCode object containing the data URL of the QR code image.
 */
export async function generateQrCode(pixCode: string): Promise<QRCode> {
  // Using a placeholder image service as actual QR code generation can be complex
  // and might require browser-specific APIs (like canvas) or heavy server-side libraries.
  // This keeps the service simple and focused on the data structure.
  // The seed ensures a somewhat unique image for different pixCodes for visual distinction if needed.
  const seed = pixCode.substring(0, 10).replace(/[^a-zA-Z0-9]/g, ''); // Simple seed from PIX code
  return {
    dataUrl: `https://picsum.photos/seed/qr${seed}/200/200`,
  };
}
