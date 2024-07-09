import React, { useEffect, useContext } from 'react'
import { ResourceContext } from '../context'
import useResource from './useResource'


const useResourceContext = () => {
	
	const {
    url,
    name,
		loading,
		setLoading,
    delayedLoading,
    setDelayedLoading,
		errors,
		setErrors,
		query,
		setQuery,
    meta,
    setMeta,
    page,
    setPage,
    perPage,
    setPerPage,
    numPages,
    setNumPages,    
    totalCount,
    setTotalCount,
		resource,
		resources,
		setResource,
		setResources,

    openShowModal,
    setOpenShowModal,
    openFormModal,
    setOpenFormModal,
    openDeleteModal,
    setOpenDeleteModal,
	} = useContext(ResourceContext)

	const {
		loading: _loading,
    delayedLoading: _delayedLoading,		
		loadingWrapper,
		errors: _errors,
		handleChange,
		handleErrors,
		resource: _resource,
		resources: _resources,
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
    findLinks,
		addLinks,
		removeLinks,
		addAttachment,
		removeAttachment,
		updatePositions,
		query: _query,
		setQuery: _setQuery,
		meta: _meta,
		page: _page,
		perPage: _perPage,
		totalCount: _totalCount,
		numPages: _numPages,    
		sort,
		paginate,
		loadMore,
	} = useResource({
		name,
		url
	})

	useEffect(() => {
		setLoading(_loading)
	}, [_loading])

  useEffect(() => {
		setDelayedLoading(_delayedLoading)
	}, [_delayedLoading])

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
    setMeta(_meta)
  }, [_meta])

  useEffect(() => {
    setPage(_page)
  }, [_page])

  useEffect(() => {
    setPerPage(_perPage)
  }, [_perPage])

  useEffect(() => {
    setTotalCount(_totalCount)
  }, [_totalCount])

  useEffect(() => {
    setNumPages(_numPages)
  }, [_numPages])
  
	return {
    url,
    name,
		loading,
		setLoading,
    delayedLoading,
    setDelayedLoading,
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
    findLinks,
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

    openShowModal,
    setOpenShowModal,
    openFormModal,
    setOpenFormModal,
    openDeleteModal,
    setOpenDeleteModal,
	}
}

export default useResourceContext
