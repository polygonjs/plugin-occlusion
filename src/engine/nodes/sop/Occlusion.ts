/**
 * Creates a point attribute 'occlusion' that can be used in materials for a more realistic look.
 *
 * @remarks
 * This is based on [https://github.com/wwwtyro/geo-ambient-occlusion](https://github.com/wwwtyro/geo-ambient-occlusion)
 *
 */
/// <reference path="./types/occlusion.d.ts" />
// https://github.com/wwwtyro/geo-ambient-occlusion
import geoao from 'geo-ambient-occlusion';
import {Float32BufferAttribute} from 'three/src/core/BufferAttribute';
import {TypedSopNode} from 'polygonjs-engine/src/engine/nodes/sop/_Base';
import {CoreObject} from 'polygonjs-engine/src/core/geometry/Object';
import {InputCloneMode} from 'polygonjs-engine/src/engine/poly/InputCloneMode';
import {CoreGroup} from 'polygonjs-engine/src/core/geometry/Group';
import {NodeParamsConfig, ParamConfig} from 'polygonjs-engine/src/engine/nodes/utils/params/ParamsConfig';
class OcclusionSopParamsConfig extends NodeParamsConfig {
	/** @param name of the occlusion attribute */
	attrib_name = ParamConfig.STRING('occlusion');
	/** @param number of samples. The more samples the better the result, but the longer the calculation */
	samples = ParamConfig.INTEGER(256, {
		range: [1, 256],
		rangeLocked: [true, false],
	});
	sep = ParamConfig.SEPARATOR();
	/** @param size of buffer used in the calculation */
	buffer_resolution = ParamConfig.INTEGER(512);
	/** @param you may want to tweak this value if you see light bleeding through the object */
	bias = ParamConfig.FLOAT(0.01);
}
const ParamsConfig = new OcclusionSopParamsConfig();

export class OcclusionSopNode extends TypedSopNode<OcclusionSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'occlusion';
	}

	initialize_node() {
		this.io.inputs.set_count(1);
		this.io.inputs.init_inputs_cloned_state(InputCloneMode.FROM_NODE);
		// this.uiData.set_icon('palette');
	}

	async cook(input_contents: CoreGroup[]) {
		const core_group = input_contents[0];
		const core_objects = core_group.core_objects();

		for (let core_object of core_objects) {
			await this._process_occlusion_on_object(core_object);
		}

		this.set_core_group(core_group);
	}

	private async _process_occlusion_on_object(core_object: CoreObject) {
		const geometry = core_object.core_geometry()?.geometry();
		if (!geometry) {
			return;
		}

		const position_array = geometry.attributes.position.array;
		const normal_array = geometry.attributes.normal.array;
		const index_array = geometry.getIndex()?.array;
		const aoSampler = geoao(position_array, {
			cells: index_array,
			normals: normal_array,
			resolution: this.pv.buffer_resolution,
			bias: this.pv.bias,
		});

		for (let i = 0; i < this.pv.samples; i++) {
			aoSampler.sample();
		}
		const ao = aoSampler.report();

		geometry.setAttribute(this.pv.attrib_name, new Float32BufferAttribute(ao, 1));

		aoSampler.dispose();
	}
}
