import {AllNodesRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/All';
import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
AllNodesRegister.run(Poly);
import {polyPluginOcclusion} from '../src/index';
Poly.registerPlugin(polyPluginOcclusion);

import './helpers/setup';
import './tests';

QUnit.start();
