import { User } from '../types';
declare const useAuth: () => {
    loading: boolean;
    errors: Record<string, any>;
    authCookie: any;
    user: import("../types").Resource;
    setUser: (value: import("../types").Resource) => void;
    currentUser: any;
    setCurrentUser: any;
    fetchMe: () => Promise<any>;
    updateMe: (user: User) => Promise<any>;
    forgotPassword: (user: User) => Promise<any>;
    handleChange: (e: any) => void;
    authenticateFromToken: (token: string) => Promise<void>;
    login: (user: User) => Promise<any>;
    logout: () => Promise<void>;
    signup: (user: User) => Promise<any>;
    changePassword: (currentPassword: string, password: string, passwordConfirmation: string) => Promise<any>;
    resetPassword: (email: string, password: string, passwordConfirmation: string, changePasswordToken: string) => Promise<any>;
    sendPin: (user: User) => Promise<any>;
    verifyPin: (email: string, pin: string) => Promise<any>;
    sendOneTimePassword: (user: User) => Promise<any>;
    verifyOneTimePassword: (otp: string) => Promise<any>;
    googleLogin: (user: any) => Promise<any>;
    deleteAvatar: () => Promise<any>;
    loadingWrapper: (apiMethod: () => any) => Promise<any>;
};
export default useAuth;
