export declare type ConfigParams = {
    collection?: string;
    path?: string;
};
export declare type FetchOption = {
    method: string;
    headers: Record<string, any>;
    body: any;
};
export declare type ExecuteResponse = {
    meta: any;
    data: any;
    error: any;
};
export declare type QueryProps = {
    url: string;
    name: string;
    skip?: boolean;
};
export declare type Resource = Record<string, any> & {
    id?: string;
};
export declare type PageInfo = {
    page: number;
    per_page: number;
    total_count: number;
    num_pages: number;
};
export declare type MutationParams = {
    url: string;
    name: string;
};
export declare type Option = {
    label: string;
    value: string | number | boolean;
    icon?: string;
};
export declare type Operator = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'include' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago';
export declare type Value = string | number | string[] | number[];
export declare type Filter = {
    [field: string]: {
        [operator in Operator]?: Value;
    };
};
export declare type Filters = {
    AND?: Filter[];
    OR?: Filter[];
};
export declare type QueryParams = {
    sort_by?: string;
    sort_direction?: 'asc' | 'desc' | null;
    keywords?: string | null;
    filters?: Filters | Record<string, any>;
    page?: number | null;
    per_page?: number | null;
    rest?: any;
};
export declare type QueryFilterArrayParams = {
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
    keywords?: string;
    filters?: FilterOption[];
    page?: number;
    per_page?: number;
};
export declare type QueryURLParams = {
    order?: string;
    keywords?: string;
    filters?: string;
    page?: number;
    per_page?: number;
};
export declare type FilterOperator = 'asc' | 'desc' | 'true' | 'false' | 'eq' | 'neq' | 'like' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | '1_day_ago' | '7_days_ago' | '14_days_ago' | '30_days_ago' | '60_days_ago' | '90_days_ago' | 'current_year' | '1_day' | '7_days' | '14_days' | '30_days' | '60_days' | '90_days' | 'next_year';
export declare type FilterWhere = 'AND' | 'OR';
export declare type FilterOption = {
    where: FilterWhere;
    field: string;
    operator: FilterOperator;
    value: any;
};
export declare type SearchFilterInputProps = {
    filter?: FilterOption;
    field?: string;
    label?: string;
    where?: FilterWhere;
    operator?: FilterOperator;
    options?: Option[];
    handleSubmit: (value: any) => void;
};
export declare type User = {
    id?: number;
    first_name?: string;
    last_name?: string;
    email: string;
    token?: string;
    image?: {
        id?: number;
        url?: string;
    };
};
