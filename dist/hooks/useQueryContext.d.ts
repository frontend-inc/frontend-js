type UseQueryParams = {
    loadMore?: boolean;
};
declare const useQueryContext: (params: UseQueryParams) => {
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
