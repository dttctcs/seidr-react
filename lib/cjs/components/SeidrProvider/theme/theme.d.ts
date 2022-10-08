export declare const THEME: {
    primaryColor: string;
    components: {
        Tooltip: {
            styles: (theme: any) => {
                body: {
                    padding: number;
                    paddingTop: number;
                    paddingBottom: number;
                    fontSize: any;
                    backgroundColor: any;
                };
            };
            defaultProps: {
                position: string;
                transition: string;
                openDelay: number;
            };
        };
        Modal: {
            styles: {
                title: {
                    fontWeight: number;
                };
            };
        };
        ActionIcon: {
            styles: (theme: any) => {
                hover: {
                    color: any;
                };
            };
        };
    };
};
export declare const MUI_THEME: import("@mui/material/styles").Theme;
//# sourceMappingURL=theme.d.ts.map