import { QueryParamsType } from '../types';
type QueryParams = {
    query: QueryParamsType;
};
declare const useQueryContext: (params: QueryParams) => {
    loading: any;
    errors: any;
    data: any;
    resources: any;
    meta: any;
    page: any;
    perPage: any;
    numPages: any;
    totalCount: any;
};
export default useQueryContext;
