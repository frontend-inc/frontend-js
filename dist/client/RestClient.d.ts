import { ApiClientParamsType, ExecuteResponseType } from '../types';
export declare class RestClient {
    private method?;
    private payload?;
    private params?;
    private authToken?;
    private apiKey?;
    private options;
    private baseUrl;
    private fetchToken?;
    constructor(params: ApiClientParamsType);
    get(endpoint: string, params?: string, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    put(endpoint: string, payload: object, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    post(endpoint: string, payload?: object, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    delete(endpoint: string): Promise<ExecuteResponseType>;
    execute(endpoint?: string): Promise<ExecuteResponseType>;
}
