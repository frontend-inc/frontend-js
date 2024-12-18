'use client';

import React, { useEffect, useState } from 'react'
import ResourceContext from './ResourceContext'
import { QueryParamsType } from '../types'

type ResourceProviderProps = {
  url?: string
  name?: string 
  resource?: any
	children: React.ReactNode
}

const ResourceProvider = (props: ResourceProviderProps) => {
	const { url, name, children, resource: _resource } = props
	
	const [loading, setLoading] = useState(false)
  const [delayedLoading, setDelayedLoading] = useState(false)
  const [query, setQuery] = useState({})  

  const [meta, setMeta] = useState({})
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [numPages, setNumPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const [errors, setErrors] = useState({})
	const [resource, setResource] = useState(_resource)
  const [resources, setResources] = useState([])
  const [selected, setSelected] = useState([])
  const [selectedIds, setSelectedIds] = useState([])

  const [openShow, setOpenShow] = useState(false) 
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    if(_resource) setResource(_resource)
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

    selected,
    setSelected,
    selectedIds,
    setSelectedIds,
    
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
    
    openShow,
    setOpenShow,

    openEdit,
    setOpenEdit,

    openCreate,
    setOpenCreate,

    openDelete,
    setOpenDelete,
	}

	return (
		<ResourceContext.Provider value={value}>
			{children}
		</ResourceContext.Provider>
	)
}

export default ResourceProvider
