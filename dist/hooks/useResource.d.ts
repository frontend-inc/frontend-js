import { ResourceResponse } from '../types';
declare type UseResourceParams = {
    url?: string;
    name?: string;
};
declare const useResource: (params: UseResourceParams) => ResourceResponse;
export default useResource;
