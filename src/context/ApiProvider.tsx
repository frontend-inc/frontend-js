import React from 'react'
import ApiContext from './ApiContext'
import { createClient } from '../client'
import { getCookie } from 'cookies-next'

type ApiProviderProps = {
	url: string
	clientUrl?: string
  authUrl?: string
	apiKey?: string
	authCookie: string
	children: React.ReactNode
}

const ApiProvider = (props: ApiProviderProps) => {
	
  const {
		url: baseUrl,
		clientUrl,
    authUrl,
		authCookie = 'auth-token',
		apiKey,
		children,
	} = props || {}

  const fetchAuthToken = () => {
    let token = getCookie(authCookie)
    return token ? String(token) : null 
  }

  const api = createClient({
    baseUrl, 
    fetchToken: fetchAuthToken,
    apiKey
   })

	const value = {
    url: baseUrl,
		api,
		apiKey,		
    authUrl,
		clientUrl,
		authCookie,
	}

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiProvider
