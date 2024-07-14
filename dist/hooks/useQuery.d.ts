import { QueryParamsType } from '../types';
declare const useQuery: (url: string, query: QueryParamsType) => {
    loading: any;
    errors: any;
    resources: any;
    meta: any;
    page: any;
    perPage: any;
    numPages: any;
    totalCount: any;
};
export default useQuery;
