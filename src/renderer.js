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

        //sub-components
        this.shaderProgram = new ShaderProgram(this.gl);
        this.camera = new Camera(width, height);
        // this.meshManager = new MeshManager(this.shaderProgram);
        // this.light = new Light(this.shaderProgram);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }
    addMesh(data) {
      this.meshManager.generateMesh(data);
      return this;
    }
    setViewPort(camera) {
        this.gl.viewport(0, 0, camera.width, camera.height);
        return this;
    }
    setPerspective(camera) {
        mat4.perspective(camera.pMatrix, camera.viewAngle, camera.width / camera.height, camera.near, camera.far);
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
            // .getAttribLocation("vertexColorAttribute", "aVertexColor")
            // .getAttribLocation("vertexNormalAttribute", "aVertexNormal");

        this.shaderProgram
            .getUniformLocation("mvpMatrixUniform", "uMVPMatrix")
            // .getUniformLocation("nMatrixUniform", "uNMatrix")
            // .getUniformLocation("ambientColorUniform", "uAmbientColor")
            // .getUniformLocation("lightingDirectionUniform", "uLightingDirection")
            // .getUniformLocation("directionalColorUniform", "uDirectionalColor");

        console.log(this.shaderProgram);
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
    setMatrixUniforms(mesh) {
        let mvpMatrix = mat4.create();
        mat4.multiply(mesh.transform.mvMatrix, mesh.transform.mvMatrix, this.camera.transform.mvMatrix);
        mat4.multiply(mvpMatrix, this.camera.pMatrix, mesh.transform.mvMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);

        // let normalMatrix = mat3.create();
        // mat3.normalFromMat4(normalMatrix, Transform.mvMatrix);
        // this.gl.uniformMatrix3fv(ShaderProgram.nMatrixUniform, false, normalMatrix);
    }
    renderMesh(mesh) {
        // console.log(mesh);
        mesh.bindBuffer(this.shaderProgram.vertexPositionAttribute, mesh.vertexBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        this.setMatrixUniforms(mesh);
        this.gl.drawElements(this.gl.TRIANLES, mesh.vertexNum, this.gl.UNSIGNED_SHORT, 0);
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
        this.setViewPort(this.camera)
            .clear()
            .setPerspective(this.camera);

        this.camera.reset();
        
        this.camera.transform.translate(1.5, 0, 7.0);
        // this.camera.translate()
                   // .rotate();
                
        // this.meshManager.bindBuffers().draw();

        // this.cube.fromCameraTransform(this.camera).translate(0, 0, 0);
        this.renderMesh(this.cube);

        // this.light.render();        
    }
}
export default Renderer;