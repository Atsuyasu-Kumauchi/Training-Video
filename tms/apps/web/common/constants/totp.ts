/**
 * TOTP (Time-based One-Time Password) Configuration Constants
 */

// TOTP QR Code cooldown period in hours (default: 24 hours)
export const TOTP_QR_COOLDOWN_HOURS = 24;

// LocalStorage key for storing the last time TOTP QR was displayed
export const TOTP_QR_LAST_DISPLAYED_KEY = 'totp_qr_last_displayed';

/**
 * Check if TOTP QR can be displayed (24 hours have passed since last display)
 * @returns true if QR can be displayed, false otherwise
 */
export function canDisplayTotpQr(): boolean {
    if (typeof window === 'undefined') return false;
    
    const lastDisplayed = localStorage.getItem(TOTP_QR_LAST_DISPLAYED_KEY);
    
    // If never displayed before, allow display
    if (!lastDisplayed) return true;
    
    const lastDisplayedTime = parseInt(lastDisplayed, 10);
    const now = Date.now();
    const cooldownMs = TOTP_QR_COOLDOWN_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
    
    // Check if 24 hours have passed
    return (now - lastDisplayedTime) >= cooldownMs;
}

/**
 * Store the current timestamp when TOTP QR is displayed
 */
export function markTotpQrDisplayed(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOTP_QR_LAST_DISPLAYED_KEY, Date.now().toString());
}
