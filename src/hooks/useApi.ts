import React, { useContext } from 'react'
import { ApiContext } from '../context'

const useApi = () => {
	const { api, apiUrl, apiKey } = useContext(ApiContext)
	return {
		api,
    apiUrl, 
    apiKey
	}
}

export default useApi
