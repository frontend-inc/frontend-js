import { ApiClientParamsType, ExecuteResponseType } from '../types'

export class RestClient {
	private method?: string
	private payload?: Record<string, any>
	private params?: string
	private authToken?: string
	private apiKey?: string
	private options: any
	private baseUrl: string
	private fetchToken?: () => string | null

	constructor(params: ApiClientParamsType) {

    const { 
      url, 
      fetchToken = () => null, 
      apiKey, 
      authToken 
    } = params    

		this.method = 'GET'
		this.payload = null
		this.authToken = authToken
		this.apiKey = apiKey
		this.params = null
		this.fetchToken = fetchToken
		this.options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			data: this.payload,
		}
		this.baseUrl = url || process.env.NEXT_PUBLIC_API_BASE_URL
	}

	async get(
		endpoint: string,
		params?: string,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'GET'
		this.params = params
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async put(
		endpoint: string,
		payload: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'PUT'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async post(
		endpoint: string,
		payload?: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'POST'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async delete(endpoint: string): Promise<ExecuteResponseType> {
		this.method = 'DELETE'
		return await this.execute(endpoint)
	}

	async execute(endpoint: string = ''): Promise<ExecuteResponseType> {
		let response: ExecuteResponseType = {
			data: null,
			error: null,
			meta: null,
		}
		this.authToken = this.authToken || this.fetchToken()
		if (this.authToken) {
			this.options.headers['Authorization'] = `Bearer ${this.authToken}`
		}
		if (this.apiKey) {
			this.options.headers['X-Api-Key'] = this.apiKey
		}
		let url = `${this.baseUrl}${endpoint}`
		if (this.params && this.method == 'GET') {
			url += '?' + this.params
		}
		this.options = {
			...this.options,
			method: this.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
		}
		if (this.method === 'POST' || this.method === 'PUT') {
			this.options = {
				...this.options,			
        body: JSON.stringify(this.payload),
				method: this.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
			}
		}
		try {			
      const fetchResponse = await fetch(url, this.options)
      const resp = await fetchResponse.json()
      response.data = resp?.data 
      response.meta = resp?.meta
		} catch (error) {
			response.error = error
		}
		return response
	}
}
