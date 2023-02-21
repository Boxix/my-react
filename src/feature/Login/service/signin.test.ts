import axios from 'axios'
import { Mock } from 'vitest'
import { signIn } from './signin'

vi.mock('axios')

describe('request for sigin', () => {
  beforeEach(() => {
    (axios.post as Mock).mockReset()
  })

  test('/signin request', async () => {
    // (axios.create as Mock).mockResolvedValueOnce(axios)
    (axios.post as Mock).mockResolvedValueOnce({ data: 'hello' })

    const params = {
      username: '123',
      password: '123123',
      remember: false,
    }

    await signIn(params)
    expect(axios.post).toHaveBeenCalledWith('/signin', { data: params })
  })
})
