import React, { useContext, useEffect } from 'react'
import { ApiContext, AuthContext } from '../context'
import useResource from './useResource'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { UserType } from '../types'
import useSWR from 'swr'

const useAuth = () => {
	let { api, authCookie } = useContext(ApiContext)
	const { serverPath: url } = useContext(AuthContext)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const {
		authenticated,
		setAuthenticated,
		currentUser,
		setCurrentUser,
    token,
		setToken,
	} = useContext(AuthContext)

	const {
		errors,
		setErrors,
		loading,
    delayedLoading,
		setLoading,
		resource: user,
		setResource: setUser,
		handleChange,
		handleErrors,
	} = useResource({
		url,
		name: 'user',
	})

  const apiParams = {
    url,
    name: 'user'
  }

  const cacheKey = token ? true : false 
  const fetcher = () => loadingWrapper(() => api.fetchMe(apiParams))
  useSWR([cacheKey], fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true    
  })

  const fetchMe = async () => {
		//return await loadingWrapper(() => api.fetchMe(apiParams))
	}

  const reloadMe = async () => {
		return await loadingWrapper(() => api.fetchMe(apiParams))
	}

	const updateMe = async (user: UserType) => {
		return await loadingWrapper(() => api.updateMe(user, apiParams))
	}

	const login = async (user: UserType) => {
		return await loadingWrapper(() => api.login(user, apiParams))
	}

	const signup = async (user: UserType) => {
		return await loadingWrapper(() => api.signup(user, apiParams))
	}

	const sendPin = async (user: UserType) => {
		return await loadingWrapper(() => api.sendPin(user, apiParams))
	}

	const verifyPin = async (email: string, pin: string) => {
		return await loadingWrapper(() => api.verifyPin(email, pin, apiParams))
	}

	const changePassword = async (
		currentPassword: string,
		password: string,
		passwordConfirmation: string
	) => {
		return await loadingWrapper(() =>
			api.changePassword(currentPassword, password, passwordConfirmation, apiParams)
		)
	}

	const sendOneTimePassword = async (user: UserType) => {
		return await loadingWrapper(() =>
			api.sendOneTimePassword(user, apiParams)
		)
	}

	const verifyOneTimePassword = async (otp: string) => {
		return await loadingWrapper(() =>
			api.verifyOneTimePassword(otp, apiParams)
		)
	}

	const forgotPassword = async (user: UserType) => {
		return await loadingWrapper(() => api.forgotPassword(user, apiParams))
	}

	const resetPassword = async (
		email: string,
		password: string,
		passwordConfirmation: string,
		changePasswordToken: string
	) => {
		return await loadingWrapper(() =>
			api
				.resetPassword(
					email,
					password,
					passwordConfirmation,
					changePasswordToken,
          apiParams
				)
		)
	}

	const logout = async () => {
		await deleteCookie(authCookie)
		setCurrentUser(null)
		setAuthenticated(false)
	}

	const googleLogin = async (accessToken: string) => {		
		return await loadingWrapper(() => api.googleLogin(accessToken, apiParams))
	}

	const deleteAvatar = async () => {
		let deleteAvatarUrl = url + '/delete_avatar'
		return await loadingWrapper(() => api.post(deleteAvatarUrl))
	}

	const authenticateFromToken = async (token: string) => {
		setToken(token)
		setAuthenticated(true)
	}

	const loadingWrapper = async (apiMethod: () => any) => {
		try {
			showLoading()
			setErrors(null)
			const resp = await apiMethod()
			if (resp?.data?.id) {
				setUser(resp.data)
				setCurrentUser(resp.data)
				setAuthenticated(true)
				setToken(resp.data.jwt_token)
				setCookie(authCookie, resp.data.jwt_token)
			} else if (resp?.errors) {
				handleErrors(resp?.errors)
			}
			return resp?.data
		} catch (e) {
			handleErrors(e)
		} finally {
			hideLoading()
		}
	}

	useEffect(() => {
    if (!currentUser?.id) {
			let jwtToken = getCookie(authCookie)
			if (jwtToken) {
				authenticateFromToken(String(jwtToken))
			}
		}else if(currentUser?.id && !authenticated) {
			setToken(currentUser?.token)
			setAuthenticated(true)
		}		
	}, [currentUser?.id])

	return {
		loading,
    delayedLoading,
		errors,

		user,
		setUser,
		currentUser,
		setCurrentUser,
		fetchMe,
		updateMe,
		forgotPassword,
		handleChange,
		authenticateFromToken,

    reloadMe,
    
		login,
		logout,
		signup,

		changePassword,
		resetPassword,

		sendPin,
		verifyPin,

		sendOneTimePassword,
		verifyOneTimePassword,

		googleLogin,

		deleteAvatar,
		loadingWrapper,

    authenticated,
    token,
    setToken,
		authCookie,
	}
}

export default useAuth
