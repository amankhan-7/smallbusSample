/**
 * Crypto utilities for encrypting and decrypting URL search parameters
 * Uses Web Crypto API for secure encryption/decryption
 */

// Configuration for encryption
const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12; // 96 bits for GCM

/**
 * Generate or retrieve encryption key from localStorage
 * In production, consider using a more secure key management approach
 */
async function getEncryptionKey() {
  let keyData = localStorage.getItem("url_encryption_key");

  if (!keyData) {
    // Generate new key if none exists
    const key = await crypto.subtle.generateKey(
      {
        name: ALGORITHM,
        length: KEY_LENGTH,
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Export and store the key
    const exported = await crypto.subtle.exportKey("raw", key);
    keyData = Array.from(new Uint8Array(exported))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    localStorage.setItem("url_encryption_key", keyData);
    return key;
  }

  // Import existing key
  const keyBytes = new Uint8Array(
    keyData.match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );
  return await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt a string value
 * @param {string} plaintext - The text to encrypt
 * @returns {Promise<string>} - Base64 encoded encrypted data with IV
 */
export async function encryptParam(plaintext) {
  try {
    if (!plaintext) return "";

    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    // Convert to base64 and make URL-safe
    return btoa(String.fromCharCode.apply(null, combined))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  } catch (error) {
    console.error("Encryption error:", error);
    return plaintext; // Fallback to plaintext if encryption fails
  }
}

/**
 * Decrypt an encrypted string value
 * @param {string} encryptedData - Base64 encoded encrypted data with IV
 * @returns {Promise<string>} - Decrypted plaintext
 */
export async function decryptParam(encryptedData) {
  try {
    if (!encryptedData) return "";
    if (!isLikelyEncrypted(encryptedData)) {
      return encryptedData;
    }

    // Restore base64 padding and convert from URL-safe
    let base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const combined = new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Extract IV and encrypted data
    const iv = combined.slice(0, IV_LENGTH);
    const encrypted = combined.slice(IV_LENGTH);

    const key = await getEncryptionKey();

    const decrypted = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return encryptedData; // Fallback to original data if decryption fails
  }
}

function isLikelyEncrypted(data) {
  const base64UrlPattern = /^[A-Za-z0-9_-]+$/;
  return base64UrlPattern.test(data) && data.length > 20;
}

/**
 * Encrypt all values in a URLSearchParams object
 * @param {URLSearchParams} searchParams - The search parameters to encrypt
 * @returns {Promise<URLSearchParams>} - New URLSearchParams with encrypted values
 */
export async function encryptSearchParams(searchParams) {
  const encrypted = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    const encryptedValue = await encryptParam(value);
    encrypted.set(key, encryptedValue);
  }

  return encrypted;
}

/**
 * Decrypt all values in a URLSearchParams object
 * @param {URLSearchParams} searchParams - The search parameters to decrypt
 * @returns {Promise<URLSearchParams>} - New URLSearchParams with decrypted values
 */
export async function decryptSearchParams(searchParams) {
  const decrypted = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    const decryptedValue = await decryptParam(value);
    decrypted.set(key, decryptedValue);
  }

  return decrypted;
}

/**
 * Create an encrypted URL with search parameters
 * @param {string} baseUrl - The base URL
 * @param {Object} params - Object with key-value pairs to encrypt and add as search params
 * @returns {Promise<string>} - Complete URL with encrypted search parameters
 */
export async function createEncryptedUrl(baseUrl, params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      const encryptedValue = await encryptParam(String(value));
      searchParams.set(key, encryptedValue);
    }
  }

  return `${baseUrl}?${searchParams.toString()}`;
}
