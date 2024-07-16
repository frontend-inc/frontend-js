import { ApiQuery } from './ApiQuery'
import { RestClient } from './RestClient'
import { UserType, QueryParamsType, QueryOptionsType, MutateOptionsType } from '../types'
import { ApiClientParamsType, ExecuteResponseType } from '../types'

export class ApiClient {
	private payload?: object
	private url?: string
	private name?: string
	private endpoint?: string
	private headers?: Record<string, any>
	private apiQuery: ApiQuery
	private restClient: RestClient

	constructor(params: ApiClientParamsType) {
    
    const {
      url,
      fetchToken,
      apiKey,
      authToken
    } = params

		this.restClient = new RestClient({ 
      url, 
      fetchToken, 
      apiKey, 
      authToken
    })
		this.init()
		return new Proxy(this, {
			get(target, prop) {
				if (typeof target[prop] !== 'undefined') {
					return target[prop]
				}
				target.name = prop?.toString()
				return target
			},
		})
	}

	init(): ApiClient {
		this.apiQuery = new ApiQuery()
		this.name = ''
		this.endpoint = ''
		this.payload = null
		this.headers = {
			'Content-Type': 'application/json',
		}
		this.url = ''
		return this
	}


	clearQuery() {
		this.apiQuery = new ApiQuery()
		return this
	}

	query(params: QueryParamsType): ApiClient {
		this.apiQuery = new ApiQuery(params)
		return this
	}

	eq(field: string, value: string | number): ApiClient {
		this.apiQuery.eq(field, value)
		return this
	}

	neq(field: string, value: string | number): ApiClient {
		this.apiQuery.neq(field, value)
		return this
	}

	gt(field: string, value: string | number): ApiClient {
		this.apiQuery.gt(field, value)
		return this
	}

	gte(field: string, value: string | number): ApiClient {
		this.apiQuery.gte(field, value)
		return this
	}

	lt(field: string, value: string | number): ApiClient {
		this.apiQuery.lt(field, value)
		return this
	}

	lte(field: string, value: string | number): ApiClient {
		this.apiQuery.lte(field, value)
		return this
	}

	in(field: string, value: string | number): ApiClient {
		this.apiQuery.in(field, value)
		return this
	}

	nin(field: string, value: string | number): ApiClient {
		this.apiQuery.nin(field, value)
		return this
	}

	sort(field: string, direction: 'asc' | 'desc'): ApiClient {
		this.apiQuery.sort(field, direction)
		return this
	}

	search(query: string) {
		this.apiQuery.search(query)
		return this
	}

	filter(filters) {
		this.apiQuery.filter(filters)
		return this
	}

	page(page) {
		this.apiQuery.page = page
		return this
	}

	per(perPage) {
		this.apiQuery.per_page = perPage
		return this
	}

	async findOne(id: any, options: QueryOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.url = url 
		this.endpoint = `${this.url}/${id}`
		return await this.get(this.endpoint)
	}

	async findMany(searchParams: QueryParamsType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { url } = options || {}    
    this.url = url 
    this.apiQuery.where(searchParams)
		this.endpoint = this.url
		return await this.get(this.endpoint, this.apiQuery.url())
	}

	async create(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType> {    
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: data,
		}
		this.handleFormatData()
		this.endpoint = this.url
		return await this.post(this.url, this.payload, this.headers)
	}

	async update(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: data,
		}
		this.handleFormatData()
		this.endpoint = `${this.url}/${data.id}`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async destroy(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}`
		return await this.delete(this.endpoint)
	}

	async updatePositions(
		sorted: Record<string, any>[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${this.url}/update_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async updateReferencePositions(id: number, sorted: Record<string, any>[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${this.url}/${id}/update_reference_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async updateMany(ids: number[], resource: object, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			ids: ids,
			resoure: resource,
		}
		this.endpoint = `${this.url}/update_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async destroyMany(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		if (!Array.isArray(ids)) {
			throw Error('Ids must be an array')
		}
		this.payload = {
			ids: ids,
		}
		this.endpoint = `${this.url}/delete_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async findFilterFields(options: QueryOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.url = url
    this.endpoint = `${this.url}/filter_fields`
    return await this.get(this.endpoint)
  }

  async findSortFields(options: QueryOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.url = url
    this.endpoint = `${this.url}/sort_fields`
    return await this.get(this.endpoint)
  }

  async findFormFields(options: QueryOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.url = url
    this.endpoint = `${this.url}/form_fields`
    return await this.get(this.endpoint)
  }

	async publish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/publish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async unpublish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/unpublish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async like(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/like`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unlike(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/unlike`
		return await this.post(this.endpoint, null, this.headers)
	}

	async favorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/favorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfavorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/unfavorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async follow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/follow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfollow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/${id}/unfollow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async addReferences(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'references'
    this.url = url
		this.payload = {
			[this.name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${this.url}/${sourceId}/add_references`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeReferences(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'references'
    this.url = url
		this.payload = {
			[this.name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${this.url}/${sourceId}/remove_references`
		return await this.restClient.post(this.endpoint, this.payload, this.headers)
	}

	async addAttachment(
		id: number,
		name: string,
		attachmentId: number, 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { name: _name, url } = options || {}
    this.name = _name
    this.url = url
		this.payload = {
			[this.name]: {
				name: name,
				id: attachmentId,
			},
		}
		this.endpoint = `${this.url}/${id}/add_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeAttachment(id: number, name: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name: _name, url } = options || {}
    this.name = _name
    this.url = url
		this.payload = {
			[this.name]: {
				name: name,
			},
		}
		this.endpoint = `${this.url}/${id}/remove_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addImage(id: number, attachmentId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				id: attachmentId,
			},
		}
		this.endpoint = `${this.url}/${id}/add_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeImage(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
    this.url = url
		this.payload = {}
		this.endpoint = `${this.url}/${id}/remove_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	// Auth methods
	async fetchMe(options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.endpoint = `${this.url}/me`
		return await this.get(this.endpoint)
	}

	async updateMe(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			user: user,
		}
		this.handleFormatData()
		this.endpoint = `${this.url}/me`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async login(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name
    this.url = url		
		this.payload = {
			[this.name]: user,
		}
		this.endpoint = `${this.url}/login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async signup(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: user,
		}
		this.endpoint = `${this.url}/signup`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendPin(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this.url}/send_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyPin(email: string, pin: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				email: email,
				pin: pin,
			},
		}
		this.endpoint = `${this.url}/verify_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async changePassword(
		currentPassword: string,
		password: string,
		passwordConfirmation: string, 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				current_password: currentPassword,
				password: password,
				password_confirmation: passwordConfirmation,
			},
		}
		this.endpoint = `${this.url}/change_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async forgotPassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this.url}/send_forgot_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async googleLogin(accessToken: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
        access_token: accessToken
      },
		}
		this.endpoint = `${this.url}/google_login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async resetPassword(
		email: string,
		password: string,
		passwordConfirmation: string,
		changePasswordToken: string, 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
				change_password_token: changePasswordToken,
			},
		}
		this.endpoint = `${this.url}/reset_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendOneTimePassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this.url}/send_one_time_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyOneTimePassword(otp: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name
    this.url = url
		this.name = 'user'
		this.payload = {
			[this.name]: {
				one_time_password: otp,
			},
		}
		this.endpoint = `${this.url}/verify_one_time_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	parseURL(routerParams: any) {
		this.apiQuery.parseURL(routerParams)
		return this
	}

	async get(endpoint: string, params?: string): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.get(endpoint, params)
	}

	async post(
		endpoint: string,
		payload?: object,
		headers?: any
	): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.post(endpoint, payload, headers)
	}

	async put(
		endpoint: string,
		payload: object,
		headers: any
  ): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.put(endpoint, payload, headers)
	}

	async delete(endpoint: string): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.delete(endpoint)
	}

	handleFormatData(): void {		
		for (const key in this.payload[this.name]) {
			if (this.payload[this.name][key] instanceof File) {
				this.handleMultipartData()
				break
			}
		}		
	}

	async handleMultipartData() {
		const formData = new FormData()
		for (const formKey in this.payload[this.name]) {
			// Form objects can only send string key / value pairs
			// so we stringify the object
			if (this.isJsonObject(this.payload[this.name][formKey])) {
				formData.append(
					`${this.name}[${formKey}_string]`,
					JSON.stringify(this.payload[this.name][formKey])
				)
			} else {        
				formData.append(
					`${this.name}[${formKey}]`,
					this.payload[this.name][formKey]
				)
			}
		}
		this.payload = formData    
		this.headers['Content-Type'] = 'multipart/form-data'
	}

	isJsonObject(value) {
		if (value instanceof File) {
			return false
		}
		try {
			const obj = JSON.parse(JSON.stringify(value))
			return typeof obj === 'object' && obj !== null
		} catch (e) {
			return false
		}
	}
}
// End ApiClient

export const createClient = (params: ApiClientParamsType): ApiClient => {

  const {
	  url,
	  fetchToken,
	  apiKey,
	  authToken
  } = params

	return new ApiClient({ 
    url, 
    fetchToken, 
    apiKey, 
    authToken 
  })
}