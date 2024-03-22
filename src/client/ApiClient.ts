import { ApiQuery } from './ApiQuery'
import { RestClient } from './RestClient'
import { UserType, QueryParamsType } from '../types'
import { ApiClientParamsType, ConfigParamsType, ExecuteResponseType } from '../types'

export class ApiClient {
	private payload?: object
	private _url?: string
	private _collection?: string
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
				target._collection = prop?.toString()
				target._url = `/${prop?.toString()}`
				return target
			},
		})
	}

	init(): ApiClient {
		this.apiQuery = new ApiQuery()
		this._collection = ''
		this.endpoint = ''
		this.payload = null
		this.headers = {
			'Content-Type': 'application/json',
		}
		this._url = ''
		return this
	}

	// Manually set the collection params
	config(params: ConfigParamsType) {
		if (typeof params !== 'object') {
			throw Error('Collection must be an object')
		}
		this.init()
		const { collection, path } = params
		if (typeof collection === 'string') {
			this._collection = collection
		}
		if (typeof path === 'string') {
			this._url = path
		}
		return this
	}

	clearQuery() {
		this.apiQuery = new ApiQuery()
		return this
	}

	url(path: string): ApiClient {
		this._url = path
		return this
	}

	collection(collection: string): ApiClient {
		this.init()
		this._collection = collection
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

	async findOne(id: any): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}`
		return await this.get(this.endpoint)
	}

	async findMany(searchParams: QueryParamsType): Promise<ExecuteResponseType> {
		this.apiQuery.where(searchParams)
		this.endpoint = this._url
		return await this.get(this.endpoint, this.apiQuery.url())
	}

	async create(data: Record<string, any>): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: data,
		}
		this.handleFormatData()
		this.endpoint = this._url
		return await this.post(this._url, this.payload, this.headers)
	}

	async update(data: Record<string, any>): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: data,
		}
		this.handleFormatData()
		this.endpoint = `${this._url}/${data.id}`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async destroy(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}`
		return await this.delete(this.endpoint)
	}

	async updatePositions(
		sorted: Record<string, any>[]
	): Promise<ExecuteResponseType> {
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${this._url}/update_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async updateMany(ids: number[], resource: object): Promise<ExecuteResponseType> {
		this.payload = {
			ids: ids,
			resoure: resource,
		}
		this.endpoint = `${this._url}/update_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async destroyMany(ids: number[]): Promise<ExecuteResponseType> {
		if (!Array.isArray(ids)) {
			throw Error('Ids must be an array')
		}
		this.payload = {
			ids: ids,
		}
		this.endpoint = `${this._url}/delete_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async publish(ids: number[]): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/publish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async unpublish(ids: number[]): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/unpublish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async like(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/like`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unlike(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/unlike`
		return await this.post(this.endpoint, null, this.headers)
	}

	async favorite(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/favorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfavorite(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/unfavorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async follow(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/follow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfollow(id: number): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/${id}/unfollow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async addLinks(
		sourceId: number,
		targetIds: number[]
	): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${this._url}/${sourceId}/add_links`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeLinks(
		sourceId: number,
		targetIds: number[]
	): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${this._url}/${sourceId}/remove_links`
		return await this.restClient.post(this.endpoint, this.payload, this.headers)
	}

	async addAttachment(
		id: number,
		name: string,
		attachmentId: number
	): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: {
				name: name,
				id: attachmentId,
			},
		}
		this.endpoint = `${this._url}/${id}/add_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeAttachment(id: number, name: string): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: {
				name: name,
			},
		}
		this.endpoint = `${this._url}/${id}/remove_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addImage(id: number, attachmentId: number): Promise<ExecuteResponseType> {
		this.payload = {
			[this._collection]: {
				id: attachmentId,
			},
		}
		this.endpoint = `${this._url}/${id}/add_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeImage(id: number): Promise<ExecuteResponseType> {
		this.payload = {}
		this.endpoint = `${this._url}/${id}/remove_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	// Auth methods
	async fetchMe(): Promise<ExecuteResponseType> {
		this.endpoint = `${this._url}/me`
		return await this.get(this.endpoint)
	}

	async updateMe(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: user,
		}
		this.handleFormatData()
		this.endpoint = `${this._url}/${user.id}`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async login(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: user,
		}
		this.endpoint = `${this._url}/login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async signup(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: user,
		}
		this.endpoint = `${this._url}/signup`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendPin(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this._url}/send_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyPin(email: string, pin: string): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				email: email,
				pin: pin,
			},
		}
		this.endpoint = `${this._url}/verify_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async changePassword(
		currentPassword: string,
		password: string,
		passwordConfirmation: string
	): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				current_password: currentPassword,
				password: password,
				password_confirmation: passwordConfirmation,
			},
		}
		this.endpoint = `${this._url}/change_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async forgotPassword(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this._url}/send_forgot_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async resetPassword(
		email: string,
		password: string,
		passwordConfirmation: string,
		changePasswordToken: string
	): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
				change_password_token: changePasswordToken,
			},
		}
		this.endpoint = `${this._url}/reset_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendOneTimePassword(user: UserType): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${this._url}/send_one_time_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyOneTimePassword(otp: string): Promise<ExecuteResponseType> {
		this._collection = 'user'
		this.payload = {
			[this._collection]: {
				one_time_password: otp,
			},
		}
		this.endpoint = `${this._url}/verify_one_time_password`
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
		let multipart = false
		for (const key in this.payload[this._collection]) {
			if (this.payload[this._collection][key] instanceof File) {
				multipart = true
				break
			}
		}
		if (multipart) {
			this.handleMultipartData()
		}
	}

	async handleMultipartData() {
		const formData = new FormData()
		for (const formKey in this.payload[this._collection]) {
			// Form objects can only send string key / value pairs
			// so we stringify the object
			if (this.isJsonObject(this.payload[this._collection][formKey])) {
				formData.append(
					`${this._collection}[${formKey}_string]`,
					JSON.stringify(this.payload[this._collection][formKey])
				)
			} else {
				formData.append(
					`${this._collection}[${formKey}]`,
					this.payload[this._collection][formKey]
				)
			}
		}
		this.payload = formData
    console.log('this.payload', this.payload)
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
