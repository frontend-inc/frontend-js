import React, { useContext } from 'react'
import { ApiContext } from '../context'
import useResource from './useResource'

const useTeams = () => {
	  
	const { api, url } = useContext(ApiContext)

  const {
    loading,
		delayedLoading,
		errors,
		resource: team,
		resources: teams,
		findOne: findTeam,
		findMany: findTeams,
		update: updateTeam,
		create: createTeam,
		destroy: deleteTeam,
		setResource: setTeam,
		handleChange,
		handleChangePage,
		reloadMany: reloadTeams,
		query,
		setQuery,
		page,
		numPages,
		perPage,
		totalCount,
		sortBy,
		sortDirection,
		handleSort,
		loadMore,
		loadingWrapper,
		paginate,
  } = useResource({
    name: 'team',
    url: `${url}/api/v1/auth/teams`
  })

  const selectTeam = async (teamId) => {
    return await loadingWrapper(
      () => api.post(`${url}/api/v1/${teamId}/select_team`)
    )
  }  

	return {
		loading,
		delayedLoading,		
		errors,
		team,
		teams,
		findTeam,
		findTeams,
		updateTeam,
		createTeam,
		deleteTeam,
    selectTeam,
		setTeam,
		handleChange,
		handleChangePage,
		reloadTeams,
		query,
		setQuery,
		page,
		numPages,
		perPage,
		totalCount,
		sortBy,
		sortDirection,
		handleSort,
		loadMore,
		loadingWrapper,
		paginate,    
	}
}

export default useTeams
