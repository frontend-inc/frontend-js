import {
	QueryURLParamsType,
	QueryParamsType,
	Filters,
	Filter,
	QueryFilterArrayParamsType,
} from '../types'

export class ApiQuery {
	private _sort_by?: string
	private _sort_direction?: string
	private _keywords?: string
	private _filters?: Filters | {}
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
		this._filters = filters || {
			AND: [],
			OR: [],
		}
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
			throw new Error('Filters must be an object.')
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

	where(searchParams: QueryParamsType | QueryFilterArrayParamsType): ApiQuery {
		let {
			sort_by = 'id',
			sort_direction = 'desc',
			keywords,
			filters,
			page = 1,
			per_page = 20,
			...rest
		} = searchParams || {}

		this.transformFilterArray(filters)
		this._sort_by = sort_by || this._sort_by
		this._sort_direction = sort_direction || this._sort_direction
		this._keywords = keywords || this._keywords
		this._filters = filters || this._filters
		this._page = page || this._page
		this._per_page = per_page || this._per_page
		this._params = rest || {}
		return this
	}

	filter(filters: Filter | {}): ApiQuery {
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
		this.AND_filter({ [field]: { eq: value } })
		return this
	}

	neq(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { neq: value } })
		return this
	}

	gt(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { gt: value } })
		return this
	}

	gte(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { gte: value } })
		return this
	}

	lt(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { lt: value } })
		return this
	}

	lte(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { lte: value } })
		return this
	}

	in(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { in: value } })
		return this
	}

	nin(field: string, value: string | number): ApiQuery {
		this.AND_filter({ [field]: { nin: value } })
		return this
	}

	orEq(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { eq: value } })
		return this
	}

	orNeq(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { neq: value } })
		return this
	}

	orLt(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { lt: value } })
		return this
	}

	orLte(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { lte: value } })
		return this
	}

	orGt(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { gt: value } })
		return this
	}

	orGte(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { gte: value } })
		return this
	}

	orIn(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { in: value } })
		return this
	}

	orNin(field: string, value: string | number): ApiQuery {
		this.OR_filter({ [field]: { nin: value } })
		return this
	}

	AND_filter(filter: Filter): ApiQuery {    
		this._filters = {
			...this._filters,
			AND: [...(this._filters['AND'] || []), filter],
		}
		return this
	}

	OR_filter(filter: Filter): ApiQuery {
		this._filters = {
			...this._filters,
			OR: [...(this._filters['OR'] || []), filter],
		}
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

		let andFilters: string[] = []
		let orFilters: string[] = []
		if (
			typeof this._filters === 'object' &&
			Object.keys(this._filters).length > 0
		) {
			Object.keys(this._filters).forEach((where: string) => {
				let andOrfilters = this._filters[where]
				andOrfilters?.forEach((filter: Filter) => {
					if (this.isValidFilter(filter)) {
						let field = Object.keys(filter)[0]
						let operator = Object.keys(filter[field])[0]
						let value = filter[field][operator]
						if (Array.isArray(value)) {
							value = `[${value.join(',')}]`
						}
						if (where == 'AND') {
							andFilters.push(`${field}:${operator}:${value}`)
						}
						if (where == 'OR') {
							orFilters.push(`${field}:${operator}:${value}`)
						}
					}
				})
			})
		}

		let andOrFilters = []
		if (andFilters.length > 0) {
			andOrFilters.push(`and(${andFilters.join(',')})`)
		}
		if (orFilters.length > 0) {
			andOrFilters.push(`or(${orFilters.join(',')})`)
		}
		searchParams = {
			...searchParams,
			filters: andOrFilters.join(''),
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

	parseURL(routerParams: Record<string, any> = {}) {
		const {
			keywords,
			page,
			per_page,
			filters: filterParams,
			order,
		} = routerParams

		let [sort_by, sort_direction] = order ? order.split(':') : []

		let filters = {}
		// Split the string into "AND" and "OR" parts
		if (filterParams) {
			const andPart = filterParams.match(/and\((.*?)\)/)
			let andFilterArray = []
			const orPart = filterParams.match(/or\((.*?)\)$/)
			let orFilterArray = []

			// Parse AND filters
			if (andPart) {
				let andFilters = andPart[1]
				// Regular expression to also handle
				// filters=and(id:in:[1,2,3])
				let filterRegex = /,(?![^\[]*\])/
				andFilterArray = andFilters.split(filterRegex).map((filter) => {
					let [field, operator, value] = filter.split(':')
					if (operator == 'in' || operator == 'nin') {
						value = value.replace('[', '').replace(']', '').split(',')
					}
					return {
						[field]: { [operator]: value },
					}
				})
				filters = {
					...filters,
					AND: andFilterArray,
				}
			}

			// Parse OR filters
			if (orPart) {
				let orFilters = orPart[1]
				orFilterArray = orFilters.split(',').map((filter) => {
					const [field, operator, value] = filter.split(':')
					return {
						[field]: { [operator]: value },
					}
				})
				filters = {
					...filters,
					OR: orFilterArray,
				}
			}
		}

		this._keywords = keywords || ''
		this._page = page || 1
		this._per_page = per_page || 20
		this._sort_by = sort_by || 'id'
		this._sort_direction = sort_direction || 'desc'
		this._filters = filters || {}
		return this
	}

	transformFilterArray(filters: Record<string, any>) {
		if (Array.isArray(filters)) {
			for (const filter of filters) {
				const { where, field, operator, value } = filter
				if (where !== 'AND' && where !== 'OR') {
					throw new Error('Filter must include AND or OR.')
				}
				if (where === 'AND') {
					this.AND_filter({
						[field]: { [operator]: value },
					})
				}
				if (where === 'OR') {
					this.OR_filter({
						[field]: { [operator]: value },
					})
				}
			}
		}
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
