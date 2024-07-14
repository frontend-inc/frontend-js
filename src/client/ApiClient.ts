import { ApiQuery } from './ApiQuery'
import { RestClient } from './RestClient'
import { UserType, QueryParamsType, QueryManyOptionsType } from '../types'
import { ApiClientParamsType, QueryOptionsType, MutateOptionsType, ExecuteResponseType } from '../types'

export class ApiClient {
	private payload?: object
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
				return target
			},
		})
	}

	init(): ApiClient {
		this.apiQuery = new ApiQuery()
		this.endpoint = ''
		this.payload = null
		this.headers = {
			'Content-Type': 'application/json',
		}
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
		this.endpoint = `${url}/${id}`
		return await this.get(this.endpoint)
	}

	async findMany(searchParams: QueryParamsType, options: QueryManyOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.apiQuery.where(searchParams)
		this.endpoint = url
		return await this.get(this.endpoint, this.apiQuery.url())
	}

	async create(resource: any, options: MutateOptionsType): Promise<ExecuteResponseType> {    
    const { name, url } = options || {}
		const payload = {
			[`${name}`]: resource,
		}
		this.payload = this.handleFormatData(name, payload)
		this.endpoint = url
    console.log("Create Format Data", resource, name, url, this.payload, this.headers, this.endpoint)
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async update(resource: any, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
		const payload = {
			[name]: resource,
		}
		this.payload = this.handleFormatData(name, payload)
		this.endpoint = `${url}/${resource.id}`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async destroy(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}`
		return await this.delete(this.endpoint)
	}

	async updatePositions(
		sorted: any[],
    options: MutateOptionsType): Promise<ExecuteResponseType> {      
    const { url } = options || {}
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${url}/update_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async updateLinkPositions(id: number, sorted: any[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${url}/${id}/update_link_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async updateMany(ids: number[], resource: object, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.payload = {
			ids: ids,
			resource: resource,
		}
		this.endpoint = `${url}/update_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async destroyMany(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		if (!Array.isArray(ids)) {
			throw Error('Ids must be an array')
		}
		this.payload = {
			ids: ids,
		}
		this.endpoint = `${url}/delete_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async publish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/publish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async unpublish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/unpublish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async like(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/like`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unlike(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/unlike`
		return await this.post(this.endpoint, null, this.headers)
	}

	async favorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/favorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfavorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/unfavorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async follow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/follow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfollow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/${id}/unfollow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async addLinks(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
		this.payload = {
			[name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${url}/${sourceId}/add_links`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeLinks(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
		this.payload = {
			[name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${url}/${sourceId}/remove_links`
		return await this.restClient.post(this.endpoint, this.payload, this.headers)
	}

	async addAttachment(
		id: number,
		name: string,
		attachmentId: number
	, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name: nameParam, url } = options || {}
		this.payload = {
			[nameParam]: {
				name: name,
				id: attachmentId,
			},
		}
		this.endpoint = `${url}/${id}/add_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeAttachment(id: number, name: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name: nameParam, url } = options || {}
		this.payload = {
			[nameParam]: {
				name: name,
			},
		}
		this.endpoint = `${url}/${id}/remove_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addImage(id: number, attachmentId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
		this.payload = {
			[name]: {
				id: attachmentId,
			},
		}
		this.endpoint = `${url}/${id}/add_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeImage(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.payload = {}
		this.endpoint = `${url}/${id}/remove_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	// Auth methods
	async fetchMe(options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
		this.endpoint = `${url}/me`
		return await this.get(this.endpoint)
	}

	async updateMe(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		const payload = {
			user: user
		}
		this.payload = this.handleFormatData(name, payload)
		this.endpoint = `${url}/me`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async login(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: user,
		}
		this.endpoint = `${url}/login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async signup(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: user,
		}
		this.endpoint = `${url}/signup`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendPin(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyPin(email: string, pin: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				email: email,
				pin: pin,
			},
		}
		this.endpoint = `${url}/verify_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async changePassword(
		currentPassword: string,
		password: string,
		passwordConfirmation: string, 
    options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				current_password: currentPassword,
				password: password,
				password_confirmation: passwordConfirmation,
			},
		}
		this.endpoint = `${url}/change_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async forgotPassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_forgot_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async googleLogin(accessToken: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
        access_token: accessToken
      },
		}
		this.endpoint = `${url}/google_login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async resetPassword(
		email: string,
		password: string,
		passwordConfirmation: string,
		changePasswordToken: string, 
    options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
				change_password_token: changePasswordToken,
			},
		}
		this.endpoint = `${url}/reset_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendOneTimePassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_one_time_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyOneTimePassword(otp: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
		this.payload = {
			[name]: {
				one_time_password: otp,
			},
		}
		this.endpoint = `${url}/verify_one_time_password`
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
		headers?: any): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.post(endpoint, payload, headers)
	}

	async put(
		endpoint: string,
		payload: object,
		headers: any): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.put(endpoint, payload, headers)
	}

	async delete(endpoint: string): Promise<ExecuteResponseType> {
		this.init()
		return await this.restClient.delete(endpoint)
	}

  handleChange(resource: any, name: string, value: any): any {
    return { 
      ...resource, 
      [name]: value 
    }
  }

	handleFormatData(name: string, payload: any): any {
		let multipart = false
     // Check if this.payload exists and is an object
     if (!payload || typeof payload !== 'object') {
        console.error('Payload is not defined or not an object', payload);
        return;
    }
    
    // Check if this.payload[name] exists and is an object
    if (!payload[name]) {
        console.error(`Payload for ${name} is not defined`, payload);        
        return;
    }
    
		for (const key in payload[name]) {
			if (payload[name][key] instanceof File) {
				multipart = true
				break
			}
		}
		if (multipart) {
      console.log("This is multipart...")
			return this.handleMultipartData(name, payload)
		}else{
      return payload
    }
	}

	handleMultipartData(name: string, payload: any): FormData {
		let formData = new FormData() as FormData
    formData.entries()
		for (const formKey in payload[name]) {
      console.log(`Form Key: ${formKey}`, payload[name], payload[name][formKey])
			// Form objects can only send string key / value pairs
			// so we stringify the object
			if (this.isJsonObject(payload[name][formKey])) {
				formData.append(`${name}[${formKey}_string]`, JSON.stringify(payload[name][formKey]))
			} else {        
        console.log(`Appending to formData ${name}[${formKey}]`, payload[name], payload[name][formKey])
				formData.append(`${name}[${formKey}]`, payload[name][formKey])
        console.log('Form Data after appending', formData, formData.entries())
			}
		}
    console.log('FormData', formData, formData.entries())
    this.headers['Content-Type'] = 'multipart/form-resource'
		return formData    		
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
