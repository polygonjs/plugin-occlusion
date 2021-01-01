import {AllRegister} from 'polygonjs-engine/src/engine/poly/registers/All';
AllRegister.run();
import {polyPluginOcclusion} from '../src/index';
import {Poly} from 'polygonjs-engine/src/engine/Poly';
Poly.instance().registerPlugin(polyPluginOcclusion);

import './helpers/setup';
import './tests';

QUnit.start();
