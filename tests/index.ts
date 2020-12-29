import {AllRegister} from 'polygonjs-engine/src/engine/poly/registers/All';
AllRegister.run();
import {PolygonjsPluginOcclusionRegister} from '../src/index';
import {Poly} from 'polygonjs-engine/src/engine/Poly';
PolygonjsPluginOcclusionRegister(Poly.instance());

import './helpers/setup';
import './tests';

QUnit.start();
