export declare const DataGridStyles: {
    root: string;
    toolbar: string;
    body: string;
    pagination: string;
    header: string;
};
export declare const applyStyles: (params: void, options?: import("@mantine/core").UseStylesOptions<string> | undefined) => {
    classes: {
        root: string;
        toolbar: string;
        body: string;
        pagination: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/core").MantineTheme;
};
