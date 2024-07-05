import React from 'react'
import useResourceContext from './useResourceContext'
import { SYSTEM_FIELDS } from '../constants'
import { ResourceResponse } from '../types'
import {
  filterDocumentLinks,
  getDocumentValue,
  flattenDocument, 
  flattenDocuments 
} from '../helpers'

type UseDocumentsParams = {	
  url?: string
}

type DocumentResponse = ResourceResponse & {
  handleDataChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  filterDocumentLinks: (document: any, contentType: string) => any
  getDocumentValue: (document: any, field: any) => any
  flattenDocument: (resource: any) => any
  flattenDocuments: (resources: any) => any
}

const useDocuments = (params: UseDocumentsParams): DocumentResponse => {

  const { url } = params || {}

  const {
    setResource,
    ...rest 
  }: ResourceResponse = useResourceContext({
    name: 'document',
    url
  })

	const handleDataChange = (ev) => {
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

  return {
    handleDataChange,
    filterDocumentLinks,
    getDocumentValue,
    flattenDocument,
    flattenDocuments,
    setResource,
    ...rest
  }
}

export default useDocuments