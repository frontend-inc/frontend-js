import React from 'react'
import useResourceContext from './useResourceContext'
import { ResourceResponse } from '../types'
import {
  changeDocumentValue,
  filterDocumentLinks,
  getDocumentValue,
  flattenDocument, 
  flattenDocuments 
} from '../helpers'


type DocumentResponse = ResourceResponse & {
  handleDataChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  filterDocumentLinks: (document: any, contentType: string) => any
  getDocumentValue: (document: any, field: any) => any
  flattenDocument: (resource: any) => any
  flattenDocuments: (resources: any) => any
}

const useDocuments = (): DocumentResponse => {
  
  const {
    setResource,
    ...rest 
  }: ResourceResponse = useResourceContext()

	const handleDataChange = (ev) => {
		const { name } = ev.target
		const value = ev.target.type === 'checkbox' ? 
      ev.target.checked : 
      ev.target.value    
    setResource(prev => 
      changeDocumentValue(prev, name, value)
    )		
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