import { isEmptyObj } from './isEmptyObj'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
class HttpError extends Error {
  url: string
  status: number
  message: string
  constructor(response: Response) {
    super()
    this.name = 'HttpError'
    this.url = response.url
    this.status = response.status
    this.message = response.statusText
  }
}

const fetchApi = async <T>(
  url: string,
  method: Method,
  params?: any,
  headers?: Record<string, string>
) => {
  const requestHeaders = headers || {}

  if (method !== 'GET') {
    requestHeaders['Content-Type'] = 'application/json'
  }

  try {
    const res = await fetch(url, {
      method,
      body: isEmptyObj(params) ? undefined : JSON.stringify(params),
      headers: { ...requestHeaders },
    })

    if (!res.ok) {
      throw new HttpError(res)
    }
    return (await res.json()) as T
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
  }
}

export const getApi = async <T>(url: string, headers?: Record<string, string>) =>
  fetchApi<T>(url, 'GET', headers)

export const postApi = async <T>(url: string, params?: any, headers?: Record<string, string>) =>
  fetchApi<T>(url, 'POST', params, headers)

export const putApi = async <T>(url: string, params?: any, headers?: Record<string, string>) =>
  fetchApi<T>(url, 'PUT', params, headers)

export const deleteApi = async (url: string, params?: any, headers?: Record<string, string>) =>
  fetchApi(url, 'DELETE', params, headers)
