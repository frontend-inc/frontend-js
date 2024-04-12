import { useState, useEffect, useRef } from 'react'

interface UseDelayedLoadingProps {
	loading: boolean
	delay?: number
	callback?: () => void
}

function useDelayedLoading({
	loading,
	delay = 500,
	callback,
}: UseDelayedLoadingProps): Record<any, boolean> {
	const [isLoading, setIsLoading] = useState<boolean>(loading)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (loading) {
			setIsLoading(true)
			if (timerRef.current) clearTimeout(timerRef.current)
		} else {
			timerRef.current = setTimeout(() => {
				setIsLoading(false)
				if (callback) callback()
			}, delay)
		}

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [loading, delay, callback])

	return {
		loading: isLoading,
	}
}

export default useDelayedLoading
