import React, { useState } from 'react'
import QueryContext from './QueryContext'

type QueryProviderProps = {
  url: string 
	children: React.ReactNode
}

const QueryProvider = (props: QueryProviderProps) => {
	const { url, children } = props

	const [loading, setLoading] = useState(false)
  const [delayedLoading, setDelayedLoading] = useState(false)
	const [query, setQuery] = useState({})
  
  const [meta, setMeta] = useState({})
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [numPages, setNumPages] = useState(0)
  const [numResults, setNumResults] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

	const [resources, setResources] = useState()

	const value = {
		loading,
		setLoading,

    delayedLoading,
    setDelayedLoading,

		url,

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
	}

	return (
		<QueryContext.Provider value={value}>
			{children}
		</QueryContext.Provider>
	)
}

export default QueryProvider
