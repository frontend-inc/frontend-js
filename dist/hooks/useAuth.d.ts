import { UserType } from '../types';
declare const useAuth: () => {
    loading: boolean;
    delayedLoading: any;
    errors: Record<string, any>;
    user: any;
    setUser: (value: any) => void;
    currentUser: any;
    setCurrentUser: any;
    fetchMe: () => Promise<void>;
    updateMe: (user: UserType) => Promise<any>;
    forgotPassword: (user: UserType) => Promise<any>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    authenticateFromToken: (token: string) => Promise<void>;
    reloadMe: () => Promise<any>;
    login: (user: UserType) => Promise<any>;
    logout: () => Promise<void>;
    signup: (user: UserType) => Promise<any>;
    changePassword: (currentPassword: string, password: string, passwordConfirmation: string) => Promise<any>;
    resetPassword: (email: string, password: string, passwordConfirmation: string, changePasswordToken: string) => Promise<any>;
    sendPin: (user: UserType) => Promise<any>;
    verifyPin: (email: string, pin: string) => Promise<any>;
    sendOneTimePassword: (user: UserType) => Promise<any>;
    verifyOneTimePassword: (otp: string) => Promise<any>;
    googleLogin: (accessToken: string) => Promise<any>;
    deleteAvatar: () => Promise<any>;
    loadingWrapper: (apiMethod: () => any) => Promise<any>;
    authenticated: any;
    token: any;
    setToken: any;
    authCookie: any;
};
export default useAuth;
