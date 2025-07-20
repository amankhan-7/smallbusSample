import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptParam } from "@/utils/crypto";

export function useEncryptedSearchParams() {
  const searchParams = useSearchParams();
  const [decryptedCache, setDecryptedCache] = useState(new Map());
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Clear cache when search params change
  useEffect(() => {
    setDecryptedCache(new Map());
  }, [searchParams]);

  const get = async (key) => {
    if (!key) return null;

    const encryptedValue = searchParams.get(key);
    if (!encryptedValue) return null;

    // Check cache first
    const cacheKey = `${key}:${encryptedValue}`;
    if (decryptedCache.has(cacheKey)) {
      return decryptedCache.get(cacheKey);
    }

    // Decrypt the value
    setIsDecrypting(true);
    try {
      const decryptedValue = await decryptParam(encryptedValue);

      // Update cache
      setDecryptedCache((prev) => new Map(prev).set(cacheKey, decryptedValue));

      return decryptedValue;
    } catch (error) {
      console.error(`Failed to decrypt parameter '${key}':`, error);
      return encryptedValue; // Fallback to encrypted value
    } finally {
      setIsDecrypting(false);
    }
  };

  const getSync = (key) => {
    if (!key) return null;

    const encryptedValue = searchParams.get(key);
    if (!encryptedValue) return null;

    // Check cache first
    const cacheKey = `${key}:${encryptedValue}`;
    if (decryptedCache.has(cacheKey)) {
      return decryptedCache.get(cacheKey);
    }

    // Return encrypted value if not in cache (will be decrypted asynchronously)
    return encryptedValue;
  };

  const has = (key) => {
    return searchParams.has(key);
  };

  const keys = () => {
    return searchParams.keys();
  };

  const values = () => {
    return searchParams.values();
  };

  const entries = () => {
    return searchParams.entries();
  };

  return {
    get,
    getSync,
    has,
    keys,
    values,
    entries,
    isDecrypting,
    toString: () => searchParams.toString(),
  };
}

/**
 * Simpler hook for common use case - getting a single decrypted parameter
 * @param {string} key - The parameter key to decrypt
 * @returns {Object} - { value, isLoading }
 */
export function useDecryptedParam(key) {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const decryptValue = async () => {
      const encryptedValue = searchParams.get(key);
      if (!encryptedValue) {
        setValue(null);
        return;
      }

      setIsLoading(true);
      try {
        const decryptedValue = await decryptParam(encryptedValue);
        setValue(decryptedValue);
      } catch (error) {
        console.error(`Failed to decrypt parameter '${key}':`, error);
        setValue(encryptedValue); // Fallback to encrypted value
      } finally {
        setIsLoading(false);
      }
    };

    decryptValue();
  }, [key, searchParams]);

  return { value, isLoading };
}
