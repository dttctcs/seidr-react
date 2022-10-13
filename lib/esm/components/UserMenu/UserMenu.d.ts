import { ReactNode } from 'react';
interface UserMenuProps {
    basePath?: string;
    Target?: ReactNode;
    children?: ReactNode;
}
export declare function UserMenu({ basePath, Target, children }: UserMenuProps): JSX.Element;
export {};
