import { UseResourceResponse } from '../types';
declare type UseListResponse = UseResourceResponse & {
    openShow: boolean;
    setOpenShow: (value: boolean) => void;
    openEdit: boolean;
    setOpenEdit: (value: boolean) => void;
    openDelete: boolean;
    setOpenDelete: (value: boolean) => void;
};
declare const useList: () => UseListResponse;
export default useList;
