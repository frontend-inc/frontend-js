import React, { useEffect, useState, useContext } from 'react'
import { ApiContext } from '../context'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'
import { useDebounce } from 'use-debounce'

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

  const findOne = async (id: ID) => {
		if (!id) return null
    if (url?.includes('undefined')) {
			console.log('Error the url contains undefined', url)
			return
		}  
    let resp = await loadingWrapper(() =>
      api.findOne(id, apiParams)
    )
    if(resp?.data?.id){
      setResource(resp?.data)
    }
    return resp?.data 
	}

	const findMany = async (queryParams: QueryParamsType = {}, opts?: { loadMore?: boolean }) => {
		if (url?.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}    
    let searchQuery = { 
      ...query, 
      ...queryParams 
    }
    setQuery(searchQuery)
    const resp = await loadingWrapper(() =>
      api.findMany(searchQuery, apiParams)
    )    
    if(Array.isArray(resp?.data)){
      if(opts?.loadMore == true){
        setResources(prev => [...prev, ...resp.data])
      }else{
        setResources(resp?.data)
      }    
    }
    if(resp?.meta){
      setMeta(resp.meta)
      setPage(resp.meta.page)
      setPerPage(resp.meta.per_page)
      setTotalCount(resp.meta.total_count)
      setNumPages(resp.meta.num_pages)
    }
    return resp?.data
	}

	const loadMore = async () => {		
    let nextPage = page + 1
    nextPage = nextPage < 2 ? 2 : nextPage
    let searchQuery = {
      ...query,
      page: nextPage
    }
    findMany(searchQuery, { loadMore: true })    
	}

	const paginate = async (page: number) => {
    let searchQuery = {
      ...query,
      page
    }
    findMany(searchQuery, { loadMore: false })    
	}
	
  const reloadOne = async (resourceId: number | string) => {		    
    resourceId = resourceId || resource?.id
    return await loadingWrapper(() => 
      api.findOne(resourceId, { url })
    )
	}

  const reloadMany = async () => {		
    return await loadingWrapper(() => 
      api.findMany(query, { url })
    )
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

  const createMany = async (resources: any[]) => {
    return await loadingWrapper(() =>
      api.createMany(resources, apiParams)
    )
  }

	const updateMany = async (ids: ID[], resource: any) => {
		return await loadingWrapper(() =>
			api.updateMany(ids, resource, apiParams)
		)
	}

  const exportMany = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.exportMany(ids, apiParams)
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

	const addAttachment = async (
		id: ID,
		fieldName: string,
		attachmentId: ID
	) => {
    const options = {
      name: 'attachment',
      url: url 
    }
		return await loadingWrapper(() =>
			api.addAttachment(id, fieldName, attachmentId, options)
		)
	}

	const removeAttachment = async (id: ID, fieldName: string) => {
    const options = {
      name: 'attachment',
      url: url 
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
  
  const handleChange = (ev: SyntheticEventType) => {
    const { name } = ev.target;
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;  
    const updatedResource = { ...resource };
    setNestedValue(updatedResource, name, value);  
    setResource(updatedResource);
  };
  
  const loadingWrapper = async (fn: () => any) => {
		try {
			showLoading()
			setErrors(null)
			const resp = await fn()			
      if (resp?.errors) {
				handleErrors(resp?.errors)
			}
			return resp
		} catch (e) {
      console.log('loadingWrapper error', e)
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

  const [delayedLoading] = useDebounce(loading, 350)

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
    reloadOne,
		reloadMany,
		save,
		update,
		create,
		destroy,
    upload,
    
    createMany,
		updateMany,
		deleteMany,
		exportMany,
    
    publish,
		unpublish,
    
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