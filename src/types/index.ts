export type ConfigParams = {
	collection?: string
	path?: string
}

export type FetchOption = {
	method: string
	headers: Record<string, any>
	body: any
}

export type ExecuteResponse = {
	meta: any
	data: any
	error: any
}

export type QueryProps = {
	url: string
	name: string
	skip?: boolean
}

export type Resource = Record<string, any> & {
	id?: string
}

export type PageInfo = {
	page: number
	per_page: number
	total_count: number
	num_pages: number
}

export type MutationParams = {
	url: string
	name: string
}

export type Option = {
	label: string
	value: string | number | boolean
	icon?: string
}

export type Operator =
	| 'asc'
	| 'desc'
	| 'true'
	| 'false'
	| 'eq'
	| 'neq'
	| 'like'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'in'
	| 'nin'
	| 'include'
	| '1_day_ago'
	| '7_days_ago'
	| '14_days_ago'
	| '30_days_ago'
	| '60_days_ago'
	| '90_days_ago'

export type Value = string | number | string[] | number[]

export type Filter = {
	[field: string]: {
		[operator in Operator]?: Value
	}
}

export type Filters = {
	AND?: Filter[]
	OR?: Filter[]
}

/* This is the JSON formatted query
   Example: 
  {     
    keywords: 'harry potter', 
    filters: {
      AND: [
        { category: { in: ['books', 'movies'] },      
        { price: { gt: 20 } }
      ],
      OR: [
        { rating: { gte: 4 } }        
      ]
    },
    sort_by: 'rating', 
    sort_direction: 'desc' 
  }
*/

export type QueryParams = {
	sort_by?: string
	sort_direction?: 'asc' | 'desc' | null
	keywords?: string | null
	filters?: Filters | Record<string, any>
	page?: number | null
	per_page?: number | null
	rest?: any
}

export type QueryFilterArrayParams = {
	sort_by?: string
	sort_direction?: 'asc' | 'desc'
	keywords?: string
	filters?: FilterOption[]
	page?: number
	per_page?: number
}

export type QueryURLParams = {
	order?: string
	keywords?: string
	filters?: string
	page?: number
	per_page?: number
}

export type FilterOperator =
	| 'asc'
	| 'desc'
	| 'true'
	| 'false'
	| 'eq'
	| 'neq'
	| 'like'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'in'
	| 'nin'
	| '1_day_ago'
	| '7_days_ago'
	| '14_days_ago'
	| '30_days_ago'
	| '60_days_ago'
	| '90_days_ago'
	| 'current_year'
	| '1_day'
	| '7_days'
	| '14_days'
	| '30_days'
	| '60_days'
	| '90_days'
	| 'next_year'

export type FilterWhere = 'AND' | 'OR'

export type FilterOption = {
	where: FilterWhere
	field: string
	operator: FilterOperator
	value: any
}

export type SearchFilterInputProps = {
	filter?: FilterOption
	field?: string
	label?: string
	where?: FilterWhere
	operator?: FilterOperator
	options?: Option[]
	handleSubmit: (value: any) => void
}

export type User = {
	id?: number
	first_name?: string
	last_name?: string
	email: string
	token?: string
	image?: {
    id?: number
    url?: string
  }
}
