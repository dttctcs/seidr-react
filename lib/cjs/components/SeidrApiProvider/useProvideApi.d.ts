import { QueryParams, Relation, Api } from './types';
export interface UseProvideApiProps {
    /** The Seidr path to interact with */
    path?: string;
    /** Initial QueryParams */
    initialQueryParams?: QueryParams;
    /** A base filter to apply (Currently used in the context of RelatedAPIs) */
    relation?: Relation;
}
export declare function useProvideApi(props: UseProvideApiProps): Api;
