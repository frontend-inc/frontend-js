interface UseDelayedLoadingProps {
    loading: boolean;
    delay?: number;
    callback?: () => void;
}
declare function useDelayedLoading({ loading, delay, callback, }: UseDelayedLoadingProps): Record<any, boolean>;
export default useDelayedLoading;
