import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext, ResourceContext } from '../context'
import { QueryParamsType } from '../types'

type UseQueryParams = {
  url: string
  query: QueryParamsType
  loadMore?: boolean
}

const useQueryContext = (params: UseQueryParams) => {

  const { url, query, loadMore=false } = params || {}

  const { api } = useContext(ApiContext)

  const {  
    loading, 
    setLoading,
    errors,
    setErrors,
    resources,
    setResources,
    meta,
    page,
    perPage,
    numPages,
    totalCount,
    setNumPages,
    setMeta,
    setPage,
    setPerPage,
    setTotalCount, 
  } = useContext(ResourceContext)

  const cache = (url && query) ? [url, query] : null
  const fetcher = ([url, query]) => api.findMany(query, { url })
  const { isLoading, data, error } = useSWR(cache, fetcher)

  useEffect(() => {
    if(data?.data) {
      if(loadMore) {
        setResources(prev => [...prev, ...data.data])
      }else{
        setResources(data?.data)
      }      
      if (data.meta) {
        setMeta(data.meta)
        setPage(data.meta.page)
        setPerPage(data.meta.per_page)
        setTotalCount(data.meta.total_count)
        setNumPages(data.meta.num_pages)          
      }      
    }
    if(data?.errors) {
      setErrors(data.errors)
      handleError(data.errors)
    }    
  }, [data])

  useEffect(() => {    
    setLoading(isLoading)    
  }, [isLoading])

  useEffect(() => {    
    setErrors(error)    
  }, [error])

  const handleError = (errors: any) => {
    console.log('errors', errors)
  }

  return {
    loading,
    errors,
    data,
    resources,
    meta,
    page,
    perPage,
    numPages,
    totalCount,    
  }
}

export default useQueryContext 