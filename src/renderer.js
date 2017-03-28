import ShaderProgram from'./shaderProgram.js'
import Transform from './transform.js'
import Camera from './camera.js'
import MeshManager from './meshManager.js'
import Light from './light.js'
import Pyramid from './meshes/pyramid.js'
import Square from './meshes/square.js'
import Cube from './meshes/cube.js'
import {glMatrix, mat4} from "gl-matrix";

class Renderer {
    constructor(gl, width, height) {
        this.gl = gl;
        this.width = width;
        this.height = height;

        //sub-components
        this.shaderProgram = new ShaderProgram(this.gl);
        this.camera = new Camera();
        // this.meshManager = new MeshManager(this.shaderProgram);
        // this.light = new Light(this.shaderProgram);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }
    addMesh(data) {
      this.meshManager.generateMesh(data);
      return this;
    }
    setViewPort() {
        this.gl.viewport(0, 0, this.width, this.height);
        return this;
    }
    setPerspective() {
        mat4.perspective(Transform.pMatrix, glMatrix.toRadian(90), this.width / this.height, 0.1, 100.0);
        return this;
    }
    initShaders(fragmentShader, vertexShader) {
        this.shaderProgram
            .initFragmentShader(fragmentShader)
            .initVertexShader(vertexShader)
            .linkProgram()
            .useProgram();

        this.shaderProgram
            .getAttribLocation("vertexPositionAttribute", "aVertexPosition")
            .getAttribLocation("vertexColorAttribute", "aVertexColor")
            // .getAttribLocation("vertexNormalAttribute", "aVertexNormal");

        this.shaderProgram
            .getUniformLocation("pMatrixUniform", "uPMatrix")
            .getUniformLocation("mvMatrixUniform", "uMVMatrix")
            // .getUniformLocation("nMatrixUniform", "uNMatrix")
            // .getUniformLocation("ambientColorUniform", "uAmbientColor")
            // .getUniformLocation("lightingDirectionUniform", "uLightingDirection")
            // .getUniformLocation("directionalColorUniform", "uDirectionalColor");

        return this;
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        return this;
    }
    createTestObjs() {
        this.square = new Square(this.gl);
        this.pyramid = new Pyramid(this.gl);
        this.cube = new Cube(this.gl);

        return this;
    }
    setMatrixUniforms() {
        this.gl.uniformMatrix4fv(ShaderProgram.pMatrixUniform, false, Transform.pMatrix);

        this.gl.uniformMatrix4fv(ShaderProgram.mvMatrixUniform, false, Transform.mvMatrix);

        // let normalMatrix = mat3.create();
        // mat3.normalFromMat4(normalMatrix, Transform.mvMatrix);
        // this.gl.uniformMatrix3fv(ShaderProgram.nMatrixUniform, false, normalMatrix);
    }
    renderMesh(mesh) {
        Transform.mvPushMatrix();
        mesh.bindBuffer(this.shaderProgram.vertexPositionAttribute, mesh.vertexBuffer);
        mesh.bindBuffer(this.shaderProgram.vertexColorAttribute, mesh.colorBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        this.setMatrixUniforms();
        this.gl.drawElements(this.gl.TRIANLES, mesh.vertexNum, this.gl.UNSIGNED_SHORT, 0);
        Transform.mvPopMatrix();
    }
    renderAmbientLight(light) {
        this.shaderProgram.setVec3Uniform(this.shaderProgram.ambientColorUniform, light.ambient);
    }
    renderDirectionalLight(light) {
        this.shaderProgram.setVec3Uniform(this.shaderProgram.directionalColorUniform, light.color);
        this.shaderProgram.setVec3Uniform(this.shaderProgram.lightingDirectionUniform, light.direction);
    }
    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        // this.camera.handleKeys();
        this.drawScene();
        // this.camera.animate();

        return this;
    }
    drawScene() {
        this.clear()
            .setViewPort()
            .setPerspective();

        Transform.reset();
        
        // this.camera.transform.translate(1.5, 0, -8.0);
        // this.camera.translate()
                // .rotate();
                
        // this.meshManager.bindBuffers().draw();

        this.renderMesh(this.square);

        // this.light.render();        
    }
}
export default Renderer;