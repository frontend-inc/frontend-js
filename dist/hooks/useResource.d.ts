import { UseResourceResponse } from '../types';
declare type UseResourceParams = {
    url?: string;
    name?: string;
};
declare const useResource: (params: UseResourceParams) => UseResourceResponse;
export default useResource;
