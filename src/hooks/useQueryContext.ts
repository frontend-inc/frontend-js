import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext, ResourceContext } from '../context'
import { QueryParamsType } from '../types'

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

  //const cache = (url && defaultQuery) ? [url, defaultQuery] : null
  const fetcher = ([url, defaultQuery]) => api.findMany(defaultQuery, { url })
  
  const { isLoading, data, error, mutate } = useSWR(null, fetcher, {
    revalidateOnFocus: false, // Prevent revalidation on window focus
    revalidateOnReconnect: false, // Prevent revalidation on reconnect
    shouldRetryOnError: false, // Prevent automatic retries on error
  })

  const findMany = async (query: QueryParamsType ) => {
    let resp = await mutate([url, query])
    console.log("Find Many", resp)
    return resp
  }

  useEffect(() => {
    if(data) {      
      setResources(data.data)      
      if (data.meta) {
        setMeta(data.meta)
        setPage(data.meta.page)
        setPerPage(data.meta.per_page)
        setTotalCount(data.meta.total_count)
        setNumPages(data.meta.num_pages)          
      }  
    }
  }, [data])

  const handleError = (errors: any) => {
    console.log('Errors', errors)
  }

  useEffect(() => {    
    setLoading(isLoading)    
  }, [isLoading])

  useEffect(() => {    
    setErrors(error) 
    if(error){
      handleError(error)
    }   
  }, [error])

  return {
    loading,
    errors,
    data,
    findMany,
    resources,
    meta,
    page,
    perPage,
    numPages,
    totalCount,    
  }
}

export default useQueryContext 