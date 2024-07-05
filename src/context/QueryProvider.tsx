import React, { useState } from 'react'
import QueryContext from './QueryContext'

type QueryProviderProps = {
	children: React.ReactNode
}

const QueryProvider = (props: QueryProviderProps) => {
	const { children } = props

	const [url, setUrl] = useState('')
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
		setUrl,

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
