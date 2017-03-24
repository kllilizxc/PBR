/**
 * Created by 54179 on 2017/3/21.
 */
import {mat4, mat3} from "gl-matrix";

 class Transform {
    constructor(shaderManager) {
        this.mvMatrix = mat4.create();
        this.mvMatrixStack = [];
        this.pMatrix = mat4.create();
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.pitch =  0;
        this.yaw = 0;
        this.gl = shaderManager.gl;
        this.shaderProgram = shaderManager.program;
    }
    setViewPort() {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

        return this;
    }
    setPerspective() {
        mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0, this.pMatrix);

        return this;
    }
    mvPushMatrix() {
        let copy = mat4.create();
        mat4.set(this.mvMatrix, copy);
        this.mvMatrixStack.push(copy);
    }
    mvPopMatrix() {
        if(this.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        this.mvMatrix = this.mvMatrixStack.pop();
    }
    setMatrixUniforms() {
        var gl = this.gl;
        var shaderProgram = this.shaderProgram;
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);

        let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, this.mvMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }
    degToRad(deg) {
        return deg * Math.PI / 180;
    }
    translate() {
        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.mvMatrix, [-this.xPos, -this.yPos, -this.zPos]);
        mat4.rotate(this.mvMatrix, this.mvMatrix, this.degToRad(-this.pitch), [1, 0, 0]);
        mat4.rotate(this.mvMatrix, this.mvMatrix, this.degToRad(-this.yaw), [0, 1, 0]);
        this.setMatrixUniforms();
    }
 }

 export default Transform;