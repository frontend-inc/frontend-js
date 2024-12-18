import React, { useState } from 'react'
import { LoadingWrapperResponseType } from '../types'
import { useDebounce } from 'use-debounce'

const useLoadingWrapper = (): LoadingWrapperResponseType => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	const loadingWrapper = async (fn) => {
		try {
			setLoading(true)
			setErrors(null)
			setData(null)
			const resp = await fn()
			if (resp?.errors) {
				setErrors(resp?.errors)
			} else {
				setData(resp?.data)
			}
			return resp
		} catch (e) {
			setErrors(e)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

  const [delayedLoading]= useDebounce(loading, 350)  

	return {
		data,
		loading,
    delayedLoading,
		errors,
		loadingWrapper,
	}
}

export default useLoadingWrapper
