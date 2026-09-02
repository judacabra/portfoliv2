import CryptoJS from "crypto-js";

async function generateAESKey(password: string): Promise<CryptoKey> {
  if (!window.crypto?.subtle) {
    throw new Error("Web Crypto API no disponible");
  }

  const passwordBuffer = new TextEncoder().encode(password);

  const hashedPassword = await window.crypto.subtle.digest(
    "SHA-256",
    passwordBuffer
  );

  return window.crypto.subtle.importKey(
    "raw",
    hashedPassword,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

async function decryptWithWebCrypto(
  encryptedData: ArrayBuffer,
  password: string
): Promise<ArrayBuffer> {
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);

  const key = await generateAESKey(password);

  return window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    data
  );
}

function decryptWithCryptoJS(
  encryptedData: ArrayBuffer,
  password: string
): ArrayBuffer {
  const bytes = new Uint8Array(encryptedData);

  const iv = CryptoJS.lib.WordArray.create(
    bytes.slice(0, 16) as any
  );

  const encryptedBytes = bytes.slice(16);

  const encryptedWordArray = CryptoJS.lib.WordArray.create(
    encryptedBytes as any
  );

  const passwordHash = CryptoJS.SHA256(password);

  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: encryptedWordArray,
    } as any,
    passwordHash,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const words = decrypted.words;
  const sigBytes = decrypted.sigBytes;

  const result = new Uint8Array(sigBytes);

  for (let i = 0; i < sigBytes; i++) {
    result[i] =
      (words[Math.floor(i / 4)] >> (24 - (i % 4) * 8)) & 0xff;
  }

  return result.buffer;
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `No se pudo descargar ${url}: ${response.status}`
    );
  }

  const encryptedData = await response.arrayBuffer();

  if (encryptedData.byteLength < 17) {
    throw new Error("Archivo encriptado inválido");
  }

  if (window.crypto?.subtle) {
    return decryptWithWebCrypto(
      encryptedData,
      password
    );
  }

  return decryptWithCryptoJS(
    encryptedData,
    password
  );
};
