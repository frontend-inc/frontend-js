import {
	QueryURLParamsType,
	QueryParamsType,
	FilterType,
} from '../types'

export class ApiQuery {
	private _sort_by?: string
	private _sort_direction?: string
	private _keywords?: string
	private _filters?: FilterType[]
	private _page?: number
	private _per_page?: number
	private _params?: any

	constructor(params: QueryParamsType = {
    sort_by: 'id',
    sort_direction: 'desc',
    page: 1,
    per_page: 20,
  }) {
		const {
			sort_by,
			sort_direction,
			keywords,
			filters,
			page,
			per_page,
			...rest
		} = params

		this._sort_by = sort_by || 'id'
		this._sort_direction = sort_direction || 'desc'
		this._keywords = keywords
		this._filters = filters || []
		this._page = page
		this._per_page = per_page
		this._params = rest
	}

	set page(value: number) {
		if (typeof value === 'number' && value > 0) {
			this._page = value
		} else {
			throw new Error('Page must be a positive number.')
		}
	}

	set per_page(value: number) {
		if (typeof value === 'number' && value > 0) {
			this._per_page = value
		} else {
			throw new Error('Per_page must be a positive number.')
		}
	}

	get page(): number {
		return this._page
	}

	get per_page(): number {
		return this._per_page
	}

	set keywords(value: string) {
		if (typeof value === 'string') {
			this._keywords = value
		} else {
			throw new Error('Keywords must be a string.')
		}
	}

	get keywords(): string {
		return this._keywords
	}

	get filters() {
		return this._filters
	}

	set filters(value) {
		if (typeof value === 'object') {
			this._filters = value
		} else {
			throw new Error('FiltersType must be an object.')
		}
	}

	get sort_by() {
		return this._sort_by
	}

	set sort_by(value) {
		if (typeof value === 'string') {
			this._sort_by = value
		} else {
			throw new Error('Sort_by must be a string.')
		}
	}

	set sort_direction(value) {
		if (typeof value === 'string') {
			this._sort_direction = value
		} else {
			throw new Error('Sort_direction must be a string.')
		}
	}

	get sort_direction() {
		return this._sort_direction
	}

	where(searchParams: QueryParamsType): ApiQuery {
		let {
			sort_by = 'id',
			sort_direction = 'desc',
			keywords,
			filters,
			page = 1,
			per_page = 20,
			...rest
		} = searchParams || {}

    this._filters = filters || this._filters
    this._sort_by = sort_by || this._sort_by
		this._sort_direction = sort_direction || this._sort_direction
		this._keywords = keywords || this._keywords
		this._page = page || this._page
		this._per_page = per_page || this._per_page
		this._params = rest || {}
		return this
	}

	filter(filters: FilterType[]): ApiQuery {
		this._filters = filters
		return this
	}

	sort(field: string, direction: string | null = null): ApiQuery {
		if (field === this.sort_by && !direction) {
			if (this._sort_direction === 'asc') {
				this._sort_direction = 'desc'
			} else {
				this._sort_direction = 'asc'
			}
		} else {
			this._sort_by = field
			this._sort_direction = direction || 'asc'
		}
		return this
	}

	search(query: string): ApiQuery {
		this._keywords = query
		return this
	}

	eq(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { eq: value } })
		return this
	}

	neq(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { neq: value } })
		return this
	}

	gt(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { gt: value } })
		return this
	}

	gte(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { gte: value } })
		return this
	}

	lt(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { lt: value } })
		return this
	}

	lte(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { lte: value } })
		return this
	}

	in(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { in: value } })
		return this
	}

	nin(field: string, value: string | number): ApiQuery {
		this.addFilter({ [field]: { nin: value } })
		return this
	}

	addFilter(filter: FilterType | any): ApiQuery {    
		this._filters = [
			filter, 
			...(this._filters || [])
    ]
		return this
	}

	url() {
		let searchParams: QueryURLParamsType = {
			page: this._page || 1,
			per_page: this._per_page || 20,
		}

		if (this._sort_by && this._sort_direction) {
			searchParams = {
				...searchParams,
				order: `${this._sort_by}:${this._sort_direction}`,
			}
		}

		if (this._keywords && this._keywords.length > 0) {
			searchParams = {
				...searchParams,
				keywords: this._keywords,
			}
		}

		let filterParts = []
		if (Array.isArray(this._filters) && this._filters.length > 0) {
      this._filters?.forEach((filter: FilterType) => {
        if (this.isValidFilter(filter)) {
          let field = Object.keys(filter)[0]
          let operator = Object.keys(filter[field])[0]
          let value = filter[field][operator]
          if (Array.isArray(value)) {
            value = `[${value.join(',')}]`
          }
          filterParts.push(`${field}:${operator}:${value}`)
        }
      })
		}

		searchParams = {
			...searchParams,
			filters: filterParts.join(','),
		}

		searchParams = {
			...searchParams,
			...(this._params || {}),
		}

		let url = []
		for (let key in searchParams) {
			if (searchParams[key]) {
				url.push(`${key}=${searchParams[key]}`)
			}
		}

		return url.join('&')
	}

	parseURL(routerParams: any = {}) {
		const {
			keywords,
			page,
			per_page,
			filters: filterParams,
			order,
		} = routerParams

		let [sort_by, sort_direction] = order ? order.split(':') : []

		let filters = []
		if (filterParams) {
				// Regular expression to also handle
				// filters=(id:in:[1,2,3])
				let filterRegex = /,(?![^\[]*\])/
				filters = filterParams.split(filterRegex).map((filter) => {
					let [field, operator, value] = filter.split(':')
					if (operator == 'in' || operator == 'nin') {
						value = value.replace('[', '').replace(']', '').split(',')
					}
					return {
						[field]: { [operator]: value },
					}
				})
			}						

		this._keywords = keywords || ''
		this._page = page || 1
		this._per_page = per_page || 20
		this._sort_by = sort_by || 'id'
		this._sort_direction = sort_direction || 'desc'
		this._filters = filters || []
		return this
	}

	query() {
		return {
			keywords: this._keywords,
			page: this._page,
			per_page: this._per_page,
			sort_by: this._sort_by,
			sort_direction: this._sort_direction,
			filters: this._filters,
		}
	}

	isValidFilter = (filter: any) => {
		if (typeof filter !== 'object') {
			return false
		}
		let operator = Object.keys(filter)[0]
		let value = filter[operator]
		return (
			typeof filter === 'object' &&
			operator !== null &&
			operator !== '' &&
			operator !== undefined &&
			value !== null &&
			value !== '' &&
			value !== undefined
		)
	}
}
