import getNumberOfPages from '../urlManipulation/getNumberOfPages'
import catchErrorAndGTFO from '../catchErrorAndGTFO'

export default async function getNumberOfPagesCLI(
  url: string,
  debug: boolean = false
): Promise<number> {
  process.stdout.write('  Getting number of pages...')
  const numberOfPages: number = await getNumberOfPages(url, debug).catch(catchErrorAndGTFO)
  process.stdout.write('\r✔ Getting number of pages... Done!\n')
  return numberOfPages
}
