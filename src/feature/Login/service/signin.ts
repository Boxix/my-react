import request from '@/utils/request'

export async function signIn(values: Record<string, unknown>): Promise<{ token: string }> {
  const res = await request('/signin', {
    data: values,
    method: 'post',
  })
  return res.data
}
