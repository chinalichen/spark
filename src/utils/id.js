const ALPHA_NUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ID_LENGTH = 20;

export function generateID() {
  const random = Math.random;
  const chars = ALPHA_NUMERIC_CHARS;
  const length = ID_LENGTH;
  const ids = [];
  for (let i = 0; i < length; i++) {
    ids.push(chars.charAt(Math.floor(random() * chars.length)));
  }
  return ids.join("")
}
