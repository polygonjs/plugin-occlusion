import 'qunit';
import {PolyScene} from 'polygonjs-engine/src/engine/scene/PolyScene';
import {ObjectsManagerNode} from 'polygonjs-engine/src/engine/nodes/manager/ObjectsManager';
import {PerspectiveCameraObjNode} from 'polygonjs-engine/src/engine/nodes/obj/PerspectiveCamera';
import {MaterialsObjNode} from 'polygonjs-engine/src/engine/nodes/obj/Materials';
import {PostProcessObjNode} from 'polygonjs-engine/src/engine/nodes/obj/PostProcess';
import {CopObjNode} from 'polygonjs-engine/src/engine/nodes/obj/Cop';

import {Poly} from 'polygonjs-engine/src/engine/Poly';
import {ExtendedGeoObjNode} from '../../src/engine/nodes/sop/obj/ExtendedGeo';

import './assertions';

// window.create_renderer_if_none = () => {
// 	const first_renderer = POLY.renderers_controller.first_renderer();
// 	if (!first_renderer) {
// 		const renderer = new WebGLRenderer();
// 		POLY.renderers_controller.register_renderer(renderer);
// 	}
// };
declare global {
	interface Window {
		// create_renderer_if_none: () => void;
		scene: PolyScene;
		root: ObjectsManagerNode;
		perspective_camera1: PerspectiveCameraObjNode;
		geo1: ExtendedGeoObjNode;
		MAT: MaterialsObjNode;
		POST: PostProcessObjNode;
		COP: CopObjNode;
	}
}
QUnit.testStart(async () => {
	// return new Promise(async (resolve, reject) => {
	window.scene = new PolyScene();
	window.scene.setName('test scene');
	window.scene.setUuid('test');
	Poly.instance().set_env('test');

	window.scene.loading_controller.mark_as_loading();
	window.scene.cooker.block();
	const root = window.scene.root;
	window.root = root;
	window.perspective_camera1 = root.createNode('perspectiveCamera');
	window.geo1 = root.createNode('geo') as ExtendedGeoObjNode;
	window.MAT = root.createNode('materials');
	window.MAT.setName('MAT');
	window.POST = root.createNode('postProcess');
	window.POST.setName('POST');
	window.COP = root.createNode('cop');
	window.COP.setName('COP');

	window.scene.loading_controller.set_auto_update(true);
	await window.scene.loading_controller.mark_as_loaded();
	window.scene.cooker.unblock();
});
