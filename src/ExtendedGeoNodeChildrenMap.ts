import {GeoNodeChildrenMap} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Sop';
import {OcclusionSopNode} from './engine/nodes/sop/Occlusion';

export interface ExtendedGeoNodeChildrenMap extends GeoNodeChildrenMap {
	occlusion: OcclusionSopNode;
}
