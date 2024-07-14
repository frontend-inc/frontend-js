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
export declare type OperatorType = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'include' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago';
export declare type QueryOptionsType = {
    url: string;
};
export declare type MutateOptionsType = {
    url: string;
    name?: string;
};
export declare type QueryManyOptionsType = {
    url: string;
    loadMore?: boolean;
};
export declare type ResourceType = Record<string, any> & {
    id?: number | string;
};
export declare type ID = string | number;
export declare type PageInfoType = {
    page: number;
    perPage: number;
    numPages: number;
    totalCount: number;
};
export declare type UseResourceResponse = Record<string, any> & {
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
    findMany: (queryParams?: QueryParamsType, options?: FindManyOptionType) => Promise<any>;
    reloadMany: () => Promise<any>;
    save: (resource: any) => any;
    update: (resource: any) => any;
    create: (resource: any) => any;
    destroy: (id: ID) => Promise<any>;
    updateMany: (ids: ID[], data: any) => Promise<any>;
    deleteMany: (ids: ID[]) => void;
    publish: (ids: ID[]) => Promise<any>;
    unpublish: (id: ID[]) => Promise<any>;
    addLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
    removeLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
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
export declare type UseResourceContextResponse = UseResourceResponse & {
    openShowModal: boolean;
    setOpenShowModal: (value: boolean) => void;
    openEditModal: boolean;
    setOpenEditModal: (value: boolean) => void;
    openDeleteModal: boolean;
    setOpenDeleteModal: (value: boolean) => void;
};
export declare type FilterFieldType = {
    [field: string]: {
        [operator in OperatorType]?: string | number;
    };
};
export declare type FilterType = {
    AND?: FilterFieldType[];
    OR?: FilterFieldType[];
};
export declare type QueryParamsType = {
    keywords?: string | null;
    filters?: FilterType | Record<string, any>;
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    current_user?: boolean;
    current_team?: boolean;
    belongs_to?: number;
    similar_to?: number;
    location?: string;
    radius?: number;
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
export declare type FindManyOptionType = {
    loadMore?: boolean;
};
export declare type LoadingWrapperResponseType = {
    data: any;
    loading: boolean;
    delayedLoading: boolean;
    errors: any;
    loadingWrapper: (fn: () => void) => void;
};