# Polygonjs Occlusion Plugin

This adds a Occlusion SOP node to the [Polygonjs webgl engine](https://polygonjs.com).

This wraps the work done in https://github.com/wwwtyro/geo-ambient-occlusion into a node that can be used with all the other nodes available on Polygonjs.

See [example scene](https://github.com/polygonjs/example-plugin-occlusion):

![geometries with occlusion added](https://github.com/polygonjs/example-plugin-occlusion/blob/main/doc/occlusion_examples.jpg?raw=true)

# Install

Import the plugin:

`yarn add @polygonjs/plugin-occlusion`

And register the plugin in the function `configurePolygonjs` in the file `PolyConfig.js` so that the occlusion node can be accessible in both the editor and your exported scene:

```js
import {polyPluginOcclusion} from '@polygonjs/plugin-occlusion/dist/src/index';

export function configurePolygonjs(poly) {
	poly.registerPlugin(polyPluginOcclusion);
}
```
