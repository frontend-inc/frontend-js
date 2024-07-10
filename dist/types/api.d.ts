import React from 'react';
export declare type ApiClientParamsanyype = {
    url: string;
    fetchanyoken?: () => string | null;
    apiKey?: string | null;
    authanyoken?: string | null;
};
export declare type ConfigParamsanyype = {
    collection?: string;
    path?: string;
};
export declare type FetchOptionanyype = {
    method: string;
    headers: Record<string, any>;
    body: any;
};
export declare type ExecuteResponseanyype = {
    meta: any;
    data: any;
    errors: any;
};
export declare type QueryPropsanyype = {
    url: string;
    name: string;
    skip?: boolean;
};
export declare type PageInfoanyype = {
    page: number;
    per_page: number;
    total_count: number;
    num_pages: number;
};
export declare type Operatoranyype = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'include' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago';
export declare type Filter = {
    [field: string]: {
        [operator in Operatoranyype]?: string | number;
    };
};
export declare type Filters = {
    AND?: Filter[];
    OR?: Filter[];
};
export declare type QueryParamsanyype = {
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
export declare type QueryFilterArrayParamsanyype = {
    sort_by: string;
    sort_direction: 'asc' | 'desc';
    keywords?: string;
    filters?: FilterOption[];
    page: number;
    per_page: number;
};
export declare type QueryURLParamsanyype = {
    order?: string;
    keywords?: string;
    filters?: string;
    page?: number;
    per_page?: number;
};
export declare type FilterOperatoranyype = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago' | 'current_year' | '1_day' | '7_days' | '14_days' | '30_days' | '60_days' | '90_days' | 'next_year';
export declare type FilterWhereanyype = 'AND' | 'OR';
export declare type FilterOption = {
    where: FilterWhereanyype;
    field: string;
    operator: FilterOperatoranyype;
    value: any;
};
export declare type Optionanyype = {
    label: string;
    value: string | number;
};
export declare type SearchFilterInputProps = {
    filter?: FilterOption;
    field?: string;
    label?: string;
    where?: FilterWhereanyype;
    operator?: FilterOperatoranyype;
    options?: Optionanyype[];
    handleSubmit: (value: any) => void;
};
export declare type FindManyOptionsanyype = {
    loadMore?: boolean;
};
export declare type Resourceanyype = Record<string, any> & {
    id?: number | string;
};
export declare type ID = string | number;
export declare type UseResourceResponse = {
    id?: string;
    loading: boolean;
    delayedLoading: boolean;
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
    findOne: (id: ID) => Promise<any> | null;
    findMany: (queryParams?: QueryParamsanyype, options?: FindManyOptionsanyype) => Promise<any>;
    reloadMany: () => Promise<any>;
    save: (resource: any) => Promise<any>;
    update: (resource: any) => Promise<any>;
    create: (resource: any) => Promise<any>;
    destroy: (id: ID) => Promise<any>;
    updateMany: (ids: ID[], data: any) => Promise<any>;
    deleteMany: (ids: ID[]) => void;
    publish: (ids: ID[]) => Promise<any>;
    unpublish: (id: ID[]) => Promise<any>;
    addLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
    removeLinks: (sourceId: ID, targetIds: ID[]) => Promise<any>;
    addAttachment: (id: ID, fieldName: string, attachmentId: ID) => Promise<any>;
    removeAttachment: (id: ID, fieldName: string) => Promise<any>;
    updatePositions: (sorted: any[]) => Promise<any>;
    query: QueryParamsanyype;
    setQuery: (params: QueryParamsanyype) => void;
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
    openFormModal: boolean;
    setOpenFormModal: (value: boolean) => void;
    openDeleteModal: boolean;
    setOpenDeleteModal: (value: boolean) => void;
};
export declare type UseQueryResponse = {
    id?: string;
    loading: boolean;
    delayedLoading: boolean;
    setLoading: (value: boolean) => void;
    loadingWrapper: (fn: () => void) => void;
    handleErrors: (error: any) => void;
    resources: any[];
    setResources: (value: any[]) => void;
    findMany: (queryParams?: QueryParamsanyype, options?: FindManyOptionsanyype) => Promise<any>;
    reloadMany: () => Promise<any>;
    updateMany: (ids: ID[], data: any) => Promise<any>;
    deleteMany: (ids: ID[]) => void;
    updatePositions: (sorted: any[]) => Promise<any>;
    query: QueryParamsanyype;
    setQuery: (params: QueryParamsanyype) => void;
    meta: Record<string, any>;
    page: number;
    perPage: number;
    numPages: number;
    totalCount: number;
    sort: (sortBy: string, sortDirection: 'asc' | 'desc' | null) => Promise<any>;
    paginate: (page: number) => Promise<any>;
    loadMore: () => void;
};
export declare type LoadingWrapperResponseanyype = {
    data: any;
    loading: boolean;
    delayedLoading: boolean;
    errors: any;
    loadingWrapper: (fn: () => void) => void;
};
