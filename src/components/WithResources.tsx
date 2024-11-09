import React from 'react'
import { useResourceContext } from '../hooks'

export type WithResourcesProps = {
  render: (resources: any) => React.ReactNode
}

const WithResources: React.FC<WithResourcesProps> = (props) => {
  const { render } = props || {}
  const { resources, ...rest } = useResourceContext()
  return(render(resources, rest ))
}

export default WithResources