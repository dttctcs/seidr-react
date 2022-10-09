import { UserUpdate } from './types';
export declare function useProvideAuth(baseURL: string): {
    user: any;
    loading: any;
    error: any;
    signin: ({ username, password }: {
        username: string;
        password: string;
    }) => Promise<void>;
    signout: () => Promise<void>;
    update: (data: UserUpdate) => Promise<void>;
    resetPassword: (password: string) => Promise<void>;
};
