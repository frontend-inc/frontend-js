import React, { useEffect, useContext } from 'react'
import { ResourceContext } from '../context'
import { ApiContext } from '../context'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'
import { useDebounce } from 'use-debounce'

type UseResourceContextResponse = UseResourceResponse & {
  openShow: boolean
  setOpenShow: (value: boolean) => void
  openEdit: boolean
  setOpenEdit: (value: boolean) => void
  openDelete: boolean
  setOpenDelete: (value: boolean) => void
}

const useResourceContext = (): UseResourceContextResponse => {

	const { api } = useContext(ApiContext)

  const {
    url,
    name='document',
    loading,
    setLoading,        
    errors,
    setErrors,
    resource,
    setResource,
    resources,
    setResources,
    query,
    setQuery,
    meta,
    setMeta,
    page,
    setPage,
    perPage,
    setPerPage,
    totalCount,
    setTotalCount,
    numPages,
    setNumPages,

    selected,
    setSelected,
    selectedIds,
    setSelectedIds,

    openShow,
    setOpenShow,
    openEdit,
    setOpenEdit,
    openCreate,
    setOpenCreate,

    openDelete,
    setOpenDelete,    
  } = useContext(ResourceContext)

  const apiParams = { 
    name,
    url
  }

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)
	
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

	const findMany = async (queryParams: QueryParamsType = {}, opts?: { loadMore: boolean }) => {
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

  const reloadOne = async (resourceId?: number | string) => {		    
    resourceId = resourceId || resource?.id
    return await findOne(resourceId)
	}

  const reloadMany = async () => {		
    return await findMany(query)
	}
  
	const loadMore = async () => {		
    let nextPage = page + 1
    nextPage = nextPage < 2 ? 2 : nextPage
    let searchQuery = {
      ...query,
      page: nextPage
    }
    return await findMany(searchQuery, { loadMore: true })    
	}

	const paginate = async (page: number) => {
    let searchQuery = {
      ...query,
      page
    }
    return await findMany(searchQuery, { loadMore: false })    
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
		const resp = await loadingWrapper(() =>
			api.create(resource, apiParams)
		)
    return resp?.data
	}

	const update = async (resource: any) => {
		const resp = await loadingWrapper(() =>
			api.update(resource, apiParams)
		)
    return resp?.data
	}

	const destroy = async (id: ID) => {
		return await loadingWrapper(() => 
      api.destroy(id, apiParams)
    )
	}

  const createMany = async (resources: any[]) => {
    const resp = await loadingWrapper(() =>
      api.createMany(resources, apiParams)
    )
    return resp?.data
  }

	const updateMany = async (ids: ID[], resource: any) => {
		const resp = await loadingWrapper(() =>
			api.updateMany(ids, resource, apiParams)
		)
    return resp?.data
	}

	const deleteMany = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.destroyMany(ids, apiParams)
		)
	}

	const publish = async (ids: ID[]) => {
		const resp = await loadingWrapper(() =>
			api.publish(ids, apiParams)
		)
    return resp?.data
	}

	const unpublish = async (ids: ID[]) => {
		const resp = await loadingWrapper(() =>
			api.unpublish(ids, apiParams)
		)
    return resp?.data
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

  // Intentionally avoid loading wrapper for this method
	const updatePositions = async (sorted: any[]) => {
		const resp = await api.updatePositions(sorted, apiParams)
    return resp?.data
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
      if(resp?.data?.id){
        setResource(resp?.data)
      }
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
    url,    
    name,    
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
		findOne,
		findMany,
    reloadOne,
		reloadMany,
		save,
		update,
		create,
		destroy,
    createMany,
		updateMany,
		deleteMany,
		publish,
		unpublish,
		
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

    selected,
    selectedIds,
    setSelected,
    setSelectedIds,
    handleSelect,
    handleClear,

    openShow,
    setOpenShow,
    openEdit,
    setOpenEdit,
    openCreate,
    setOpenCreate,    
    openDelete,
    setOpenDelete,   
	}
}

export default useResourceContext