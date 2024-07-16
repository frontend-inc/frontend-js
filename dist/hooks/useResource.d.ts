import { QueryParamsType, UseResourceResponse } from '../types';
type UseResourceParams = {
    url: string;
    name?: string;
    query?: QueryParamsType;
};
declare const useResource: (params: UseResourceParams) => UseResourceResponse;
export default useResource;
