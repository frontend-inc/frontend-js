import React, { useContext } from 'react'
import { ApiContext } from '../context'

const useApi = () => {
	const { api, url, apiKey } = useContext(ApiContext)
	return {
		api,
    url, 
    apiKey
	}
}

export default useApi
