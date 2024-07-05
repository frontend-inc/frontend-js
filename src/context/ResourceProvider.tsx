import React, { useState } from 'react'
import ResourceContext from './ResourceContext'

type ResourceProviderProps = {
	children: React.ReactNode
}

const ResourceProvider = (props: ResourceProviderProps) => {
	const { children } = props

	const [url, setUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [query, setQuery] = useState({})
	const [errors, setErrors] = useState({})
	const [resource, setResource] = useState()
	const [resources, setResources] = useState()

	const value = {
		loading,
		setLoading,

		errors,
		setErrors,

		url,
		setUrl,

		query,
		setQuery,

		resource,
		setResource,

		resources,
		setResources,

	}

	return (
		<ResourceContext.Provider value={value}>
			{children}
		</ResourceContext.Provider>
	)
}

export default ResourceProvider
