import download from './download'
import * as fs from 'mz/fs'
import * as path from 'path'
import * as crypto from 'crypto'

const randomName = () => crypto.createHmac('sha256', new Date().toISOString()).digest('hex')

describe('`download` function', async () => {
  it('downloads without making directory', async () => {
    const name = randomName() + '.jpg'
    await download('https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg', name, '')
    expect(fs.existsSync(name)).toBe(true)
    await fs.unlink(path.join(name))
  })

  // @TODO finish this test
  // it('downloads to directory', async () => {
  //   const tempDir =
  //     '__temp__' +
  //     Math.random()
  //       .toString()
  //       .slice(2)
  //   const name = randomName() + '.jpg'
  //   console.log(console.log(path.join(tempDir, name)))
  //   await download(
  //     'https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg',
  //     name,
  //     tempDir
  //   ).catch(console.error)
  //   expect(await fs.exists(path.join(name))).toBe(true)
  //   await fs.unlink(path.join(tempDir, name))
  // })
})
