import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext, ResourceContext } from '../context'
import { QueryParamsType } from '../types'

type QueryParams = {
  query: QueryParamsType
}

const useQueryContext = (params: QueryParams ) => {

  const { query: defaultQuery } = params || {}

  const { api } = useContext(ApiContext)

  const { 
    url, 
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

  const cache = (url && defaultQuery) ? [url, defaultQuery] : null
  const fetcher = ([url, defaultQuery]) => api.findMany(defaultQuery, { url })
  
  const { isLoading, data, error } = useSWR(cache, fetcher)

  useEffect(() => {
    if(data?.data) {
      setResources(data?.data)
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

  const handleError = (errors: any) => {
    console.log('errors', errors)
  }

  useEffect(() => {    
    setLoading(isLoading)    
  }, [isLoading])

  useEffect(() => {    
    setErrors(error)    
  }, [error])

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