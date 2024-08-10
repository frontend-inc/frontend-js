import { UserType, QueryParamsType, QueryOptionsType, MutateOptionsType } from '../types';
import { ApiClientParamsType, ExecuteResponseType } from '../types';
export declare class ApiClient {
    private payload?;
    private baseUrl?;
    private name?;
    private endpoint?;
    private headers?;
    private apiQuery;
    private restClient;
    constructor(params: ApiClientParamsType);
    init(): ApiClient;
    clearQuery(): this;
    query(params: QueryParamsType): ApiClient;
    eq(field: string, value: string | number): ApiClient;
    neq(field: string, value: string | number): ApiClient;
    gt(field: string, value: string | number): ApiClient;
    gte(field: string, value: string | number): ApiClient;
    lt(field: string, value: string | number): ApiClient;
    lte(field: string, value: string | number): ApiClient;
    in(field: string, value: string | number): ApiClient;
    nin(field: string, value: string | number): ApiClient;
    sort(field: string, direction: 'asc' | 'desc'): ApiClient;
    search(query: string): this;
    filter(filters: any): this;
    page(page: any): this;
    per(perPage: any): this;
    findOne(id: any, options: QueryOptionsType): Promise<ExecuteResponseType>;
    findMany(searchParams: QueryParamsType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    create(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType>;
    update(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType>;
    destroy(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    upload(data: Record<string, any>, options: MutateOptionsType): Promise<ExecuteResponseType>;
    updatePositions(sorted: Record<string, any>[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    updateReferencePositions(id: number, sorted: Record<string, any>[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    updateMany(ids: number[], resource: object, options: MutateOptionsType): Promise<ExecuteResponseType>;
    destroyMany(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    publish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    unpublish(ids: number[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    like(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    unlike(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    favorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    unfavorite(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    follow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    unfollow(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    addReferences(sourceId: number, targetIds: number[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    removeReferences(sourceId: number, targetIds: number[], options: MutateOptionsType): Promise<ExecuteResponseType>;
    addAttachment(id: number, name: string, attachmentId: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    removeAttachment(id: number, name: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    addImage(id: number, attachmentId: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    removeImage(id: number, options: MutateOptionsType): Promise<ExecuteResponseType>;
    fetchMe(options: MutateOptionsType): Promise<ExecuteResponseType>;
    updateMe(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    login(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    signup(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    sendPin(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    verifyPin(email: string, pin: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    changePassword(currentPassword: string, password: string, passwordConfirmation: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    forgotPassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    googleLogin(accessToken: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    resetPassword(email: string, password: string, passwordConfirmation: string, changePasswordToken: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    sendOneTimePassword(user: UserType, options: MutateOptionsType): Promise<ExecuteResponseType>;
    verifyOneTimePassword(otp: string, options: MutateOptionsType): Promise<ExecuteResponseType>;
    parseURL(routerParams: any): this;
    get(endpoint: string, params?: string): Promise<ExecuteResponseType>;
    post(endpoint: string, payload?: object, headers?: any): Promise<ExecuteResponseType>;
    put(endpoint: string, payload: object, headers: any): Promise<ExecuteResponseType>;
    delete(endpoint: string): Promise<ExecuteResponseType>;
    handleFormatData(): void;
    handleMultipartData(): Promise<void>;
    isJsonObject(value: any): boolean;
}
export declare const createClient: (params: ApiClientParamsType) => ApiClient;
