import { RestClientParamsType, ExecuteResponseType } from '../types';
export declare class RestClient {
    private method?;
    private payload?;
    private params?;
    private authToken?;
    private apiKey?;
    private options;
    private fetchToken?;
    constructor(params?: RestClientParamsType);
    get(url: string, params?: string, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    put(url: string, payload: object, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    post(url: string, payload?: object, headers?: Record<string, any> | null): Promise<ExecuteResponseType>;
    delete(url: string): Promise<ExecuteResponseType>;
    execute(url?: string): Promise<ExecuteResponseType>;
}
