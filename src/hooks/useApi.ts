import React, { useContext } from 'react'
import { ApiContext } from '../context'

const useApi = () => {
	const { api } = useContext(ApiContext)
	return {
		api,
	}
}

export default useApi
