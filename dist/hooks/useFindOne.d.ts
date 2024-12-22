type UseFindOneParams = {
    id: number | string;
    url: string;
};
declare const useFindOne: (params: UseFindOneParams) => {
    isLoading: boolean;
    data: any;
    error: any;
    resource: any;
    mutate: import("swr/dist/_internal").KeyedMutator<any>;
};
export default useFindOne;
