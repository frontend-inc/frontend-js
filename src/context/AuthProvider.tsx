import React, { useState } from 'react'
import AuthContext from './AuthContext'

type AuthProviderProps = {
	serverPath?: string
	children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
	const { children, serverPath } = props || {}
	const [authenticated, setAuthenticated] = useState()
	const [currentUserType, setCurrentUserType] = useState()
	const [token, setToken] = useState()

	const value = {
		serverPath,
		authenticated,
		setAuthenticated,
		currentUserType,
		setCurrentUserType,
		token,
		setToken,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
