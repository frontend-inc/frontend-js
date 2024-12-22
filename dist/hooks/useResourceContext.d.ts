import { UseResourceResponse } from '../types';
type UseResourceContextResponse = UseResourceResponse & {
    openShow: boolean;
    setOpenShow: (value: boolean) => void;
    openEdit: boolean;
    setOpenEdit: (value: boolean) => void;
    openDelete: boolean;
    setOpenDelete: (value: boolean) => void;
};
declare const useResourceContext: () => UseResourceContextResponse;
export default useResourceContext;
