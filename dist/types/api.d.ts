import React from 'react';
export type RestClientParamsType = {
    fetchToken?: () => string | null;
    apiKey?: string | null;
    authToken?: string | null;
};
export type ApiClientParamsType = {
    baseURL: string;
    apiKey: string | null;
    authToken?: string | null;
    fetchToken?: () => string | null;
};
export type ConfigParamsType = {
    collection?: string;
    path?: string;
};
export type FetchOptionType = {
    method: string;
    headers: Record<string, any>;
    body: any;
};
export type ExecuteResponseType = {
    meta: any;
    data: any;
    errors: any;
};
export type QueryPropsType = {
    url: string;
    name: string;
    skip?: boolean;
};
export type OperatorType = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'include' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago';
export type QueryOptionsType = {
    url: string;
};
export type MutateOptionsType = {
    url: string;
    name?: string;
};
export type QueryManyOptionsType = {
    url: string;
    loadMore?: boolean;
};
export type ResourceType = Record<string, any> & {
    id?: number | string;
};
export type ID = string | number;
export type PageInfoType = {
    page: number;
    perPage: number;
    numPages: number;
    totalCount: number;
};
export type UseResourceResponse = Record<string, any> & {
    id?: string;
    loading: boolean;
    setLoading: (value: boolean) => void;
    loadingWrapper: (fn: () => void) => void;
    errors: Record<string, any>;
    setErrors: (value: Record<string, any>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleErrors: (error: any) => void;
    resource: any;
    resources: any[];
    setResource: (value: any) => void;
    setResources: (value: any[]) => void;
    findOne: (id: ID) => any | null;
    findMany: (queryParams?: QueryParamsType) => void;
    reloadMany: () => Promise<any>;
    save: (resource: any) => any;
    update: (resource: any) => any;
    create: (resource: any) => any;
    destroy: (id: ID) => Promise<any>;
    updateMany: (ids: ID[], data: any) => Promise<any>;
    deleteMany: (ids: ID[]) => void;
    publish: (ids: ID[]) => Promise<any>;
    unpublish: (id: ID[]) => Promise<any>;
    addAttachment: (id: ID, fieldName: string, attachmentId: ID) => any;
    removeAttachment: (id: ID, fieldName: string) => any;
    updatePositions: (sorted: any[]) => Promise<any>;
    query: QueryParamsType;
    setQuery: (params: QueryParamsType) => void;
    meta: Record<string, any>;
    page: number;
    perPage: number;
    numPages: number;
    totalCount: number;
    sort: (sortBy: string, sortDirection: 'asc' | 'desc' | null) => Promise<any>;
    paginate: (page: number) => Promise<any>;
    loadMore: () => void;
};
export type UseResourceContextResponse = UseResourceResponse & {
    openShowModal: boolean;
    setOpenShowModal: (value: boolean) => void;
    openEditModal: boolean;
    setOpenEditModal: (value: boolean) => void;
    openDeleteModal: boolean;
    setOpenDeleteModal: (value: boolean) => void;
};
export type FilterFieldType = {
    [field: string]: {
        [operator in OperatorType]?: string | number;
    };
};
export type FilterType = FilterFieldType[];
export type QueryParamsType = {
    keywords?: string | null;
    filters?: FilterType[];
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    rest?: any;
};
export type QueryURLParamsType = {
    order?: string;
    keywords?: string;
    filters?: string;
    page?: number;
    per_page?: number;
};
export type FilterOperatorType = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago' | 'current_year' | '1_day' | '7_days' | '14_days' | '30_days' | '60_days' | '90_days' | 'next_year';
export type OptionType = {
    label: string;
    value: string | number;
    icon?: string;
};
export type FindManyOptionType = {
    loadMore?: boolean;
};
export type LoadingWrapperResponseType = {
    data: any;
    loading: boolean;
    delayedLoading: boolean;
    errors: any;
    loadingWrapper: (fn: () => void) => void;
};
