import React from 'react'
import { useResourceContext } from '../hooks'

export type WithResourceProps = {
  render: (resource: any) => React.ReactNode
}

const WithResource: React.FC<WithResourceProps> = (props) => {
  const { render } = props || {}
  const { resource, ...rest } = useResourceContext()
  return(render(resource, rest ))
}

export default WithResource