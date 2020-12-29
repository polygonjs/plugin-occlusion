import {Poly} from 'polygonjs-engine/src/engine/Poly';
import {CATEGORY_SOP} from 'polygonjs-engine/src/engine/poly/registers/nodes/Category';

import {ExtendedGeoNodeChildrenMap} from './ExtendedGeoNodeChildrenMap';
export {ExtendedGeoNodeChildrenMap};

import {OcclusionSopNode} from './engine/nodes/sop/Occlusion';
export function PolygonjsPluginOcclusionRegister(poly: Poly) {
	poly.registerNode(OcclusionSopNode, CATEGORY_SOP.RENDER);
}
