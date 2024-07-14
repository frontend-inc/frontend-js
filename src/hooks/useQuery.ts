import React, { useEffect, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext, ResourceContext } from '../context'
import { QueryParamsType } from '../types'

const useQuery = (url: string, query: QueryParamsType) => {

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

  const { data } = useSWR((url && query) ? [url, query] : null, ([url, query]) => api.findMany(query, { url }))

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
    if(!data){
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [data])

  const handleError = (errors: any) => {
    console.log('errors', errors)
  }

  return {
    loading,
    errors,
    resources,
    meta,
    page,
    perPage,
    numPages,
    totalCount,    
  }
}

export default useQuery 