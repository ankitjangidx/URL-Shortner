const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function toBase62(number: number): string {
  if (number === 0) return '0';
  let t = number;
  let result = '';
  while (t > 0) {
    const reminder = t % 62;
    result = BASE62[reminder] + result;
    t = Math.floor(t / 62);
  }
  return result;
}
export function fromBase62(base62: string): number {
  let result = 0;
  for (let i = 0; i < base62.length; i++) {
    const char = base62[i];
    const value = BASE62.indexOf(char);
    result = result * 62 + value;
  }
  return result;
}
    