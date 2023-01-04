/// <reference types="react" />
interface AlertDialogPorps {
    opened: boolean;
    onClose: any;
    handleAccept: any;
    handleReject: any;
}
export declare function AlertDialog({ opened, onClose, handleAccept, handleReject }: AlertDialogPorps): JSX.Element;
export {};
