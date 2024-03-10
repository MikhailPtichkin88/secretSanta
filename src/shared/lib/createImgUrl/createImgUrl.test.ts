import {
  createUserAvatarUrl,
  createSessionImgUrl,
  createCardImgUrl,
} from './createImgUrl'

const mockAPI = 'https://example.com/api'

describe('URL Generation Functions', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('createUserAvatarUrl generates correct URL', () => {
    const avatarUrl = 'userAvatar.jpg'

    const result = createUserAvatarUrl(avatarUrl)
    const result_2 = createUserAvatarUrl(avatarUrl)

    expect(result).toMatch(`${mockAPI}/uploads/avatars/${avatarUrl}`)
    expect(result).not.toEqual(result_2)
  })

  test('createSessionImgUrl generates correct URL', () => {
    const sessionImg = 'sessionImage.jpg'

    const result = createSessionImgUrl(sessionImg)
    const result_2 = createSessionImgUrl(sessionImg)

    expect(result).toMatch(`${mockAPI}/uploads/sessions/${sessionImg}`)
    expect(result).not.toEqual(result_2)
  })

  test('createCardImgUrl generates correct URL', () => {
    const sessionId = 'session123'
    const cardImg = 'cardImage.jpg'

    const result = createCardImgUrl(sessionId, cardImg)
    const result_2 = createCardImgUrl(sessionId, cardImg)

    expect(result).toMatch(`${mockAPI}/uploads/cards/${sessionId}/${cardImg}`)
    expect(result).not.toEqual(result_2)
  })
})
