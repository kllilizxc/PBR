/**
 * Created by 54179 on 2017/3/21.
 */
import {vec3} from "gl-matrix";

 class Light {
    constructor(shaderManager) {
        this.ambient = [0, 0, 0]

        this.directional = {
            direction: { X: 0, Y: 0, Z: 0 },
            color: { R:0, G: 0, B: 0 }
        };

        this.shaderManager = shaderManager;
    }
};

export default Light;