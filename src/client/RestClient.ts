import axios from './axios'
import { ExecuteResponse } from '../types'

export class RestClient {
	private method?: string
	private payload?: Record<string, any>
	private params?: string
	private authToken?: string
	private apiKey?: string
	private options: any
	private baseUrl: string
	private fetchToken?: () => string | null

	constructor(
		baseUrl: string | null = null,
		fetchToken: () => string | null,
		apiKey: string | null = null,
		authToken: string | null = null
	) {
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
		this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL
	}

	async get(
		endpoint: string,
		params?: string,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponse> {
		this.method = 'GET'
		this.params = params
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async put(
		endpoint: string,
		payload: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponse> {
		this.method = 'PUT'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async post(
		endpoint: string,
		payload?: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponse> {
		this.method = 'POST'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(endpoint)
	}

	async delete(endpoint: string): Promise<ExecuteResponse> {
		this.method = 'DELETE'
		return await this.execute(endpoint)
	}

	async execute(endpoint: string = ''): Promise<ExecuteResponse> {
		let response: ExecuteResponse = {
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
				data: this.payload,
				method: this.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
			}
		}
		try {
			const fetchResponse = await axios({
				url,
				...this.options,
			})
			response.data = fetchResponse?.data
      //@ts-ignore
			response.meta = fetchResponse?.meta
		} catch (error) {
			response.error = error
		}
		return response
	}
}
