import React from 'react';
export declare type ApiClientParamsType = {
    url: string;
    fetchToken?: () => string | null;
    apiKey?: string | null;
    authToken?: string | null;
};
export declare type ConfigParamsType = {
    collection?: string;
    path?: string;
};
export declare type FetchOptionType = {
    method: string;
    headers: Record<string, any>;
    body: any;
};
export declare type ExecuteResponseType = {
    meta: any;
    data: any;
    errors: any;
};
export declare type QueryPropsType = {
    url: string;
    name: string;
    skip?: boolean;
};
export declare type PageInfoType = {
    page: number;
    per_page: number;
    total_count: number;
    num_pages: number;
};
export declare type OperatorType = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'include' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago';
export declare type Filter = {
    [field: string]: {
        [operator in OperatorType]?: string | number;
    };
};
export declare type Filters = {
    AND?: Filter[];
    OR?: Filter[];
};
export declare type QueryParamsType = {
    keywords?: string | null;
    filters?: Filters | Record<string, any>;
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    current_user?: boolean;
    current_team?: boolean;
    rest?: any;
};
export declare type QueryFilterArrayParamsType = {
    sort_by: string;
    sort_direction: 'asc' | 'desc';
    keywords?: string;
    filters?: FilterOption[];
    page: number;
    per_page: number;
};
export declare type QueryURLParamsType = {
    order?: string;
    keywords?: string;
    filters?: string;
    page?: number;
    per_page?: number;
};
export declare type FilterOperatorType = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago' | 'current_year' | '1_day' | '7_days' | '14_days' | '30_days' | '60_days' | '90_days' | 'next_year';
export declare type FilterWhereType = 'AND' | 'OR';
export declare type FilterOption = {
    where: FilterWhereType;
    field: string;
    operator: FilterOperatorType;
    value: any;
};
export declare type OptionType = {
    label: string;
    value: string | number;
};
export declare type SearchFilterInputProps = {
    filter?: FilterOption;
    field?: string;
    label?: string;
    where?: FilterWhereType;
    operator?: FilterOperatorType;
    options?: OptionType[];
    handleSubmit: (value: any) => void;
};
export declare type UserType = any & {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    token?: string;
    image?: {
        id?: number;
        url?: string;
    };
};
export declare type ResourceType = Record<string, any> & {
    id?: number | string;
};
export declare type ID = string | number;
export declare type ResourceResponse = Record<string, any> & {
    id?: string;
    loading: boolean;
    setLoading: (value: boolean) => void;
    loadingWrapper: (fn: () => void) => void;
    errors: Record<string, any>;
    setErrors: (value: Record<string, any>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleErrors: (error: any) => void;
    resource: ResourceType;
    resources: ResourceType[];
    setResource: (value: ResourceType) => void;
    setResources: (value: ResourceType[]) => void;
    findOne: (id: ID) => ResourceType | null;
    findMany: (queryParams?: QueryParamsType, loadMore?: boolean) => Promise<any>;
    reloadMany: () => Promise<any>;
    save: (resource: ResourceType) => ResourceType;
    update: (resource: ResourceType) => ResourceType;
    create: (resource: ResourceType) => ResourceType;
    destroy: (id: ID) => Promise<any>;
    updateMany: (ids: ID[], data: ResourceType) => Promise<any>;
    deleteMany: (ids: ID[]) => void;
    publish: (ids: ID[]) => Promise<any>;
    unpublish: (id: ID[]) => Promise<any>;
    addLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
    removeLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
    addAttachment: (id: ID, fieldName: string, attachmentId: ID) => ResourceType;
    removeAttachment: (id: ID, fieldName: string) => ResourceType;
    updatePositions: (sorted: ResourceType[]) => Promise<any>;
    query: QueryParamsType;
    setQuery: (params: QueryParamsType) => void;
    meta: Record<string, any>;
    page: number;
    perPage: number;
    numPages: number;
    numResults: number;
    totalCount: number;
    sort: (sortBy: string, sortDirection: 'asc' | 'desc' | null) => Promise<any>;
    paginate: (page: number) => Promise<any>;
    loadMore: () => void;
};
export declare type LoadingWrapperResponseType = {
    data: any;
    loading: boolean;
    delayedLoading: boolean;
    errors: any;
    loadingWrapper: (fn: () => void) => void;
};
