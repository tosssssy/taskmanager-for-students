type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const fetchApi = async <T>(url: string, method: Method, body?: any) => {
  const headers: HeadersInit = {}
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  })

  let result: T
  if (!response.ok) {
    throw new Error(response.status + 'エラー : ' + (await response.json()))
  }

  try {
    result =
      response.status === 204 ? ({} as T) : ((await response.json()) as T)
  } catch (e) {
    throw new Error(e.message)
  }

  return result
}

export const getApi = async <T>(url: string) => fetchApi<T>(url, 'GET')

export const postApi = async (url: string, body?: any) =>
  fetchApi(url, 'POST', body)

export const putApi = async (url: string, body?: any) =>
  fetchApi(url, 'PUT', body)

export const deleteApi = async (url: string, body?: any) =>
  fetchApi(url, 'DELETE', body)
