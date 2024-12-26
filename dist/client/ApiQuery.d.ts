import { QueryParamsType, FilterType } from '../types';
export declare class ApiQuery {
    private _sort_by?;
    private _sort_direction?;
    private _keywords?;
    private _filters?;
    private _page?;
    private _per_page?;
    private _params?;
    constructor(params?: QueryParamsType);
    set page(value: number);
    set per_page(value: number);
    get page(): number;
    get per_page(): number;
    set keywords(value: string);
    get keywords(): string;
    get filters(): FilterType[];
    set filters(value: FilterType[]);
    get sort_by(): string;
    set sort_by(value: string);
    set sort_direction(value: string);
    get sort_direction(): string;
    where(searchParams: QueryParamsType): ApiQuery;
    filter(filters: FilterType[]): ApiQuery;
    sort(field: string, direction?: string | null): ApiQuery;
    search(query: string): ApiQuery;
    eq(field: string, value: string | number): ApiQuery;
    neq(field: string, value: string | number): ApiQuery;
    gt(field: string, value: string | number): ApiQuery;
    gte(field: string, value: string | number): ApiQuery;
    lt(field: string, value: string | number): ApiQuery;
    lte(field: string, value: string | number): ApiQuery;
    in(field: string, value: string | number): ApiQuery;
    nin(field: string, value: string | number): ApiQuery;
    addFilter(filter: FilterType | any): ApiQuery;
    url(): string;
    parseURL(routerParams?: any): this;
    query(): {
        keywords: string;
        page: number;
        per_page: number;
        sort_by: string;
        sort_direction: string;
        filters: FilterType[];
    };
    isValidFilter: (filter: any) => boolean;
}
