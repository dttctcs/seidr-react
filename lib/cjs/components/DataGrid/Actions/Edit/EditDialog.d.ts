/// <reference types="react" />
interface EditDialogProps {
    item: any;
    info: any;
    opened: boolean;
    onClose: () => void;
}
export declare function EditDialog({ item, info, opened, onClose }: EditDialogProps): JSX.Element | null;
export {};
