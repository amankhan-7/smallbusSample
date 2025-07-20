/**
 * Test page to verify URL parameter encryption/decryption
 */
"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  useEncryptedSearchParams,
  useDecryptedParam,
} from "@/hooks/useEncryptedSearchParams";
import { encryptParam, decryptParam, createEncryptedUrl } from "@/utils/crypto";

function CryptoTestContent() {
  const router = useRouter();
  const encryptedParams = useEncryptedSearchParams();
  const { value: testParam, isLoading } = useDecryptedParam("test");

  const [inputValue, setInputValue] = useState("");
  const [encryptedValue, setEncryptedValue] = useState("");
  const [decryptedValue, setDecryptedValue] = useState("");

  const handleEncrypt = async () => {
    const encrypted = await encryptParam(inputValue);
    setEncryptedValue(encrypted);
  };

  const handleDecrypt = async () => {
    const decrypted = await decryptParam(encryptedValue);
    setDecryptedValue(decrypted);
  };

  const handleNavigateWithEncryption = async () => {
    const encryptedUrl = await createEncryptedUrl("/crypto-test", {
      test: inputValue,
      timestamp: new Date().toISOString(),
      randomValue: Math.random().toString(36).substring(7),
    });
    router.push(encryptedUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">URL Parameter Encryption Test</h1>

      {/* Current URL Parameters */}
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-4">Current URL Parameters</h2>
        <p>
          <strong>Test Parameter (decrypted):</strong>{" "}
          {isLoading ? "Decrypting..." : testParam || "None"}
        </p>
        <p>
          <strong>Raw URL:</strong>{" "}
          {typeof window !== "undefined" ? window.location.href : "Loading..."}
        </p>
      </div>

      {/* Manual Encryption/Decryption Test */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-4">
          Manual Encryption/Decryption Test
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Input Text:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter text to encrypt"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleEncrypt}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Encrypt
          </button>

          <div>
            <label className="block text-sm font-medium mb-2">
              Encrypted Value:
            </label>
            <textarea
              value={encryptedValue}
              onChange={(e) => setEncryptedValue(e.target.value)}
              placeholder="Encrypted text will appear here"
              className="w-full p-2 border rounded h-24"
            />
          </div>

          <button
            onClick={handleDecrypt}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Decrypt
          </button>

          <div>
            <label className="block text-sm font-medium mb-2">
              Decrypted Value:
            </label>
            <input
              type="text"
              value={decryptedValue}
              readOnly
              placeholder="Decrypted text will appear here"
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Navigation Test */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-4">
          Navigation with Encryption Test
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          This will navigate to the same page but with encrypted URL parameters.
        </p>
        <button
          onClick={handleNavigateWithEncryption}
          disabled={!inputValue}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
        >
          Navigate with Encrypted Parameters
        </button>
      </div>

      {/* Usage Examples */}
      <div className="p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Encrypt a parameter:</strong>{" "}
            <code>await encryptParam("your-value")</code>
          </p>
          <p>
            <strong>Decrypt a parameter:</strong>{" "}
            <code>await decryptParam("encrypted-value")</code>
          </p>
          <p>
            <strong>Use in components:</strong>{" "}
            <code>
              const {`{value, isLoading}`} = useDecryptedParam("paramName")
            </code>
          </p>
          <p>
            <strong>Create encrypted URL:</strong>{" "}
            <code>await createEncryptedUrl("/path", {`{param: "value"}`})</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CryptoTestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <CryptoTestContent />
    </Suspense>
  );
}
