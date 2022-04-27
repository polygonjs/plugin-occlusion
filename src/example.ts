import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {PolyScene} from '@polygonjs/polygonjs/dist/src/engine/scene/PolyScene';
import {ExtendedGeoObjNode} from './engine/nodes/obj/ExtendedGeo';

// register all nodes
// import {AllRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/All';
import {AllAssemblersRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/assemblers/All';
AllAssemblersRegister.run(Poly);
import {AllCamerasRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/cameras/All';
import {AllExpressionsRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/expressions/All';
AllCamerasRegister.run(Poly);
AllExpressionsRegister.run(Poly);
import {GeoObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/Geo';
import {AddSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Add';
import {MaterialSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Material';
import {TextSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Text';
import {TransformSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Transform';
import {CopySopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Copy';
import {MaterialsNetworkObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/MaterialsNetwork';
import {MaterialsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/MaterialsNetwork';
import {MeshLambertMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshLambert';
import {HemisphereLightObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/HemisphereLight';
import {CopNetworkObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/CopNetwork';
import {WebCamCopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/cop/WebCam';
import {MeshBasicMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshBasic';
import {BoxSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Box';
import {EventsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/EventsNetwork';
import {PerspectiveCameraObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/PerspectiveCamera';
import {CameraOrbitControlsEventNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/event/CameraOrbitControls';
import {SphereSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Sphere';
import {PlaneSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Plane';
import {MergeSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Merge';
import {MeshBasicBuilderMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshBasicBuilder';
Poly.registerNode(MeshBasicBuilderMatNode);
Poly.registerNode(MergeSopNode);
Poly.registerNode(PlaneSopNode);
Poly.registerNode(SphereSopNode);
Poly.registerNode(PerspectiveCameraObjNode);
Poly.registerNode(CameraOrbitControlsEventNode);
Poly.registerNode(EventsNetworkSopNode);
Poly.registerNode(BoxSopNode);
Poly.registerNode(MeshBasicMatNode);
Poly.registerNode(WebCamCopNode);
Poly.registerNode(CopNetworkObjNode);
Poly.registerNode(GeoObjNode);
Poly.registerNode(AddSopNode);
Poly.registerNode(MaterialSopNode);
Poly.registerNode(TextSopNode);
Poly.registerNode(TransformSopNode);
Poly.registerNode(CopySopNode);
Poly.registerNode(MaterialsNetworkObjNode);
Poly.registerNode(MaterialsNetworkSopNode);
Poly.registerNode(MeshLambertMatNode);
Poly.registerNode(HemisphereLightObjNode);
import {
	FloatToVec2GlNode,
	FloatToVec3GlNode,
	FloatToVec4GlNode,
} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/_ConversionToVec';
import {CompareGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Compare';
import {GlobalsGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Globals';
import {OutputGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Output';
import {MultAddGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/MultAdd';
import {NoiseGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Noise';
import {TwoWaySwitchGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/TwoWaySwitch';
import {AttributeGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Attribute';
import {ComplementGlNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/gl/Complement';
Poly.registerNode(ComplementGlNode);
Poly.registerNode(AttributeGlNode);
Poly.registerNode(FloatToVec2GlNode);
Poly.registerNode(FloatToVec3GlNode);
Poly.registerNode(FloatToVec4GlNode);
Poly.registerNode(CompareGlNode);
Poly.registerNode(GlobalsGlNode);
Poly.registerNode(OutputGlNode);
Poly.registerNode(MultAddGlNode);
Poly.registerNode(NoiseGlNode);
Poly.registerNode(TwoWaySwitchGlNode);

// register nodes for this plugin
import {polyPluginOcclusion} from './index';
Poly.registerPlugin(polyPluginOcclusion);

// create a scene
const scene = new PolyScene();

// create a sphere and plane
const geo = scene.root().createNode('geo') as ExtendedGeoObjNode;
const sphere = geo.createNode('sphere');
const plane = geo.createNode('plane');
const merge = geo.createNode('merge');
merge.setInput(0, sphere);
merge.setInput(1, plane);
merge.p.compact.set(true);
plane.p.size.set([4, 4]);
plane.p.stepSize.set(0.02);
plane.p.center.y.set(-1);

// add occlusion
const occlusion = geo.createNode('occlusion');
occlusion.setInput(0, merge);

// add material
const material = geo.createNode('material');
material.setInput(0, occlusion);
material.flags.display.set(true);
const MAT = scene.root().createNode('materialsNetwork');
const meshBasicBuilder = MAT.createNode('meshBasicBuilder');
const output = meshBasicBuilder.createNode('output');
const attribute = meshBasicBuilder.createNode('attribute');
const complement = meshBasicBuilder.createNode('complement');
const floatToVec3 = meshBasicBuilder.createNode('floatToVec3');
output.setInput('color', floatToVec3);
floatToVec3.setInput('x', complement);
floatToVec3.setInput('y', complement);
floatToVec3.setInput('z', complement);
complement.setInput(0, attribute);
attribute.p.name.set('occlusion');
material.p.material.setNode(meshBasicBuilder);

// add a light
scene.root().createNode('hemisphereLight');

// create a camera
const perspectiveCamera1 = scene.root().createNode('perspectiveCamera');
perspectiveCamera1.p.t.set([5, 5, 5]);
// add orbit_controls
const events1 = perspectiveCamera1.createNode('eventsNetwork');
const orbitsControls = events1.createNode('cameraOrbitControls');
perspectiveCamera1.p.controls.setNode(orbitsControls);

// create viewer
perspectiveCamera1.createViewer(document.getElementById('app')!);

// make some nodes globals to access in html controls
(window as any).sphere = sphere;
(window as any).occlusion = occlusion;
