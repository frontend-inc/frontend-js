import React from 'react'
import useResource from './useResource'
import { ResourceResponse } from '../types'

type UseCollectionParams = {
	name?: string
}

const useCollection = (params: UseCollectionParams): ResourceResponse => {

  const { name } = params || {}

  const resp: ResourceResponse = useResource({
    name: 'documents',
    url: `/api/v1/cms/${name}`
  })

  return {
    ...resp
  }

}

export default useCollection