/// <reference types="react" />
import { Settings } from '../types';
interface MainProps {
    settings: Settings;
    hideActions: boolean;
    loading: boolean;
    onSelect: any;
}
export declare function Main({ settings, hideActions, loading, onSelect, }: MainProps): JSX.Element;
export {};
