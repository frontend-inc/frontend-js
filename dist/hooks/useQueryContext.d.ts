import { QueryParamsType } from '../types';
declare const useQueryContext: () => {
    loading: any;
    errors: any;
    data: any;
    findMany: (query: QueryParamsType, opts: any) => Promise<any>;
    resources: any;
    meta: any;
    page: any;
    perPage: any;
    numPages: any;
    totalCount: any;
};
export default useQueryContext;
