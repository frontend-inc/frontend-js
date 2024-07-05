import React, { useState } from 'react'
import ResourceContext from './ResourceContext'

type ResourceProviderProps = {
	children: React.ReactNode
}

const ResourceProvider = (props: ResourceProviderProps) => {
	const { children } = props

	const [url, setUrl] = useState('')
	const [loading, setLoading] = useState(false)
  const [delayedLoading, setDelayedLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [resource, setResource] = useState()

	const value = {
		loading,
		setLoading,

    delayedLoading,
    setDelayedLoading,

		errors,
		setErrors,

		url,
		setUrl,

		resource,
		setResource,
	}

	return (
		<ResourceContext.Provider value={value}>
			{children}
		</ResourceContext.Provider>
	)
}

export default ResourceProvider
