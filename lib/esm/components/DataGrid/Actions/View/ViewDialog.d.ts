/// <reference types="react" />
interface ViewDialogProps {
    item: any;
    info: any;
    loading: boolean;
    opened: boolean;
    onClose: () => void;
}
export declare function ViewDialog({ item, info, loading, opened, onClose }: ViewDialogProps): JSX.Element;
export {};
