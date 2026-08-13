// Deterministic hashing so the generated dataset is identical across process
// restarts (candidates should see the same movies every time they run this).
export function fnv1a(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export function hash(i: number, salt: string): number {
  return fnv1a(`${salt}:${i}`)
}

export function pick<T>(arr: readonly T[], i: number, salt: string): T {
  return arr[hash(i, salt) % arr.length]
}
