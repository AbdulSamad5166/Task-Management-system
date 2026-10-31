/** Generates UUID identifiers on localhost, HTTPS, and local-network HTTP. */
export function generateId(prefix: string = 'id'): string {
  if (typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  // getRandomValues remains available on HTTP origins where randomUUID is absent.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  return `${prefix}_${uuid}`;
}
