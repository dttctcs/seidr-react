import React from 'react';
import { Relation } from '../../../SeidrApiProvider/types';
interface RelationPanelProps extends Relation {
    relatedPath: string;
}
declare function RelationPanel({ relatedPath, ...relation }: RelationPanelProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof RelationPanel>;
export default _default;
