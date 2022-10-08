import { UserUpdate } from './types';
export declare function useProvideAuth(baseURL: any): {
    user: any;
    loading: any;
    error: any;
    signin: ({ username, password }: {
        username: any;
        password: any;
    }) => Promise<void>;
    signout: () => Promise<void>;
    update: (data: UserUpdate) => Promise<void>;
    resetPassword: (password: string) => Promise<void>;
};
//# sourceMappingURL=useProvideAuth.d.ts.map