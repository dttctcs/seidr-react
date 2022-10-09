import { AuthState } from './types';
export declare function useProvideInfo(baseUrl: string, auth: AuthState): {
    info: null;
    loading: boolean;
    error: {
        error: string;
        message: string;
    };
};
