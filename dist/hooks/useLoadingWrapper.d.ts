declare const useLoadingWrapper: () => {
    data: any;
    loading: any;
    errors: any;
    loadingWrapper: (fn: any) => Promise<any>;
};
export default useLoadingWrapper;
