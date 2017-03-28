/**
 * Created by 54179 on 2017/3/21.
 */
import {glMatrix, mat4, mat3} from "gl-matrix";

 class Transform {
    constructor() {
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.pitch =  0;
        this.yaw = 0;
    }
    static reset() {
        Transform.mvMatrixStack = [];
        mat4.identity(Transform.mvMatrix);
    }
    static mvPushMatrix() {
        let copy = mat4.create();
        mat4.copy(copy, Transform.mvMatrix);
        Transform.mvMatrixStack.push(copy);
    }
    static mvPopMatrix() {
        if(Transform.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        Transform.mvMatrix = Transform.mvMatrixStack.pop();
    }
    translate(x, y, z) {
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
        this._translate();
    }
    _translate() {
        mat4.translate(Transform.mvMatrix, Transform.mvMatrix, [-this.xPos, -this.yPos, -this.zPos]);
    }
    rotate(pitch, yaw) {
        this.pitch = pitch;
        this.yaw = yaw;
        this._rotate();
    }
    _rotate() {
        mat4.rotateX(Transform.mvMatrix, Transform.mvMatrix, glMatrix.toRadian(-this.pitch));
        mat4.rotateY(Transform.mvMatrix, Transform.mvMatrix, glMatrix.toRadian(-this.yaw));
    }
 }

Transform.mvMatrix = mat4.create();
Transform.pMatrix = mat4.create();
Transform.mvMatrixStack = [];

 export default Transform;