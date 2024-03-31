import React, { useContext, useEffect } from 'react'
import { ApiContext, AuthContext } from '../context'
import useResource from './useResource'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { UserType } from '../types'

const useAuth = () => {
	const { api, authCookie } = useContext(ApiContext)
	const { serverPath } = useContext(AuthContext)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const {
		authenticated,
		setAuthenticated,
		currentUser,
		setCurrentUser,
		setToken,
	} = useContext(AuthContext)

	const {
		errors,
		setErrors,
		loading,
		setLoading,
		resource: user,
		setResource: setUser,
		handleChange,
		handleErrors,
	} = useResource({
		url: serverPath,
		name: 'user',
	})

	const updateMe = async (user: UserType) => {
		return await loadingWrapper(() => api.url(serverPath).updateMe(user))
	}

	const fetchMe = async () => {
		return await loadingWrapper(() => api.url(serverPath).fetchMe())
	}

	const login = async (user: UserType) => {
		return await loadingWrapper(() => api.url(serverPath).login(user))
	}

	const signup = async (user: UserType) => {
		return await loadingWrapper(() => api.url(serverPath).signup(user))
	}

	const sendPin = async (user: UserType) => {
		return await loadingWrapper(() => api.url(serverPath).sendPin(user))
	}

	const verifyPin = async (email: string, pin: string) => {
		return await loadingWrapper(() => api.url(serverPath).verifyPin(email, pin))
	}

	const changePassword = async (
		currentPassword: string,
		password: string,
		passwordConfirmation: string
	) => {
		return await loadingWrapper(() =>
			api
				.url(serverPath)
				.changePassword(currentPassword, password, passwordConfirmation)
		)
	}

	const sendOneTimePassword = async (user: UserType) => {
		return await loadingWrapper(() =>
			api.url(serverPath).sendOneTimePassword(user)
		)
	}

	const verifyOneTimePassword = async (otp: string) => {
		return await loadingWrapper(() =>
			api.url(serverPath).verifyOneTimePassword(otp)
		)
	}

	const forgotPassword = async (user: UserType) => {
		return await loadingWrapper(() => api.url(serverPath).forgotPassword(user))
	}

	const resetPassword = async (
		email: string,
		password: string,
		passwordConfirmation: string,
		changePasswordToken: string
	) => {
		return await loadingWrapper(() =>
			api
				.url(serverPath)
				.resetPassword(
					email,
					password,
					passwordConfirmation,
					changePasswordToken
				)
		)
	}

	const logout = async () => {
		deleteCookie(authCookie)
		setCurrentUser({})
		setAuthenticated(false)
	}

	const googleLogin = async (accessToken: string) => {		
		return await loadingWrapper(() => api 
      .url(serverPath)
      .googleLogin(accessToken)
    )
	}

	const deleteAvatar = async () => {
		let url = serverPath + '/delete_avatar'
		return await loadingWrapper(() => api.post(url))
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
		if (currentUser && !authenticated) {
			setToken(currentUser?.token)
			setAuthenticated(true)
		}
		if (!currentUser && !authenticated) {
			let jwtToken = getCookie(authCookie)
			if (jwtToken) {
				authenticateFromToken(String(jwtToken))
			}
		}
	}, [currentUser])

	return {
		loading,
		errors,
		authCookie,
		user,
		setUser,
		currentUser,
		setCurrentUser,
		fetchMe,
		updateMe,
		forgotPassword,
		handleChange,
		authenticateFromToken,

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
	}
}

export default useAuth
