import React, { useEffect, useState } from 'react'
import useResource from './useResource'
import { ResourceResponse } from '../types'
import { SYSTEM_FIELDS } from '../constants'
import {
  flattenDocument, 
  flattenDocuments 
} from '../helpers'

type UseDocumentsParams = {	
  collection?: string
}

const useDocuments = (params: UseDocumentsParams): ResourceResponse => {

  const [_resource, _setResource] = useState({})
  const [_resources, _setResources] = useState([])

  const { 
    collection, 
   } = params || {}

  const { 
    resource,
    resources,
    setResource,
    handleChange,
    ...rest  
  }: ResourceResponse = useResource({
    name: 'documents',
    url: `/api/v1/cms/${collection}`,
  })

	const _handleChange = (ev) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
		if (SYSTEM_FIELDS.includes(name)) {
			setResource((prev) => ({
				...prev,
				[name]: value,
			}))
		} else {
			setResource((prev) => ({
				...prev,
				data: {
					...prev.data,
					[name]: value,
				},
			}))
		}
	}

  useEffect(() => {
    _setResource(flattenDocument(resource))
  }, [resource])

  useEffect(() => {
    _setResources(flattenDocuments(resources))
  }, [resources])

  return {
    setResource,    
    resource,
    resources,
    handleChange,
    _handleChange,
    _resource,
    _resources,    
    ...rest
  }
}

export default useDocuments