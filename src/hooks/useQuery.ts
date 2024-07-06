import React, { useEffect, useContext } from 'react'
import { QueryContext } from '../context'
import useResource from './useResource'


const useQuery = () => {	

	const {
    url,
		loading,
		setLoading,
    delayedLoading,
    setDelayedLoading,
		query,
		setQuery,
		resources,
		setResources,
	} = useContext(QueryContext)

	const {
		loading: _loading,
    delayedLoading: _delayedLoading,		
		loadingWrapper,
		resources: _resources,
		findMany,
		reloadMany,
		updateMany,
		deleteMany,
    findLinks,
		updatePositions,
		query: _query,
		setQuery: _setQuery,
		meta,
		page,
		perPage,
		totalCount,
		numPages,
    numResults,
		sort,
		paginate,
		loadMore,
	} = useResource({
		name: 'document',
		url,
	})

	useEffect(() => {
		setLoading(_loading)
	}, [_loading])

  useEffect(() => {
		setDelayedLoading(_delayedLoading)
	}, [_delayedLoading])

	useEffect(() => {
		setQuery(_query)
	}, [_query])

	useEffect(() => {
		setResources(_resources)
	}, [_resources])

	return {
    url,
		loading,
		setLoading,
    delayedLoading,
    setDelayedLoading,
		loadingWrapper,
		resources,
		setResources,
		findMany,
		reloadMany,
		updateMany,
		deleteMany,
    findLinks,
		updatePositions,
		query,
		setQuery,
		meta,
		page,
		perPage,
		totalCount,
		numPages,
    numResults,
		sort,
		paginate,
		loadMore
	}
}

export default useQuery
