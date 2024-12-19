import React from 'react'
import useSWR from 'swr'
import useApi from './useApi'
import { QueryParamsType } from '../types'

type UseFindManyParams = {
  url: string;
  query: QueryParamsType
}

const useFindMany = (params: UseFindManyParams) => {

  const { api } = useApi()

  const { 
    url,
    query 
  } = params || {}

  const fetcher = (url, query) => api.findMany(query, { url })
  
  const cacheKey = (url && query) ? [url, query] : null
  const { data, isLoading, error, mutate } = useSWR(cacheKey, fetcher, { 
    revalidateOnFocus: true, 
    revalidateOnReconnect: true 
  })

  return { 
    isLoading, 
    data, 
    error,     
    mutate 
  }
}

export default useFindMany