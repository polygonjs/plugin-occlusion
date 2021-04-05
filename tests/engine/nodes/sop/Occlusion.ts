import {PolyScene} from '@polygonjs/polygonjs/dist/src/engine/scene/PolyScene';
import {ExtendedGeoObjNode} from '../../../../src/engine/nodes/obj/ExtendedGeo';

QUnit.test('occlusion simple', async (assert) => {
	const scene = new PolyScene();
	const geo1 = scene.root().createNode('geo') as ExtendedGeoObjNode;

	const box1 = geo1.createNode('box');
	const box2 = geo1.createNode('box');
	const merge1 = geo1.createNode('merge');
	const occlusion1 = geo1.createNode('occlusion');
	occlusion1.p.samples.set(1024);

	box1.p.center.x.set(0.6);
	box2.p.center.x.set(-0.6);

	merge1.setInput(0, box1);
	merge1.setInput(1, box2);
	merge1.p.compact.set(true);
	occlusion1.setInput(0, merge1);

	let container;
	container = await occlusion1.compute();
	let core_group = container.coreContent()!;
	let {geometry} = core_group.objectsWithGeo()[0];

	const occlusion_array = geometry.getAttribute('occlusion').array;

	assert.equal(occlusion_array.length, 48);
	assert.in_delta(occlusion_array[0], 0.2, 0.1);
	assert.in_delta(occlusion_array[24], 0.5, 0.1);
});
