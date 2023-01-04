import 'overlayscrollbars/overlayscrollbars.css';
import React from 'react';
export declare const ScrollArea: React.ForwardRefExoticComponent<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    element?: "div" | undefined;
    options?: false | {
        paddingAbsolute?: boolean | undefined;
        showNativeOverlaidScrollbars?: boolean | undefined;
        update?: {
            elementEvents?: [elementSelector: string, eventNames: string][] | null | undefined;
            debounce?: number | [timeout: number, maxWait: number] | null | undefined;
            attributes?: string[] | null | undefined;
            ignoreMutation?: ((mutation: MutationRecord) => any) | null | undefined;
        } | undefined;
        overflow?: {
            x?: import("overlayscrollbars").OverflowBehavior | undefined;
            y?: import("overlayscrollbars").OverflowBehavior | undefined;
        } | undefined;
        scrollbars?: {
            theme?: string | null | undefined;
            visibility?: import("overlayscrollbars").ScrollbarsVisibilityBehavior | undefined;
            autoHide?: import("overlayscrollbars").ScrollbarsAutoHideBehavior | undefined;
            autoHideDelay?: number | undefined;
            dragScroll?: boolean | undefined;
            clickScroll?: boolean | undefined;
            pointers?: string[] | null | undefined;
        } | undefined;
    } | null | undefined;
    events?: false | {
        initialized?: ((instance: import("overlayscrollbars").OverlayScrollbars) => void) | ((instance: import("overlayscrollbars").OverlayScrollbars) => void)[] | null | undefined;
        updated?: ((instance: import("overlayscrollbars").OverlayScrollbars, onUpdatedArgs: import("overlayscrollbars").OnUpdatedEventListenerArgs) => void) | ((instance: import("overlayscrollbars").OverlayScrollbars, onUpdatedArgs: import("overlayscrollbars").OnUpdatedEventListenerArgs) => void)[] | null | undefined;
        destroyed?: ((instance: import("overlayscrollbars").OverlayScrollbars, canceled: boolean) => void) | ((instance: import("overlayscrollbars").OverlayScrollbars, canceled: boolean) => void)[] | null | undefined;
        scroll?: ((instance: import("overlayscrollbars").OverlayScrollbars, event: Event) => void) | ((instance: import("overlayscrollbars").OverlayScrollbars, event: Event) => void)[] | null | undefined;
    } | null | undefined;
    defer?: boolean | IdleRequestOptions | undefined;
} & React.RefAttributes<HTMLInputElement>>;
