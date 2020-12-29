import {Poly} from 'polygonjs-engine/src/engine/Poly';
import {CATEGORY_SOP} from 'polygonjs-engine/src/engine/poly/registers/nodes/Category';
import {GeoNodeChildrenMap} from 'polygonjs-engine/src/engine/poly/registers/nodes/Sop';
import {OcclusionSopNode} from './engine/nodes/sop/Occlusion';

export interface ExtendedGeoNodeChildrenMap extends GeoNodeChildrenMap {
	occlusion: OcclusionSopNode;
}
export function PolygonjsPluginOcclusionRegister(poly: Poly) {
	poly.registerNode(OcclusionSopNode, CATEGORY_SOP.RENDER);
}
