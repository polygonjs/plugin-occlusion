import {PolyEngine} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {CATEGORY_SOP} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Category';

import {OcclusionSopOperation} from './engine/operations/sop/Occlusion';
import {OcclusionSopNode} from './engine/nodes/sop/Occlusion';
import {PolyPlugin} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/plugins/Plugin';
function PolygonjsPluginOcclusion(poly: PolyEngine) {
	poly.registerOperation(OcclusionSopOperation);
	poly.registerNode(OcclusionSopNode, CATEGORY_SOP.RENDER);
}
export const polyPluginOcclusion = new PolyPlugin('occlusion', PolygonjsPluginOcclusion, {
	libraryName: '@polygonjs/plugin-occlusion',
});
