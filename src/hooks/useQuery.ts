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
    meta,
    setMeta,
    page,
    setPage,
    perPage,
    setPerPage,
    numPages,
    setNumPages,
    numResults,
    setNumResults,
    totalCount,
    setTotalCount,
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
    meta: _meta,
		page: _page,
		perPage: _perPage,
		totalCount: _totalCount,
		numPages: _numPages,
    numResults: _numResults,
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

  useEffect(() => {
    setNumResults(_numResults)
  }, [_numResults])

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
