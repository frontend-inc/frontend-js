import { ApiQuery } from './ApiQuery'
import { RestClient } from './RestClient'
import { 
  UserType, 
  QueryParamsType, 
  QueryOptionsType, 
  MutateOptionsType 
} from '../types'
import { 
  ApiClientParamsType, 
  ExecuteResponseType 
} from '../types'

export class ApiClient {
	private payload?: object
	private baseUrl?: string
	private name?: string
	private endpoint?: string
	private headers?: Record<string, any>
	private apiQuery: ApiQuery
	private restClient: RestClient

	constructor(params: ApiClientParamsType) {
    
    const {
      baseUrl,
      fetchToken,
      apiKey,
      authToken
    } = params

    this.baseUrl = baseUrl 
		this.restClient = new RestClient({ 
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

	async findMany(searchParams: QueryParamsType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { url } = options || {}    
    this.apiQuery.where(searchParams)
		this.endpoint = url
		return await this.get(this.endpoint, this.apiQuery.url())
	}

	async create(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType> {    
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: data,
		}
		this.handleFormatData()
		this.endpoint = url
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async update(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: data,
		}
		this.handleFormatData()
		this.endpoint = `${url}/${data.id}`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async destroy(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}`
		return await this.delete(this.endpoint)
	}

  async upload(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType> {    
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: data,
		}
		this.handleFormatData()
		this.endpoint = url
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async updatePositions(
		sorted: Record<string, any>[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${url}/update_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async updateReferencePositions(id: number, sorted: Record<string, any>[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${url}/${id}/update_reference_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async updateProductReferencePositions(id: number, sorted: Record<string, any>[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {
			ids: sorted.map((resource) => resource.id),
			positions: sorted.map((_, index) => index),
		}
		this.endpoint = `${url}/${id}/update_product_reference_positions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async updateMany(ids: number[], resource: object, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {
      ids: ids,
      [this.name]: resource,      
		}
		this.endpoint = `${url}/update_many`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async destroyMany(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
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
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/publish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async unpublish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/unpublish`
		this.payload = {
			ids: ids,
		}
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async like(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/like`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unlike(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/unlike`
		return await this.post(this.endpoint, null, this.headers)
	}

	async favorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/favorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfavorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/unfavorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async follow(username: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${username}/follow`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfollow(username: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${username}/unfollow`
		return await this.post(this.endpoint, null, this.headers)
	}

  async likeProduct(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/like_product`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unlikeProduct(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/unlike_product`
		return await this.post(this.endpoint, null, this.headers)
	}

	async favoriteProduct(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/favorite_product`
		return await this.post(this.endpoint, null, this.headers)
	}

	async unfavoriteProduct(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${id}/unfavorite_product`
		return await this.post(this.endpoint, null, this.headers)
	}

  async shopifyFavorite(handle: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.endpoint = `${url}/${handle}/shopify_favorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async shopifyUnfavorite(handle: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name    
		this.endpoint = `${url}/${handle}/shopify_unfavorite`
		return await this.post(this.endpoint, null, this.headers)
	}

	async addReferences(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'references'
		this.payload = {
			[this.name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${url}/${sourceId}/add_references`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeReferences(
		sourceId: number,
		targetIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'references'
		this.payload = {
			[this.name]: {
				ids: targetIds,
			},
		}
		this.endpoint = `${url}/${sourceId}/remove_references`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async addProductReferences(
		documentId: number,
		productIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'product_references'
		this.payload = {
			[this.name]: {
				ids: productIds,
			},
		}
		this.endpoint = `${url}/${documentId}/add_product_references`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeProductReferences(
		documentId: number,
		productIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'product_references'
		this.payload = {
			[this.name]: {
				ids: productIds,
			},
		}
		this.endpoint = `${url}/${documentId}/remove_product_references`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addProducts(
		productCollectionId: number,
		productIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'products'
		this.payload = {
			[this.name]: {
				ids: productIds
			},
		}
		this.endpoint = `${url}/${productCollectionId}/add_products`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeProducts(
		productCollectionId: number,
		productIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'products'
		this.payload = {
			[this.name]: {
				ids: productIds,
			},
		}
		this.endpoint = `${url}/${productCollectionId}/remove_products`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async addQuestions(
		formId: number,
		questionIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'questions'
		this.payload = {
			[this.name]: {
				ids: questionIds
			},
		}
		this.endpoint = `${url}/${formId}/add_questions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeQuestions(
		formId: number,
		questionIds: number[], 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'questions'
		this.payload = {
			[this.name]: {
				ids: questionIds
			},
		}
		this.endpoint = `${url}/${formId}/remove_questions`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addAttachment(
		id: number,
		name: string,
		attachmentId: number, 
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
    const { name: _name, url } = options || {}
    this.name = _name
		this.payload = {
			[this.name]: {
				name: name,
				id: attachmentId,
			},
		}
		this.endpoint = `${url}/${id}/add_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeAttachment(id: number, name: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name: _name, url } = options || {}
    this.name = _name
		this.payload = {
			[this.name]: {
				name: name,
			},
		}
		this.endpoint = `${url}/${id}/remove_attachment`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async addImage(id: number, attachmentId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name    
		this.payload = {
			[this.name]: {
				id: attachmentId,
			},
		}
		this.endpoint = `${url}/${id}/add_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeImage(id: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name, url } = options || {}
    this.name = name
		this.payload = {}
		this.endpoint = `${url}/${id}/remove_image`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  // Cart methods 
  async createCart(options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='cart', url } = options || {}
    this.name = name
		this.endpoint = url
		return await this.post(this.endpoint)
	}

  async fetchCart(cartId: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='cart', url } = options || {}
    this.name = name
		this.endpoint = `${url}/${cartId}`
		return await this.get(this.endpoint)
	}  

  async addToCart(cartId: string, productId: number, quantity: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'cart'
    this.payload = {
      [this.name]: {
        product_id: productId,
        quantity: quantity
      }
    }
		this.endpoint = `${url}/${cartId}/add_to_cart`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeFromCart(cartId:string, productId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'cart'
    this.payload = {
      [this.name]: {
        product_id: productId
      }
    }
		this.endpoint = `${url}/${cartId}/remove_from_cart`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async addQuantity(cartId: string, productId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'cart'
    this.payload = {
      [this.name]: {
        product_id: productId
      }
    }
		this.endpoint = `${url}/${cartId}/add_quantity`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async removeQuantity(cartId: string, productId: number, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'cart'
    this.payload = {
      [this.name]: {
        product_id: productId
      }
    }
		this.endpoint = `${url}/${cartId}/remove_quantity`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async checkout(cartId: number, cartOptions={},  options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'checkout'
    this.payload = {
      [this.name]: cartOptions
    }
		this.endpoint = `${url}/${cartId}/checkout`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async subscribe(subscripeOptions={},  options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'subscription'
    this.payload = {
      [this.name]: subscripeOptions
    }
		this.endpoint = `${url}/subscribe`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async unsubscribe(options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { url } = options || {}
    this.name = 'subscription'
    this.payload = {}
		this.endpoint = `${url}/unsubscribe`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	// Auth methods
	async fetchMe(options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name
		this.endpoint = `${url}/me`
		return await this.get(this.endpoint)
	}

	async updateMe(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: user,
		}
		this.handleFormatData()
		this.endpoint = `${url}/me`
		return await this.put(this.endpoint, this.payload, this.headers)
	}

	async login(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: user,
		}
		this.endpoint = `${url}/login`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async signup(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name    
		this.payload = {
			[this.name]: user,
		}
		this.endpoint = `${url}/signup`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async sendPin(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name    
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_pin`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyPin(email: string, pin: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: {
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
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: {
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
    this.name = name
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_forgot_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async authenticate(token: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name    
		this.payload = {
			token: token,
		}
		this.endpoint = `${url}/authenticate`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

  async googleLogin(accessToken: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name    
		this.payload = {
			[this.name]: {
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
    options: MutateOptionsType
  ): Promise<ExecuteResponseType> {
		const { name='user', url } = options || {}
    this.name = name
		this.payload = {
			[this.name]: {
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
    this.name = name    
		this.payload = {
			[this.name]: {
				...user,
				email: user.email,
			},
		}
		this.endpoint = `${url}/send_one_time_password`
		return await this.post(this.endpoint, this.payload, this.headers)
	}

	async verifyOneTimePassword(otp: string, options: MutateOptionsType): Promise<ExecuteResponseType> {
    const { name='user', url } = options || {}
    this.name = name    
		this.name = 'user'
		this.payload = {
			[this.name]: {
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
    const url = `${this.baseUrl}${endpoint}`
		return await this.restClient.get(url, params)
	}

	async post(
		endpoint: string,
		payload?: object,
		headers?: any
	): Promise<ExecuteResponseType> {
		this.init()
    const url = `${this.baseUrl}${endpoint}`
		return await this.restClient.post(url, payload, headers)
	}

	async put(
		endpoint: string,
		payload: object,
		headers: any
  ): Promise<ExecuteResponseType> {
		this.init()
    const url = `${this.baseUrl}${endpoint}`
		return await this.restClient.put(url, payload, headers)
	}

	async delete(endpoint: string): Promise<ExecuteResponseType> {
		this.init()
    const url = `${this.baseUrl}${endpoint}`
		return await this.restClient.delete(url)
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
	  baseUrl,
	  fetchToken,
	  apiKey,
	  authToken
  } = params

	return new ApiClient({ 
    baseUrl, 
    fetchToken, 
    apiKey, 
    authToken 
  })
}