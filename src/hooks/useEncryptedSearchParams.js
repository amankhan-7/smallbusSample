import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { decryptParam } from "@/utils/crypto";

export function useEncryptedSearchParams() {
  const searchParams = useSearchParams();
  const [decryptedCache, setDecryptedCache] = useState(new Map());
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    setDecryptedCache(new Map());
  }, [searchParams]);

  const get = async (key) => {
    if (!key) return null;

    const encryptedValue = searchParams.get(key);
    if (!encryptedValue) return null;

    const cacheKey = `${key}:${encryptedValue}`;
    if (decryptedCache.has(cacheKey)) {
      return decryptedCache.get(cacheKey);
    }

    setIsDecrypting(true);
    try {
      const decryptedValue = await decryptParam(encryptedValue);

      setDecryptedCache((prev) => new Map(prev).set(cacheKey, decryptedValue));

      return decryptedValue;
    } catch (error) {
      console.error(`Failed to decrypt parameter '${key}':`, error);
      return encryptedValue; 
    } finally {
      setIsDecrypting(false);
    }
  };

  const getSync = (key) => {
    if (!key) return null;

    const encryptedValue = searchParams.get(key);
    if (!encryptedValue) return null;

    const cacheKey = `${key}:${encryptedValue}`;
    if (decryptedCache.has(cacheKey)) {
      return decryptedCache.get(cacheKey);
    }

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
  const [isLoading, setIsLoading] = useState(true);

  const encryptedValue = searchParams.get(key);

  useEffect(() => {
    const decryptValue = async () => {

      if (!encryptedValue) {
        setValue(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const decryptedValue = await decryptParam(encryptedValue);
        setValue(decryptedValue);
      } catch (error) {
        console.error(`Failed to decrypt parameter '${key}':`, error);
        setValue(encryptedValue); 
      } finally {
        setIsLoading(false);
      }
    };

    decryptValue();
  }, [key, encryptedValue]);

  return { value, isLoading };
}
