import {Float32BufferAttribute} from 'three';
import {BaseSopOperation} from '@polygonjs/polygonjs/dist/src/engine/operations/sop/_Base';
import {DefaultOperationParams} from '@polygonjs/polygonjs/dist/src/core/operations/_Base';
import {CoreGroup, Object3DWithGeometry} from '@polygonjs/polygonjs/dist/src/core/geometry/Group';
import {InputCloneMode} from '@polygonjs/polygonjs/dist/src/engine/poly/InputCloneMode';

import './geo-ambient-occlusion';
import geoao from 'geo-ambient-occlusion';

interface OcclusionSopParams extends DefaultOperationParams {
	attribName: string;
	samples: number;
	bufferResolution: number;
	bias: number;
}

export class OcclusionSopOperation extends BaseSopOperation {
	static override readonly DEFAULT_PARAMS: OcclusionSopParams = {
		attribName: 'occlusion',
		samples: 256,
		bufferResolution: 512,
		bias: 0.01,
	};
	static override readonly INPUT_CLONED_STATE = InputCloneMode.FROM_NODE;
	static override type(): Readonly<'occlusion'> {
		return 'occlusion';
	}
	override cook(inputCoreGroups: CoreGroup[], params: OcclusionSopParams) {
		const coreGroup = inputCoreGroups[0];
		const objects = coreGroup.threejsObjectsWithGeo();

		for (const object of objects) {
			this._processOcclusionOnObject(object, params);
		}

		return coreGroup;
	}

	private _processOcclusionOnObject(object: Object3DWithGeometry, params: OcclusionSopParams) {
		const geometry = object.geometry
		if (!geometry) {
			return;
		}

		const position_array = geometry.attributes.position.array;
		const normal_array = geometry.attributes.normal.array;
		const index_array = geometry.getIndex()?.array;
		const aoSampler = geoao(position_array, {
			cells: index_array,
			normals: normal_array,
			resolution: params.bufferResolution,
			bias: params.bias,
		});

		for (let i = 0; i < params.samples; i++) {
			aoSampler.sample();
		}
		const ao = aoSampler.report();

		geometry.setAttribute(params.attribName, new Float32BufferAttribute(ao, 1));

		aoSampler.dispose();
	}
}
