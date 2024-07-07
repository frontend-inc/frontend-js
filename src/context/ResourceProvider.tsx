import React, { useEffect, useState } from 'react'
import ResourceContext from './ResourceContext'

type ResourceProviderProps = {
  url: string
  name: string
  resource?: any
	children: React.ReactNode
}

const ResourceProvider = (props: ResourceProviderProps) => {
	const { url, name, children, resource: _resource } = props
	
	const [loading, setLoading] = useState(false)
  const [delayedLoading, setDelayedLoading] = useState(false)
  const [query, setQuery] = useState({})
	const [errors, setErrors] = useState({})
	const [resource, setResource] = useState()
  const [resources, setResources] = useState([])

  const [openShowModal, setOpenShowModal] = useState(false) 
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openFormModal, setOpenFormModal] = useState(false)

  useEffect(() => {
    if(_resource){
      setResource(_resource)
    }
  }, [_resource])

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
    setResources,
    
    openShowModal,
    setOpenShowModal,

    openFormModal,
    setOpenFormModal,

    openDeleteModal,
    setOpenDeleteModal
	}

	return (
		<ResourceContext.Provider value={value}>
			{children}
		</ResourceContext.Provider>
	)
}

export default ResourceProvider
