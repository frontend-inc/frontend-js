import React from 'react'
import ApiContext from './ApiContext'
import { createClient } from '../client'
import { getCookie } from 'cookies-next'

type ApiProviderProps = {
	url: string
	clientUrl?: string
	apiKey?: string
	authCookie: string
	children: React.ReactNode
}

const ApiProvider = (props: ApiProviderProps) => {
	const {
		url: baseUrl,
		clientUrl,
		authCookie = 'authToken',
		apiKey,
		children,
	} = props || {}

	const fetchAuthCookie = () => String(getCookie(authCookie))
	const api = createClient(baseUrl, fetchAuthCookie, apiKey)

	const value = {
		api,
		apiKey,
		baseUrl,
		clientUrl,
		authCookie,
	}

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiProvider
