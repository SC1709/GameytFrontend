// encryptUtils.js
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Enhanced encrypt function with error handling and type checking
export const encrypt = (data) => {
  try {
    // Handle null/undefined cases
    if (data === null || data === undefined) {
      return JSON.stringify(null);
    }

    // Special handling for empty objects
    if (typeof data === "object" && Object.keys(data).length === 0) {
      return JSON.stringify(data);
    }

    const stringData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data");
  }
};

// Enhanced decrypt function with better error handling
export const decrypt = (ciphertext) => {
  try {
    // Handle null/undefined/empty cases
    if (!ciphertext || ciphertext === "null" || ciphertext === "{}") {
      return JSON.parse(ciphertext || "null");
    }

    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      throw new Error("Decryption resulted in empty string");
    }

    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Decryption failed:", error);
    // Instead of returning null, we throw to trigger storage fallback
    throw new Error("Failed to decrypt data");
  }
};

// Create a secure storage middleware for Zustand
export const createSecureStorage = () => {
  const secureStorage = {
    getItem: (key) => {
      try {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return null;
        return decrypt(encryptedData);
      } catch (error) {
        // Log error and remove corrupted data
        console.error(`Storage error for key ${key}:`, error);
        localStorage.removeItem(key);
        return null;
      }
    },

    setItem: (key, value) => {
      try {
        const encryptedData = encrypt(value);
        localStorage.setItem(key, encryptedData);
      } catch (error) {
        console.error(`Failed to save data for key ${key}:`, error);
        // Optionally clear the storage on encryption failure
        localStorage.removeItem(key);
        throw error;
      }
    },

    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to remove item with key ${key}:`, error);
      }
    },
  };

  return secureStorage;
};
