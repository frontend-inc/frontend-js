import { UseResourceResponse } from '../types';
type UseResourceParams = {
    url: string;
    name?: string;
};
declare const useResource: (params: UseResourceParams) => UseResourceResponse;
export default useResource;
