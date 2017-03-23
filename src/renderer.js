import ShaderManager from'./shaderManager.js';
import Transform from './transform.js';
import Mesh from './mesh.js';
import Light from './light.js';

class Renderer {
    constructor(canvas) {
        this.gl = canvas.getContext("experimental-webgl");
        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;
        if (!this.gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
        this.shaderManager = new ShaderManager(this.gl);
        this.camera = new Transform(this.shaderManager);
        this.mesh = new Mesh(this.shaderManager);
        this.light = new Light(this.shaderManager);
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
            .getAttribLocation("vertexPositionAttribute", "aVertexPosition")
            .getAttribLocation("vertexNormalAttribute", "aVertexNormal");

        this.shaderManager
            .getUniformLocation("pMatrixUniform", "uPMatrix")
            .getUniformLocation("mvMatrixUniform", "uMVMatix")
            .getUniformLocation("nMatrixUniform", "uNMatrix")
            .getUniformLocation("ambientColorUniform", "uAmbientColor")
            .getUniformLocation("lightingDirectionUniform", "uLightingDirection")
            .getUniformLocation("directionalColorUniform", "uDirectionalColor");

        return this;
    }
    clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.enable(this.gl.DEPTH_TEST);

        return this;
    }
    render() {
        requestAnimationFrame(() => {
            this.render();
        });
        this.drawScene();

        return this;
    }
    drawScene() {
        this.camera.translate();

        this.mesh.bindBuffers().draw();

        this.light.render();
    }
}
export default Renderer;