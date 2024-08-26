import React, { useEffect, useState, useContext } from 'react'
import { ApiContext } from '../context'
import { useDelayedLoading } from '../hooks'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'
import useSWR from 'swr'
import { uniqBy } from 'lodash'

type UseResourceParams = {
	url: string
	name?: string  
}

const useResource = (params: UseResourceParams): UseResourceResponse => {
	const { url, name } = params || {}
  const apiParams = { url, name }

	const { api } = useContext(ApiContext)

	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resource, setResource] = useState<any>({})
	const [resources, setResources] = useState<any[]>([])
  
  const [infiniteLoad, setInfiniteLoad] = useState<boolean>(false)
  const [findManyCache, setFindManyCache] = useState<[url: string, query: QueryParamsType]>(null)
  const [findOneCache, setFindOneCache] = useState<[url: string, id: ID]>(null)

	const [query, setQuery] = useState<QueryParamsType>({})
	const [meta, setMeta] = useState<any>(null)  
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)  
  const [selected, setSelected] = useState<any[]>([])
	const [selectedIds, setSelectedIds] = useState<number[]>([])

	const handleSelect = (item) => {
		if (selectedIds.find((id) => id === item.id)) {
			setSelected(selected.filter((i) => i.id != item.id))
		} else {
			setSelected(selected.concat(item))
		}
	}

	const handleClear = () => {
		setSelected([])
	}

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

  /* Find One */
  const findOneFetcher = ([url, id]) => api.findOne(id, { url })  
  const { isLoading: findOneIsLoading, 
    data: findOneData, 
    error: findOneError 
  } = useSWR(findOneCache, findOneFetcher, {
    revalidateOnFocus: true, // Prevent revalidation on window focus
    revalidateOnReconnect: true, // Prevent revalidation on reconnect
    errorRetryCount: 3, // Prevent retries on error
    errorRetryInterval: 1000, // Retry every 1 second
    shouldRetryOnError: true, // Prevent automatic retries on error
  })
  
  useEffect(() => {
    if(findOneData?.data?.id) {               
      setResource(findOneData.data)      
    }
  }, [findOneData?.data])

  useEffect(() => {
    if(findOneError){
      handleErrors(findOneError)
    }
  }, [findOneError])

  useEffect(() => {
    setLoading(findOneIsLoading)
  }, [findOneIsLoading])

  const findOne = async (id: ID) => {
		if (!id) return null
    setFindOneCache([url, id])
	}

  /* Find Many */
  const findManyFetcher = ([url, query]) => api.findMany(query, { url })  
  const { isLoading, data, error } = useSWR(findManyCache, findManyFetcher)
  
  useEffect(() => {
    if(data?.data) {   
      if(infiniteLoad){
        setResources(uniqBy([...resources, ...data.data], 'id'))
      }else{
        setResources(uniqBy(data.data, 'id'))
      }           
      if (data?.meta) {
        setMeta(data.meta  )
        setPage(data.meta.page)
        setPerPage(data.meta.per_page)
        setTotalCount(data.meta.total_count)
        setNumPages(data.meta.num_pages)          
      }  
    }
  }, [data])

  useEffect(() => {
    if(error){
      handleErrors(error)
    }
  }, [error])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  type FindManyOptionsType = {
    loadMore?: boolean
  }

	const findMany = async (queryParams: QueryParamsType = {}, opts: FindManyOptionsType = {}) => {
		if (url?.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}
    if(opts?.loadMore){
      setInfiniteLoad(true)
    }else{
      setInfiniteLoad(false)
    }
    let searchQuery = { 
      ...query, 
      ...queryParams 
    }
    setQuery(searchQuery)
    setFindManyCache([url, searchQuery])		
	}
  
	const loadMore = async () => {
		let nextPage = page + 1
		await findMany({ 
      ...query, 
      page: nextPage 
    }, {
      loadMore: true 
    })
	}

	const reloadMany = async () => {
		return await findMany(query)
	}

	const paginate = async (page: number) => {
		return await findMany({
			...query,
			page: page,
		})
	}

	const sort = async (sortBy: string, sortDirection: 'asc' | 'desc') => {
		return await findMany({
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

  const upload = async (resource: any) => {
		return await loadingWrapper(() =>
			api.upload(resource, apiParams)
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

	const addReferences = async (
		sourceId: ID,
		targetIds: ID[]
	) => {
    const options = { url }
		return await loadingWrapper(() =>
			api.addReferences(sourceId, targetIds, options)
		)
	}

	const removeReferences = async (sourceId: ID, targetIds: ID[]) => {
    const options = { url }
		return await loadingWrapper(() =>
			api.removeReferences(sourceId, targetIds, options)
		)
	}

  const updateReferencePositions = async (id: number, sorted) => {
    return await api.updateReferencePositions(id, sorted, apiParams)
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

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    })
  }
  
  const handleChange = (ev) => {
    const { name } = ev.target;
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;  
    const updatedResource = { ...resource };
    setNestedValue(updatedResource, name, value);  
    setResource(updatedResource);
  };
  
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

	useEffect(() => {
		if (selected) {
			setSelectedIds(selected.map((item) => item.id))
		}
	}, [selected])

  const { loading: delayedLoading } = useDelayedLoading({
    loading
  })

	return {
		loading,
    delayedLoading,
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
    
    selected,
    selectedIds,
    setSelected,
    setSelectedIds,
    handleSelect,
    handleClear,

		findOne,
		setQuery,
		reloadMany,
		save,
		update,
		create,
		destroy,
    upload,
		updateMany,
		deleteMany,
		publish,
		unpublish,
		addReferences,
		removeReferences,
    updateReferencePositions,
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
