import { RestClientParamsType, ExecuteResponseType } from '../types'

export class RestClient {
	private method?: string
	private payload?: Record<string, any> 
	private params?: string
	private authToken?: string
	private apiKey?: string
	private options: any
	private fetchToken?: () => string | null

	constructor(params: RestClientParamsType = {}) {

    const { 
      fetchToken = () => null, 
      apiKey, 
      authToken 
    } = params || {}    

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
			}			
		}
	}

	async get(
		url: string,
		params?: string,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'GET'
		this.params = params
		this.options.headers = headers || this.options.headers
		return await this.execute(url)
	}

	async put(
		url: string,
		payload: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'PUT'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(url)
	}

	async post(
		url: string,
		payload?: object,
		headers?: Record<string, any> | null
	): Promise<ExecuteResponseType> {
		this.method = 'POST'
		this.payload = payload
		this.options.headers = headers || this.options.headers
		return await this.execute(url)
	}

	async delete(url: string): Promise<ExecuteResponseType> {
		this.method = 'DELETE'
		return await this.execute(url)
	}

	async execute(url: string = ''): Promise<ExecuteResponseType> {    
		let response: ExecuteResponseType = {
			data: <any>null,			
			meta: <any>null,
      errors: <any>null
		}
    if(this.authToken != null && this.authToken != undefined){
      this.authToken = this.authToken
    }else{
      this.authToken = this.fetchToken()
    }		
		if (this.authToken != null && this.authToken != undefined) {
			this.options.headers['Authorization'] = `Bearer ${this.authToken}`
		}
		if (this.apiKey) {
			this.options.headers['X-Api-Key'] = this.apiKey
		}
		if (this.params && this.method == 'GET') {
			url += '?' + this.params
		}
		this.options = {      
      method: this.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
			headers: this.options.headers			
		}
    if((this.method === 'POST' || this.method === 'PUT') && this.options.headers['Content-Type'] !== 'multipart/form-data') {      
      try{
        //@ts-ignore
        this.payload = JSON.stringify(this.payload)      
      }catch(e){
        console.log('Error', e)
      }
    }else if((this.method === 'POST' || this.method === 'PUT') && this.options.headers['Content-Type'] === 'multipart/form-data') {
      // When using Fetch API you must not set the Content-Type header to multipart/form-data
      // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
      delete this.options.headers['Content-Type']
    }    
		if (this.method === 'POST' || this.method === 'PUT') {
			this.options = {
        ...this.options,
        method: this.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
        body: this.payload	
			}
		}
		try {			      
      const fetchResponse = await fetch(url, this.options)
      const resp = await fetchResponse.json()
      response.data = resp?.data 
      response.meta = resp?.meta
      response.errors = resp?.errors      
		} catch (error) {
			response.errors = error
		}
		return response
	}
}
