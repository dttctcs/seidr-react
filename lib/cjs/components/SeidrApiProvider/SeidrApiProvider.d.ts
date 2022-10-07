import { ReactNode } from 'react';
import { QueryParams, Relation, Api } from './types';
export declare function useApi(): Api | undefined;
export interface SeidrApiProviderProps {
    path?: string;
    relation?: Relation;
    initialQueryParams?: QueryParams;
    children: ReactNode;
}
export declare function SeidrApiProvider({ path, initialQueryParams, relation, children }: SeidrApiProviderProps): JSX.Element;
//# sourceMappingURL=SeidrApiProvider.d.ts.map