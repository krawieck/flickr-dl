export default function catchErrorAndGTFO(...e: any): never {
  console.error('\n', ...e)
  return process.exit()
}
