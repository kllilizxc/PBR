/**
 * Created by 54179 on 2017/3/21.
 */
import {vec3} from "gl-matrix";

 class Light {
    constructor(shaderManager) {
        this.ambient = {
            R: 0,
            G: 0,
            B: 0
        };

        this.directional = {
            direction: { X: 0, Y: 0, Z: 0 },
            color: { R:0, G: 0, B: 0 }
        };

        this.shaderManager = shaderManager;
    }
    renderAmbientLight() {
        var gl = this.shaderManager.gl;
        var shaderProgram = this.shaderManager.program;
        gl.uniform3f(shaderProgram.ambientColorUniform,
            this.ambient.R,
            this.ambient.G,
            this.ambient.B
        );
    }
    renderDirectionalLight() {
        var gl = this.shaderManager.gl;
        var shaderProgram = this.shaderManager.program;
        let lightingDirection = [
            this.directional.direction.X, 
            this.directional.direction.Y, 
            this.directional.direction.Z
        ];
        let adjustedLD = vec3.create();
        vec3.normalize(lightingDirection, adjustedLD);
        gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

        gl.uniform3f(shaderProgram.directionalColorUniform, 
            this.directional.color.R, 
            this.directional.color.G, 
            this.directional.color.B);
    }
    render() {
        this.renderAmbientLight();
        this.renderDirectionalLight();
    }
};

export default Light;