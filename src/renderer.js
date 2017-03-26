import ShaderManager from'./shaderManager.js';
import Transform from './transform.js';
import Mesh from './mesh.js';
import Light from './light.js';
import Square from './meshes/square.js'

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
        this.camera = new Transform(this.shaderManager);
        this.mesh = new Mesh(this.shaderManager);
        this.light = new Light(this.shaderManager);
        this.square = new Square(this.shaderManager);

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    addMesh(data) {
      this.mesh.generateMesh(data);
      return this;
    }
    initShaders(fragmentShader, vertexShader) {
        this.shaderManager
            .initFragmentShader(fragmentShader)
            .initVertexShader(vertexShader)
            .linkProgram()
            .useProgram();

        this.shaderManager
            .getAttribLocation("vertexPositionAttribute", "aVertexPosition");
            // .getAttribLocation("vertexNormalAttribute", "aVertexNormal");

        this.shaderManager
            .getUniformLocation("pMatrixUniform", "uPMatrix")
            .getUniformLocation("mvMatrixUniform", "uMVMatrix");
        //     .getUniformLocation("nMatrixUniform", "uNMatrix")
        //     .getUniformLocation("ambientColorUniform", "uAmbientColor")
        //     .getUniformLocation("lightingDirectionUniform", "uLightingDirection")
        //     .getUniformLocation("directionalColorUniform", "uDirectionalColor");

        return this;
    }
    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    render() {
        requestAnimationFrame(() => {
            this.render();
        });
        this.drawScene();

        return this;
    }
    drawScene() {
        this.clear();

        this.camera.setViewPort().setPerspective();//.translate();

        // this.mesh.bindBuffers().draw();

        this.square.bindBuffers().translate(0, 0, 6).draw();

        // this.light.render();
    }
}
export default Renderer;