import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext, ResourceContext } from '../context'


const useQueryContext = () => {

  const { api } = useContext(ApiContext)

  const { 
    url, 
    loading, 
    setLoading,
    errors,
    setErrors,
    resources,
    setResources,
    query,
    setQuery,
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