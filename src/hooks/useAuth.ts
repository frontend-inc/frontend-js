import React, { useContext, useEffect } from 'react'
import { ApiContext, AuthContext } from '../context'
import useResource from './useResource'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { UserType } from '../types'

const useAuth = () => {
	const { api, authCookie } = useContext(ApiContext)
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

  const params = {
    url
  }

	const updateMe = async (user: UserType) => {
		return await loadingWrapper(() => api.updateMe(user, params))
	}

	const fetchMe = async () => {
		return await loadingWrapper(() => api.fetchMe(params))
	}

	const login = async (user: UserType) => {
		return await loadingWrapper(() => api.login(user, params))
	}

	const signup = async (user: UserType) => {
		return await loadingWrapper(() => api.signup(user, params))
	}

	const sendPin = async (user: UserType) => {
		return await loadingWrapper(() => api.sendPin(user, params))
	}

	const verifyPin = async (email: string, pin: string) => {
		return await loadingWrapper(() => api.verifyPin(email, pin, params))
	}

	const changePassword = async (
		currentPassword: string,
		password: string,
		passwordConfirmation: string
	) => {
		return await loadingWrapper(() =>
			api.changePassword(currentPassword, password, passwordConfirmation, params)
		)
	}

	const sendOneTimePassword = async (user: UserType) => {
		return await loadingWrapper(() =>
			api.sendOneTimePassword(user, params)
		)
	}

	const verifyOneTimePassword = async (otp: string) => {
		return await loadingWrapper(() =>
			api.verifyOneTimePassword(otp, params)
		)
	}

	const forgotPassword = async (user: UserType) => {
		return await loadingWrapper(() => api.forgotPassword(user, params))
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
          params
				)
		)
	}

	const logout = async () => {
		await deleteCookie(authCookie)
		setCurrentUser(null)
		setAuthenticated(false)
	}

	const googleLogin = async (accessToken: string) => {		
		return await loadingWrapper(() => api 
      .googleLogin(accessToken, params)
    )
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
