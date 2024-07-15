import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { ApiContext } from '../context'
import { useDelayedLoading } from '../hooks'
import useSWR from 'swr'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'


type UseResourceParams = {
  id?: ID
	url: string
	name: string,
  query?: QueryParamsType
  options?: {
    infiniteLoad?: boolean
  }
}

const useResource = (params: UseResourceParams): UseResourceResponse => {
	const { url, name, id: _id, query: _query, options } = params || {}
  const apiOptions = { url, name }

	const { api } = useContext(ApiContext)

	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resource, setResource] = useState<any>({})
	const [resources, setResources] = useState<any[]>([])

  const [id, setId] = useState<ID>(_id)
	const [query, setQuery] = useState<QueryParamsType>({})
	const [meta, setMeta] = useState<any>(null)  
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)  

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findOne = async (id: ID) => {
		setId(id)
	}

	const findMany = async (queryParams: QueryParamsType = {}) => {
		if (url?.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}	
    setQuery({
      ...query,
      ...queryParams,
    })			
	}

	const loadMore = async () => {
    setQuery({
      ...query,
      page: page + 1
    })		
	}

	const reloadMany = async () => {
		setQuery({ 
      ...query 
    })
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
			api.create(resource, apiOptions)
		)
	}

	const update = async (resource: any) => {
		return await loadingWrapper(() =>
			api.update(resource, apiOptions)
		)
	}

	const destroy = async (id: ID) => {
		return await loadingWrapper(() => 
      api.destroy(id, apiOptions)
    )
	}

	const updateMany = async (ids: ID[], resource: any) => {
		return await loadingWrapper(() =>
			api.updateMany(ids, resource, apiOptions)
		)
	}

	const deleteMany = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.destroyMany(ids, apiOptions)
		)
	}

	const publish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.publish(ids, apiOptions)
		)
	}

	const unpublish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.unpublish(ids, apiOptions)
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
    return await api.updateLinkPositions(id, sorted, apiOptions)
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
		return await api.updatePositions(sorted, apiOptions)
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

  const swrResourcesCache = (url && query) ? [url, query] : null
  const swrResourcesFetcher = ([url, query]) => api.findMany(query, { url })
  const { 
    data: _resources, 
    isLoading: _isLoading      
  } = useSWR(swrResourcesCache, swrResourcesFetcher)

  const swrResourceCache = (id && url) ? [id, url] : null
  const swrResourceFetcher = ([id, url]) => api.findOne(id, { url })
  const { 
    data: _resource, 
    isLoading: __isLoading 
  } = useSWR(swrResourceCache, swrResourceFetcher)

  const isLoading = loading || _isLoading || __isLoading
  const { loading: delayLoading } = useDelayedLoading({
    loading: isLoading
  })

  useEffect(() => {
    if(_resources?.data) {
      if(options?.infiniteLoad){
        setResources(prev => [...prev, ..._resources?.data])
      }else{
        setResources(_resources?.data)
      }      
      if (_resources.meta) {
        setMeta(_resources.meta)
        setPage(_resources.meta.page)
        setPerPage(_resources.meta.per_page)
        setTotalCount(_resources.meta.total_count)
        setNumPages(_resources.meta.num_pages)          
      }      
    }
    if(_resources?.errors) {
      setErrors(_resources.errors)
      handleErrors(_resources.errors)
    }    
  }, [_resources])

  useEffect(() => {
    if(_resource?.data) {
      setResource(_resource?.data)      
    }    
  }, [_resource])

  useEffect(() => {
    if(_query){
      setQuery(_query)
    }
  }, [_query])

  useEffect(() => {
    if(_id){
      setId(_id)
    }
  }, [_id])  

	return {
		loading: isLoading,
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
		findMany,
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
		setQuery,
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
