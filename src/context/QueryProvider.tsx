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
	const [resources, setResources] = useState()

	const value = {
		loading,
		setLoading,

    delayedLoading,
    setDelayedLoading,

		url,

		query,
		setQuery,

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
