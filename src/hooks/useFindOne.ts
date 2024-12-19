import React from 'react'
import useSWR from 'swr'
import useApi from './useApi'
import { QueryParamsType } from '../types'

type UseFindOneParams = {
  id: number | string 
  url: string 
}

const useFindOne = (params: UseFindOneParams) => {

  const { api } = useApi()

  const { 
    id,
    url,
  } = params || {}

  const fetcher = (id, url) => api.findOne(id, { url })
  
  const cacheKey = (url && id) ? [url, id] : null
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

export default useFindOne