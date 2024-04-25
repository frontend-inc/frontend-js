import React, { useContext } from 'react'
import { useState } from 'react'
import { ApiContext } from '../context'
import { useDelayedLoading } from '../hooks'
import { ID, QueryParamsType, ResourceResponse, ResourceType, PageInfoType } from '../types'

type UseResourceParams = {
	url?: string
	name?: string
}

const useResource = (params: UseResourceParams): ResourceResponse => {
	const { url, name = 'resource' } = params || {}

	const { api } = useContext(ApiContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resource, setResource] = useState<ResourceType>({})
	const [resources, setResources] = useState<ResourceType[]>([])

	const [query, setQuery] = useState<QueryParamsType>({})
	const [meta, setMeta] = useState<PageInfoType>(null)
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findOne = async (id: ID) => {
		if (!id) return null
		return await loadingWrapper(() => api.collection(name).url(url).findOne(id))
	}

	const findMany = async (queryParams?: QueryParamsType, loadMore?: boolean) => {
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
			const res = await api.url(url).findMany({
				...query,
				...(queryParams || {}),
			})
			if (res.data) {
				if (loadMore !== true ) {
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
		let loadMoreResults = true
		await findMany({ 
      ...query, 
      page: nextPage 
    }, loadMoreResults)
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

	const save = (data: ResourceType) => {
		if (data?.id) {
			return update(data)
		} else {
			return create(data)
		}
	}

	const create = async (data: ResourceType) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).create(data)
		)
	}

	const update = async (data: ResourceType) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).update(data)
		)
	}

	const destroy = async (id: ID) => {
		return await loadingWrapper(() => 
      api.collection(name).url(url).destroy(id)
    )
	}

	const updateMany = async (ids: ID[], data: ResourceType) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).updateMany(ids, data)
		)
	}

	const deleteMany = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).destroyMany(ids)
		)
	}

	const publish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).publish(ids)
		)
	}

	const unpublish = async (ids: ID[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).unpublish(ids)
		)
	}

	const addLinks = async (
		sourceId: ID,
		targetIds: ID[]
	) => {
		return await loadingWrapper(() =>
			api.collection('links').url(url).addLinks(sourceId, targetIds)
		)
	}

	const removeLinks = async (sourceId: ID, targetIds: ID[]) => {
		return await loadingWrapper(() =>
			api.collection('links').url(url).removeLinks(sourceId, targetIds)
		)
	}

	const addAttachment = async (
		id: ID,
		fieldName: string,
		attachmentId: ID
	) => {
		return await loadingWrapper(() =>
			api
				.collection('attachment')
				.url(url)
				.addAttachment(id, fieldName, attachmentId)
		)
	}

	const removeAttachment = async (id: ID, fieldName: string) => {
		return await loadingWrapper(() =>
			api.collection('attachment').url(url).removeAttachment(id, fieldName)
		)
	}

	const updatePositions = async (sorted: ResourceType[]) => {
		// Intentionally avoid loading for drag-drop UIs
		return await api.collection(name).url(url).updatePositions(sorted)
	}

	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
		setResource({
			...resource,
			[name]: value,
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
