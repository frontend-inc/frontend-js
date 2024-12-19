import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import useApi from './useApi'

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

  const [resource, setResource] = useState(null)

  const fetcher = (id, url) => api.findOne(id, { url })
  
  const cacheKey = (url && id) ? [url, id] : null
  const { data, isLoading, error, mutate } = useSWR(cacheKey, fetcher, { 
    revalidateOnFocus: true, 
    revalidateOnReconnect: true 
  })

  useEffect(() => {
    if(data?.data?.id){
      setResource(data?.data)
    }
  }, [data])

  return { 
    isLoading, 
    data, 
    error, 
    resource,    
    mutate 
  }
}

export default useFindOne