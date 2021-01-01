import {Poly} from 'polygonjs-engine/src/engine/Poly';
import {CATEGORY_SOP} from 'polygonjs-engine/src/engine/poly/registers/nodes/Category';

import {ExtendedGeoNodeChildrenMap} from './ExtendedGeoNodeChildrenMap';
export {ExtendedGeoNodeChildrenMap};

import {OcclusionSopOperation} from './core/operations/sop/Occlusion';
import {OcclusionSopNode} from './engine/nodes/sop/Occlusion';
import {PolyPlugin} from 'polygonjs-engine/src/engine/poly/registers/plugins/Plugin';
function PolygonjsPluginOcclusion(poly: Poly) {
	poly.registerOperation(OcclusionSopOperation);
	poly.registerNode(OcclusionSopNode, CATEGORY_SOP.RENDER);
}
export const polyPluginOcclusion = new PolyPlugin('occlusion', PolygonjsPluginOcclusion, {
	libraryName: 'polygonjs-plugin-occlusion',
});
