import React, { useState } from 'react'

const useLoadingWrapper = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState(null)

	const loadingWrapper = async (fn) => {
		try {
			setLoading(true)
			setErrors(null)
			setData(null)
			const resp = await fn()
			if (resp?.error) {
				setErrors(resp?.error)
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

	return {
		data,
		loading,
		errors,
		loadingWrapper,
	}
}

export default useLoadingWrapper
