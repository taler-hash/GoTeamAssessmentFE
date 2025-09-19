import { useCookie, useRuntimeConfig } from '#app'
import type { Meta } from '~/models/Meta'

export const useApiRequest = async ({
  endpoint,
  method,
  body
}: {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}): Promise<{ data: any, meta: Meta }>   => {
  const config = useRuntimeConfig()

  const baseUrl = config.public.base_api_url.replace(/\/$/, '')
  const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`

  const tokenCookie = useCookie('sanctum.token.cookie')
  const xsrfCookie = useCookie('XSRF-TOKEN')

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (tokenCookie.value) {
    headers['Authorization'] = `Bearer ${tokenCookie.value}`
  }

  if (xsrfCookie.value) {
    headers['X-XSRF-TOKEN'] = xsrfCookie.value
  }

  const res = await $fetch(url, {
    method,
    credentials: 'include',
    headers,
    ...(method === 'GET'
      ? { query: body }
      : { body })
  })

  return res as { data: any, meta: Meta }
}
