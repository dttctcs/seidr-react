export declare function createFetchParams({ path, method, body, queryParams, }: {
    path: string;
    method: string;
    body?: any;
    queryParams?: Record<string, string>;
}): {
    fetchPath: string;
    options: RequestInit;
};
