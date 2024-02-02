declare type ResourceProps = {
    url?: string;
    name?: string;
};
declare const useResource: (props: ResourceProps) => Record<string, any>;
export default useResource;
