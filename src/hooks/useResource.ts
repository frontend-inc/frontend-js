import React, { useState, useContext, useEffect } from 'react'
import { ApiContext } from '../context'
import { useDelayedLoading } from '../hooks'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'
import useSWR from 'swr'

type UseResourceParams = {
	url: string
	name?: string  
  query?: QueryParamsType
}

const useResource = (params: UseResourceParams): UseResourceResponse => {
	const { url, name, query: defaultQuery = {} } = params || {}
  const apiParams = { url, name }

	const { api } = useContext(ApiContext)

	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resource, setResource] = useState<any>({})
	const [resources, setResources] = useState<any[]>([])
  
	const [query, setQuery] = useState<QueryParamsType>(defaultQuery)
	const [meta, setMeta] = useState<any>(null)  
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)  

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findOne = async (id: ID) => {
		if (!id) return null
		return await loadingWrapper(() => api.findOne(id, apiParams))
	}

  const findMany = (query: QueryParamsType) => {
    setQuery(query)
  }

	const loadMore = async () => {
		try {
			setLoading(true)   
			const res = await api.findMany({
				...query,
				page: page + 1
			}, apiParams)
			if (res.data) {				
				setResources([...resources, ...res.data])				
				if (res.meta) {
					setMeta(res.meta)					
				}
				return res.data
			}
		} catch (e) {
			handleErrors(e)
		} finally {
			setLoading(false)
		}
	}

  useEffect(() => {
    if(meta){
      setPage(meta.page)
      setPerPage(meta.per_page)
      setTotalCount(meta.total_count)
      setNumPages(meta.num_pages)          
    }
  }, [meta])


	const reloadMany = async () => {
		setQuery(query)
	}

	const paginate = async (page: number) => {
		setQuery({
			...query,
			page: page,
		})
	}

	const sort = async (sortBy: string, sortDirection: 'asc' | 'desc') => {
		setQuery({
			...query,
			sort_by: sortBy,
			sort_direction: sortDirection,
		})
	}

	const save = (resource: any) => {
		if (resource?.id) {
			return update(resource)
		} else {
			return create(resource)
		}
	}

	const create = async (resource: any) => {
		return await loadingWrapper(() =>
			api.create(resource, apiParams)
		)
	}

	const update = async (resource: any) => {
		return await loadingWrapper(() =>
			api.update(resource, apiParams)
		)
	}

	const destroy = async (id: ID) => {
		return await loadingWrapper(() => 
      api.destroy(id, apiParams)
    )
	}

	const updateMany = async (ids: ID[], resource: any) => {
		return await loadingWrapper(() =>
			api.updateMany(ids, resource, apiParams)
		)
	}

	const deleteMany = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.destroyMany(ids, apiParams)
		)
	}

	const publish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.publish(ids, apiParams)
		)
	}

	const unpublish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.unpublish(ids, apiParams)
		)
	}

	const addLinks = async (
		sourceId: ID,
		targetIds: ID[]
	) => {
    const options = { 
      url, 
      name: 'links' 
    }
		return await loadingWrapper(() =>
			api.addLinks(sourceId, targetIds, options)
		)
	}

	const removeLinks = async (sourceId: ID, targetIds: ID[]) => {
    const options = { 
      url, 
      name: 'links' 
    }
		return await loadingWrapper(() =>
			api.removeLinks(sourceId, targetIds, options)
		)
	}

  const updateLinkPositions = async (id: number, sorted) => {
    return await api.updateLinkPositions(id, sorted, apiParams)
	}

	const addAttachment = async (
		id: ID,
		fieldName: string,
		attachmentId: ID
	) => {
    const options = {
      name: 'attachment',
      url
    }
		return await loadingWrapper(() =>
			api.addAttachment(id, fieldName, attachmentId, options)
		)
	}

	const removeAttachment = async (id: ID, fieldName: string) => {
    const options = {
      name: 'attachment',
      url
    }
		return await loadingWrapper(() =>
			api.removeAttachment(id, fieldName, options)
		)
	}

	const updatePositions = async (sorted: any[]) => {
		// Intentionally avoid loading for drag-drop UIs
		return await api.updatePositions(sorted, apiParams)
	}

	const handleChange = (ev: SyntheticEventType) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value    
    setResource({
      ...resource,
      [name]: value    
    })
	}

	const loadingWrapper = async (apiMethod: () => any) => {
		try {
			showLoading()
			setErrors(null)
			const res = await apiMethod()
			if (res?.data?.id) {
				setResource(res.data)
			} else if (res?.errors) {
				handleErrors(res?.errors)
			}
			return res?.data
		} catch (e) {
		} finally {
			hideLoading()
		}
	}

	const handleErrors = (e: any) => {    
		if(e?.status === 401) {      
      setErrors([{ code: 401, message: 'Unauthorized' }])
    }else if(e){
      setErrors(e)
    }
		console.log('handleErrors', e)
	}

  const findManyCache = (url && query) ? [url, query] : null
  const findManyFetcher = ([url, query]) => api.findMany(query, { url })
  const { isLoading, data } = useSWR(findManyCache, findManyFetcher)

  useEffect(() => {
    if(data?.data){
      setResources(data?.data)
    }
    if(data?.meta){
      setMeta(data.meta)
    }
    if(data?.error){      
      handleErrors(data.error)
    }
  }, [data])

  const { loading: delayLoading } = useDelayedLoading({
    loading: loading || isLoading 
  })

	return {
		loading: loading || isLoading,
    delayLoading,
		setLoading,
		loadingWrapper,
		errors,
		setErrors,
		handleChange,
		handleErrors,
		resource,
		resources,
		setResource,
		setResources,
		findOne,
		setQuery,
		reloadMany,
		save,
		update,
		create,
		destroy,
		updateMany,
		deleteMany,
		publish,
		unpublish,
		addLinks,
		removeLinks,
    updateLinkPositions,
		addAttachment,
		removeAttachment,
		updatePositions,
		query,
		findMany,
		meta,
		page,
		perPage,
		totalCount,
		numPages,    
		sort,
		paginate,
		loadMore,
	}
}

export default useResource
