export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const data = encoder.encode(password);
  const key = await window.crypto.subtle.importKey(
    'raw', data, {name: 'PBKDF2'}, false, ['deriveBits', 'deriveKey']
  );
  const hash = await window.crypto.subtle.deriveKey(
    {name: 'PBKDF2', salt: salt, iterations: 1000, hash: 'SHA-256'},
    key, {name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']
  );
  return {salt, hash};
}