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
		url,
		clientUrl,
		authCookie = 'auth-token',
		apiKey,
		children,
	} = props || {}

  const api = createClient({
    url, 
    fetchToken: () => String(getCookie(authCookie)), 
    apiKey
   })

	const value = {
    url,
		api,
		apiKey,		
		clientUrl,
		authCookie,
	}

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiProvider
