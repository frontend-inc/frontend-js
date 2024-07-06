import React, { useContext, useState } from 'react'
import ResourceContext from './ResourceContext'

type ResourceProviderProps = {
  url: string
  name: string
	children: React.ReactNode
}

const ResourceProvider = (props: ResourceProviderProps) => {
	const { url, name, children } = props
	
	const [loading, setLoading] = useState(false)
  const [delayedLoading, setDelayedLoading] = useState(false)
  const [query, setQuery] = useState({})
	const [errors, setErrors] = useState({})
	const [resource, setResource] = useState()
  const [resources, setResources] = useState([])

	const value = {
		url,
    name,

		loading,
		setLoading,

    delayedLoading,
    setDelayedLoading,

    query,
    setQuery,

		errors,
		setErrors,

		resource,
		setResource,

    resources,
    setResources
	}

	return (
		<ResourceContext.Provider value={value}>
			{children}
		</ResourceContext.Provider>
	)
}

export default ResourceProvider
