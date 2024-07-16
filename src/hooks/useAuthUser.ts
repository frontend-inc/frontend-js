import React, { useEffect, useContext } from 'react'
import { ApiContext, AuthContext } from '../context'
import useSWR from 'swr'
import { setCookie } from 'cookies-next'

type UseAuthUserParams = {
  url: string
}

const useAuthUser = (params: UseAuthUserParams) => {
  const { url } = params || {}
  const { api, authCookie } = useContext(ApiContext)

  const { 
    currentUser, 
    setCurrentUser, 
    setAuthenticated, 
    setToken 
  } = useContext(AuthContext)

  const fetcher = (url) => api.fetchMe({ url })
  const { data, isLoading } = useSWR(url, fetcher)

  useEffect(() => {
    if(data?.data){
      setCurrentUser(data.data)
      setAuthenticated(true)
      setToken(data.data?.jwt_token)
      setCookie(authCookie, data.data?.jwt_token)
    }
  }, [data])

  return { 
    currentUser,
    isLoading 
  }
}

export default useAuthUser