import { useCallback } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
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

export const useGetInfiniteApi = <T>(url: string) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: T[]) => {
      if (previousPageData && !previousPageData.length) {
        return null
      }
      return `${url}/?page=${pageIndex}`
    },
    [url]
  )

  const fetcher = useCallback(async (url: string) => {
    try {
      return await getApi<T[]>(url)
    } catch (error) {
      throw error
    }
  }, [])

  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    // fallbackData,
  })
}
