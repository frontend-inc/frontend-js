import { QueryParamsType } from '../types';
type UseFindManyParams = {
    url: string;
    query: QueryParamsType;
};
declare const useFindMany: (params: UseFindManyParams) => {
    isLoading: boolean;
    data: any;
    error: any;
    mutate: import("swr/dist/_internal").KeyedMutator<any>;
    resources: any;
    meta: any;
    page: any;
    perPage: any;
    totalCount: any;
    numPages: any;
};
export default useFindMany;
