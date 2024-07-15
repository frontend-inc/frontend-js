import { ID, QueryParamsType, UseResourceResponse } from '../types';
type UseResourceParams = {
    id?: ID;
    url: string;
    name: string;
    query?: QueryParamsType;
    options?: {
        infiniteLoad?: boolean;
    };
};
declare const useResource: (params: UseResourceParams) => UseResourceResponse;
export default useResource;
