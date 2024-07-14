import { QueryParamsType } from '../types';
type UseQueryParams = {
    url: string;
    query: QueryParamsType;
};
declare const useQueryContext: (params: UseQueryParams) => {
    loading: any;
    errors: any;
    resources: any;
    meta: any;
    page: any;
    perPage: any;
    numPages: any;
    totalCount: any;
};
export default useQueryContext;
