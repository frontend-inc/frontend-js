import React, { useEffect, useContext } from 'react'
import { ResourceContext } from '../context'
import useResource from './useResource'

type UseResourceContextParams = {
	name?: string
	url?: string
}

const useResourceContext = (params?: UseResourceContextParams) => {
	const { name, url: _url } = params || {}

	const {
		loading,
		setLoading,
		errors,
		setErrors,
		url,
		setUrl,
		query,
		setQuery,
		resource,
		resources,
		setResource,
		setResources,
		showModal,
		setShowModal,
	} = useContext(ResourceContext)

	const {
		loading: _loading,
		loadingWrapper,
		errors: _errors,
		handleChange,
		handleErrors,
		resource: _resource,
		resources: _resources,
		findOne,
		findMany,
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
		query: _query,
		meta,
		page,
		perPage,
		totalCount,
		numPages,
		sort,
		paginate,
		loadMore,
	} = useResource({
		name,
		url: url || _url,
	})

	useEffect(() => {
		setLoading(_loading)
	}, [_loading])

	useEffect(() => {
		setErrors(_errors)
	}, [_errors])

	useEffect(() => {
		setQuery(_query)
	}, [_query])

	useEffect(() => {
		setResource(_resource)
	}, [_resource])

	useEffect(() => {
		setResources(_resources)
	}, [_resources])

	useEffect(() => {
		if (_url) {
			setUrl(_url)
		}
	}, [_url])

	return {
		loading,
		loadingWrapper,
		errors,
		setErrors,
		handleChange,
		handleErrors,
		resource,
		setResource,
		resources,
		setResources,
		findOne,
		findMany,
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
		showModal,
		setShowModal,
	}
}

export default useResourceContext
