/**
 * Creates a point attribute 'occlusion' that can be used in materials for a more realistic look.
 *
 * @remarks
 * This is using [https://github.com/wwwtyro/geo-ambient-occlusion](https://github.com/wwwtyro/geo-ambient-occlusion)
 *
 */
import {TypedSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/_Base';
import {CoreGroup} from '@polygonjs/polygonjs/dist/src/core/geometry/Group';
import {OcclusionSopOperation} from '../../operations/sop/Occlusion';
import {NodeParamsConfig, ParamConfig} from '@polygonjs/polygonjs/dist/src/engine/nodes/utils/params/ParamsConfig';

const DEFAULT = OcclusionSopOperation.DEFAULT_PARAMS;
class OcclusionSopParamsConfig extends NodeParamsConfig {
	/** @param name of the occlusion attribute */
	attribName = ParamConfig.STRING(DEFAULT.attribName);
	/** @param number of samples. The more samples the better the result, but the longer the calculation */
	samples = ParamConfig.INTEGER(DEFAULT.samples, {
		range: [1, 1024],
		rangeLocked: [true, false],
		separatorAfter: true,
	});
	/** @param size of buffer used in the calculation */
	bufferResolution = ParamConfig.INTEGER(DEFAULT.bufferResolution, {
		range: [1, 2048],
		rangeLocked: [true, false],
	});
	/** @param you may want to tweak this value if you see light bleeding through the object */
	bias = ParamConfig.FLOAT(DEFAULT.bias, {
		range: [0, 0.1],
		rangeLocked: [true, false],
		step: 0.001,
	});
}
const ParamsConfig = new OcclusionSopParamsConfig();

export class OcclusionSopNode extends TypedSopNode<OcclusionSopParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return 'occlusion';
	}

	override initializeNode() {
		this.io.inputs.setCount(1);
		this.io.inputs.initInputsClonedState(OcclusionSopOperation.INPUT_CLONED_STATE);
	}

	private _operation: OcclusionSopOperation | undefined;
	override cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new OcclusionSopOperation(this._scene, this.states);
		const core_group = this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}
}
