import getPhoto from './getPhoto'

beforeEach(() => jest.setTimeout(600000))

it('gets the png/jpg url and date right', async () => {
  const mockData: mockDataScheme[] = [
    {
      input: 'https://www.flickr.com/photos/megane_wakui/44607625822/',
      output: ['https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg', '2018-07-18.jpg'],
    }, // TODO: MORE TESTS WITH MOCK DATA
    {
      input: 'https://flickr.com/photos/megane_wakui/44607625822/',
      output: ['https://c2.staticflickr.com/2/1873/44607625822_03cacf8532_k.jpg', '2018-07-18.jpg'],
    },
  ]

  for (const { input, output } of mockData) {
    expect(await getPhoto(input)).toEqual(output)
    expect(getPhoto(input)).resolves.toEqual(output)
  }
})

it("knows when people are flippin' dumb", async () => {
  const mockData = ['aerrngaejrngowenjhnbdzfkndfvjknkgo', 'http://dnfkndf.com/qweqwe/1231232/']

  mockData.forEach(input => expect(getPhoto(input)).rejects.toBeInstanceOf(Error))
})

it('knows when people try to fuck with it', async () => {
  const mockData = [
    'https://flickr.com/naiuwbenfuyaiwehbfakuwhekjfansjdbf/927394257934759203495709283745/',
  ]

  mockData.forEach(input => expect(getPhoto(input)).rejects.toBeInstanceOf(Error))
})

interface mockDataScheme {
  input: string
  output: [string, string]
}
