import ShaderManager from'./shaderManager.js'
import Transform from './transform.js'
import Camera from './camera.js'
import MeshManager from './meshManager.js'
import Light from './light.js'
import Pyramid from './meshes/pyramid.js'
import Square from './meshes/square.js'
import Cube from './meshes/cube.js'

class Renderer {
    constructor(canvas) {
        this.gl = canvas.getContext("experimental-webgl");
        if (!this.gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;

        //sub-components
        this.shaderManager = new ShaderManager(this.gl);
        this.camera = new Camera(this.shaderManager);
        this.meshManager = new MeshManager(this.shaderManager);
        this.light = new Light(this.shaderManager);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }
    addMesh(data) {
      this.meshManager.generateMesh(data);
      return this;
    }
    initShaders(fragmentShader, vertexShader) {
        this.shaderManager
            .initFragmentShader(fragmentShader)
            .initVertexShader(vertexShader)
            .linkProgram()
            .useProgram();

        this.shaderManager
            .getAttribLocation("vertexPositionAttribute", "aVertexPosition")
            .getAttribLocation("vertexColorAttribute", "aVertexColor")
            // .getAttribLocation("vertexNormalAttribute", "aVertexNormal");

        this.shaderManager
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
    }
    createTestObjs() {
        this.square = new Square(this.shaderManager);
        this.pyramid = new Pyramid(this.shaderManager);
        this.cube = new Cube(this.shaderManager);

        return this;
    }
    drawTestObjs() {
        this.square.draw();
        // this.pyramid.draw();
        // this.cube.draw();
    }
    render() {
        requestAnimationFrame(() => {
            this.render();
        });

        this.camera.handleKeys();
        this.drawScene();
        this.camera.animate();

        return this;
    }
    drawScene() {
        this.clear();

        // this.camera.setViewPort()
                // .setPerspective();

        // Transform.reset();
        
        // this.camera.transform.translate(1.5, 0, -8.0);
        // this.camera.translate()
                // .rotate();
                
        // this.meshManager.bindBuffers().draw();

        this.drawTestObjs();

        // this.light.render();        
    }
}
export default Renderer;