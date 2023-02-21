import { request } from '@/utils/request/axio-config'

export type TSignIn = {
  username: string
  password: string
  remember: boolean
}

export async function signIn(values: TSignIn): Promise<{ token: string }> {
  const res = await request.post('/signin', {
    data: values,
  })
  return res.data
}
