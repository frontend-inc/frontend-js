import { QueryParamsType } from '../types';
type UseQueryParams = {
    url: string;
    query: QueryParamsType;
};
declare const useQuery: (params: UseQueryParams) => {
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
export default useQuery;
