import React, { useEffect, useState, useContext } from 'react'
import useSWR from 'swr'
import { ApiContext } from '../context'
import { QueryParamsType } from '../types'

type UseQueryParams = {
  url: string
  query: QueryParamsType  
}

const useQuery = (params: UseQueryParams) => {

  const { url, query } = params || {}

  const { api } = useContext(ApiContext)

  const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resources, setResources] = useState<any[]>([])

	const [meta, setMeta] = useState<any>(null)  
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)  

  const queryCache = (url && query) ? [url, query] : null
  const { 
    data 
  } = useSWR(queryCache, ([url, query]) => api.findMany(query, { url }))

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