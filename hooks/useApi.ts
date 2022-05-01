import { useCallback } from 'react'
import useSWR from 'swr'
import { getApi } from '../utils/api'

export const useGetApi = <T>(url?: string, fallbackData?: T) => {
  const fetcher = useCallback(async (url: string) => {
    try {
      return await getApi<T>(url)
    } catch (error) {
      throw error
    }
  }, [])

  return useSWR(url ?? null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData,
  })
}
