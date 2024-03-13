import React, { useState } from 'react'
import AuthContext from './AuthContext'

type AuthProviderProps = {
	serverPath?: string
	children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
	const { children, serverPath } = props || {}
	const [authenticated, setAuthenticated] = useState()
	const [currentUser, setCurrentUser] = useState()
	const [token, setToken] = useState()

	const value = {
		serverPath,
		authenticated,
		setAuthenticated,
		currentUser,
		setCurrentUser,
		token,
		setToken,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
