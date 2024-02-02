import React, { useEffect } from 'react'
import { useResourceContext } from '../hooks'

type QueryProps = {
	url: string
	handle: string | string[]	
  ready?: boolean
  query?: any
  children: React.ReactNode | React.ReactNode[]
}

const Query: React.FC<QueryProps> = (props) => {
	const { children, url, handle, query={}, ready=true } = props

	const { findOne, findMany } = useResourceContext({
		url
	})

	useEffect(() => {
		if (url && handle && ready) {
			findOne(handle)
		}else if(url && ready){
      findMany(query)
    }
	}, [url, handle, ready])

	return children
}

export default Query
