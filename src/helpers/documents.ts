import {
	REFERENCE_FIELDS,
	SYSTEM_FIELDS,
} from '../constants'
import { get } from 'lodash'

export const flattenDocuments = (resources) => {
  return resources.map((resource) => flattenDocument(resource))
}

export const flattenDocument = (resource) => {
	let { data, ...rest } = resource || {}
	return {		
		...data,
    ...rest,
	}
}

export const getDocumentValue = (document, field) => {
	if (REFERENCE_FIELDS.includes(field?.variant)) {
		let documents = document?.references
			?.filter((d) => d?.target?.content_type === field?.foreign_content_type)
			?.map((d) => d.target)
		return documents
	} else if (SYSTEM_FIELDS.includes(field?.name)) {
		return get(document, field?.name)
	} else {
		return get(document, `data.${field?.name}`)
	}
}

export const changeDocumentValue = (document, fieldName, value) => {
  if(!document || !fieldName) return null;
  let newDocument = { 
    ...document 
  }
  if(SYSTEM_FIELDS.includes(fieldName)) {
    newDocument[fieldName] = value
  }else{
    newDocument = {
      ...newDocument,
      data: {
        ...newDocument.data,
        [fieldName]: value      
      }
    }
  }
  return newDocument
}

export const filterReferences = (document, contentType) => {
  if(!document?.references || document?.references?.length == 0 || !contentType) return null;
	let documents = document
    ?.references
		?.filter((reference) => reference?.target?.content_type == contentType)
		?.map((reference) => reference?.target)
	return documents
}
