import React, { useEffect, useState } from 'react'
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

  const [resources, setResources] = useState(null)
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [numPages, setNumPages] = useState(0)

  const fetcher = (url, query) => api.findMany(query, { url })
  
  const cacheKey = (url && query) ? [url, query] : null
  const { data, isLoading, error, mutate } = useSWR(cacheKey, fetcher, { 
    revalidateOnFocus: true, 
    revalidateOnReconnect: true 
  })

  useEffect(() => {
    if(Array.isArray(data?.data)){
      setResources(data.data)
    }
    if(data?.meta){
      setMeta(data.meta)
      setPage(data.meta.page)
      setPerPage(data.meta.per_page)
      setTotalCount(data.meta.total_count)
      setNumPages(data.meta.num_pages)
    }
  }, [data])
  
  return { 
    isLoading, 
    data, 
    error,     
    mutate,
    resources,
    meta,
    page,
    perPage,
    totalCount,  
    numPages
  }
}

export default useFindMany