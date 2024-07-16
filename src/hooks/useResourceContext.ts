import React, { useContext } from 'react'
import { ResourceContext } from '../context'
import {
  changeDocumentValue,
} from '../helpers'
import { ApiContext } from '../context'
import { useDelayedLoading } from '.'
import { ID, QueryParamsType, UseResourceResponse, FindManyOptionType, SyntheticEventType } from '../types'

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
    
    openShow,
    setOpenShow,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete 
  } = useContext(ResourceContext)

  const apiParams = { 
    name,
    url
  }

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)
	
	const findOne = async (id: ID) => {
		if (!id) return null
		return await loadingWrapper(() => api.findOne(id, apiParams))
	}

	const findMany = async (queryParams: QueryParamsType = {}, opts: FindManyOptionType = {}) => {
		if (url?.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}
		try {
			setLoading(true)
			if (queryParams) {
				setQuery({
					...query,
					...queryParams,
				})
			}      
			const res = await api.findMany({
				...query,
				...queryParams,
			}, apiParams)
			if (res.data) {
				if (opts?.loadMore !== true ) {
					setResources(res.data)
				} else {
					setResources([...resources, ...res.data])
				}
				if (res.meta) {
					setMeta(res.meta)
					setPage(res.meta.page)
					setPerPage(res.meta.per_page)
					setTotalCount(res.meta.total_count)
					setNumPages(res.meta.num_pages)          
				}
				return res.data
			}
		} catch (e) {
			handleErrors(e)
		} finally {
			setLoading(false)
		}
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
    let name = 'references'
    const options = { url, name }
		return await loadingWrapper(() =>
			api.addReferences(sourceId, targetIds, options)
		)
	}

	const removeReferences = async (sourceId: ID, targetIds: ID[]) => {
    let name = 'references'
    const options = { url, name }
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

	const handleChange = (ev: SyntheticEventType) => {
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

  const { loading: delayLoading } = useDelayedLoading({
    loading
  })

	return {
    url,
    name,
    
		loading,
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

    openShow,
    setOpenShow,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete 
	}
}

export default useResourceContext
