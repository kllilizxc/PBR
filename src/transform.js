/**
 * Created by 54179 on 2017/3/21.
 */
import {glMatrix, mat4} from "gl-matrix";

 class Transform {
    constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.mvMatrix = mat4.create();
        this.reset();
    }
    reset() {
        mat4.identity(this.mvMatrix);
    }
    translate(x, y, z) {
        mat4.translate(this.mvMatrix, this.mvMatrix, [x, y, z]);
    }
    rotate(x, y, z) {
        mat4.rotateX(this.mvMatrix, this.mvMatrix, x); 
        mat4.rotateY(this.mvMatrix, this.mvMatrix, y); 
        mat4.rotateZ(this.mvMatrix, this.mvMatrix, z); 
    }
    fromCameraTransform(camera) {
        mat4.multiply(this.mvMatrix, camera.transform.mvMatrix, this.mvMatrix);
    }
 }

 export default Transform;