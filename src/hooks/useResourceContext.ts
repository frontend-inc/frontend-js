import React, { useEffect, useContext } from 'react'
import { ResourceContext } from '../context'
import {
  changeDocumentValue,
} from '../helpers'
import { ApiContext } from '../context'
import { useDelayedLoading } from '.'
import { ID, QueryParamsType, UseResourceResponse, SyntheticEventType } from '../types'
import useSWR from 'swr'
import { uniqBy } from 'lodash'

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
    foreignUrl,
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
    
    infiniteLoad,
    setInfiniteLoad,
    findManyCache,
    setFindManyCache,
    findOneCache,
    setFindOneCache,

    selected,
    setSelected,
    selectedIds,
    setSelectedIds,

    openShow,
    setOpenShow,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    openComments,
    setOpenComments,
    openReferences,
    setOpenReferences, 
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

	/* Find One */
  const findOneFetcher = ([url, id]) => api.findOne(id, { url })  
  const { isLoading: findOneIsLoading, 
    data: findOneData, 
    error: findOneError,
    mutate: mutateOne  
  } = useSWR(findOneCache, findOneFetcher)
  
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

  type FindManyOptionsType = {
    loadMore?: boolean
  }

  const findManyFetcher = ([url, query, page]) => api.findMany({ ...query, page }, { url })  
  const { isLoading, data, error, mutate: mutateMany } = useSWR(findManyCache, findManyFetcher, {
    errorRetryCount: 3, 
    errorRetryInterval: 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })
  
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

	const findMany = async (queryParams: QueryParamsType = {}, opts: FindManyOptionsType = {}) => {
		if (url?.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}
    if(opts?.loadMore == true){
      setInfiniteLoad(true)
    }
    if(opts?.loadMore == false){
      setInfiniteLoad(false)
    }
    let searchQuery = { 
      ...query, 
      ...queryParams 
    }
    setQuery(searchQuery)
    setFindManyCache([url, searchQuery, searchQuery?.page])		
	}

  const reloadOne = async () => {		
    return await loadingWrapper(() => 
      api.findOne(resource?.id, { url })
    )
	}

  const reloadMany = async () => {		
    return await loadingWrapper(() => 
      api.findMany(query, { url })
    )
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

	const handleDataChange = (ev: SyntheticEventType) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value    
    setResource(prev => changeDocumentValue(prev, name, value))
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

  useEffect(() => {
		if (selected) {
			setSelectedIds(selected.map((item) => item.id))
		}
	}, [selected])  

  const { loading: delayedLoading } = useDelayedLoading({
    loading
  })

	return {
    url,
    foreignUrl,
    name,    
		loading,
    delayedLoading,
		setLoading,
		loadingWrapper,
		errors,
		setErrors,
    handleChange,
    handleDataChange,
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
		setQuery,
		meta,
		page,
		perPage,
		totalCount,
		numPages,    
		sort,
		paginate,
		loadMore,

    infiniteLoad,
    setInfiniteLoad,
    findManyCache,
    setFindManyCache,
    findOneCache,
    setFindOneCache,

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
    openDelete,
    setOpenDelete,
    openComments,
    setOpenComments,   
    openReferences,
    setOpenReferences,  
	}
}

export default useResourceContext
