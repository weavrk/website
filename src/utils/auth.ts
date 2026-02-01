// Pre-computed SHA1 hash of 'sudo' in htpasswd format
const SUDO_PASSWORD_HASH = '{SHA}g2xibVLz+y6lQ62J70SOlpFhtb4=';

// Function to hash password using SHA1 (browser-compatible)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));
  return '{SHA}' + hashBase64;
};

// Function to validate password against htpasswd format
export const validatePassword = async (password: string): Promise<boolean> => {
  try {
    const hashedPassword = await hashPassword(password);
    return hashedPassword === SUDO_PASSWORD_HASH;
  } catch (error) {
    console.error('Password validation error:', error);
    return false;
  }
};

// Global authentication - persists until user clears cache
export const setGlobalAuthenticated = () => {
  localStorage.setItem('weavrk_authenticated', 'true');
};

export const isGlobalAuthenticated = (): boolean => {
  return localStorage.getItem('weavrk_authenticated') === 'true';
};

export const clearGlobalAuthentication = () => {
  localStorage.removeItem('weavrk_authenticated');
};

// Legacy functions for backward compatibility
export const setAuthenticated = (projectId: string) => {
  setGlobalAuthenticated();
};

export const isAuthenticated = (projectId: string): boolean => {
  return isGlobalAuthenticated();
};

export const clearAuthentication = (projectId: string) => {
  clearGlobalAuthentication();
};

// Clear all authentication on logout
export const clearAllAuthentication = () => {
  clearGlobalAuthentication();
}; 