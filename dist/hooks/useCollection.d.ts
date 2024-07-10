import { UseResourceResponse } from '../types';
declare type UseCollectionResponse = UseResourceResponse & {
    openShow: boolean;
    setOpenShow: (value: boolean) => void;
    openEdit: boolean;
    setOpenEdit: (value: boolean) => void;
    openDelete: boolean;
    setOpenDelete: (value: boolean) => void;
};
declare const useCollection: () => UseCollectionResponse;
export default useCollection;
