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

  //const cache = (url && defaultQuery) ? [url, defaultQuery] : null
  const fetcher = ([url, defaultQuery]) => api.findMany(defaultQuery, { url })
  
  const { isLoading, data, error, mutate } = useSWR(null, fetcher, {
    revalidateOnFocus: false, // Prevent revalidation on window focus
    revalidateOnReconnect: false, // Prevent revalidation on reconnect
    shouldRetryOnError: false, // Prevent automatic retries on error
  })

  const findMany = async (query: QueryParamsType, opts) => {
    let resp 
    try{
      setLoading(true)
      resp = await mutate([url, query])
      if(resp?.data) {
        if(opts?.loadMore){
          setResources([...resources, ...resp.data])
        }else{
          setResources(resp.data)
        }
        if (data.meta) {
          setMeta(data.meta)
          setPage(data.meta.page)
          setPerPage(data.meta.per_page)
          setTotalCount(data.meta.total_count)
          setNumPages(data.meta.num_pages)          
        }  
      }
      if(resp?.errors) {
        setErrors(resp.errors)
        handleError(resp.errors)
      }
    }catch(err){
      console.log('err', err)
    }finally{
      setLoading(false)
    }
    return resp
  }

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