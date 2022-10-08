import React from 'react';
import { Settings as SettingsType } from '../types';
interface ToolbarProps {
    settings: SettingsType;
    dispatch: any;
    hideFilter: boolean;
    hideSettings: boolean;
    dense: boolean;
}
export declare const Toolbar: React.NamedExoticComponent<ToolbarProps>;
export {};
