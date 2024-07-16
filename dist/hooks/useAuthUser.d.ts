type UseAuthUserParams = {
    url: string;
};
declare const useAuthUser: (params: UseAuthUserParams) => {
    currentUser: any;
    isLoading: boolean;
};
export default useAuthUser;
