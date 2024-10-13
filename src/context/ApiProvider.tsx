'use client';

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
  requireApiKey?: boolean
	children: React.ReactNode
}

const ApiProvider = (props: ApiProviderProps) => {
	
  const {
		url,
		clientUrl,
    authUrl,
		authCookie = 'auth-token',
		apiKey,
    requireApiKey,
		children,
	} = props || {}

  const fetchAuthToken = () => {
    let token = getCookie(authCookie)
    return token ? String(token) : null 
  }

  const api = createClient({
    baseUrl: url, 
    fetchToken: fetchAuthToken,
    apiKey
   })

	const value = {
    url,
		api,
		apiKey,		
    authUrl,
		clientUrl,
		authCookie,
	}
  if(requireApiKey && !apiKey) return null;
	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiProvider
