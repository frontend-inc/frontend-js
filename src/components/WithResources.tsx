import React from 'react'
import { useResourceContext } from '../hooks'

export type WithResourcesProps = {
  render: (resources: any, rest: any) => React.ReactNode
}

const WithResources: React.FC<WithResourcesProps> = (props) => {
  const { render } = props || {}
  const { resources, ...rest } = useResourceContext()
  
  return(resources?.map((resource, idx) => render(resource, idx, rest)))
}

export default WithResources