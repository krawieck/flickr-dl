export function pad(str: string | number, num: number = 2): string {
  let out = String(str)
  while (out.length < num) {
    out = `0${out}`
  }
  return out
}
