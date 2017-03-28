/**
 * Created by 54179 on 2017/3/21.
 */

 class ShaderProgram {
    constructor(gl) {
        this.gl = gl;
        this.program = this.gl.createProgram();
    }
    initVertexShader(data) {
        console.log("vs:");
        console.log(data);
        let shader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(shader, data);
        this.gl.compileShader(shader);
        if(!this.checkShader(shader)) return this;
        this.attachShader(shader);
        return this;
    }
    initFragmentShader(data) {
        console.log("fs:");
        console.log(data);
        let shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(shader, data);
        this.gl.compileShader(shader);
        if(!this.checkShader(shader)) return this;
        this.attachShader(shader);
        return this;
    }
    attachShader(shader) {
        this.gl.attachShader(this.program, shader);
        return this;
    }
    linkProgram() {
        this.gl.linkProgram(this.program);
        return this;
    }
    checkShader(shader) {
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return false;
        }
        return true;
    }
    checkProgram() {
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error("Could not initialise shaders");
            console.error(this.gl.getProgramInfoLog(this.program));
        }
        return this;
    }
    useProgram() {
        this.checkProgram();
        this.gl.useProgram(this.program);
        return this;
    }
    getAttribLocation(attribName, value) {
        ShaderProgram[attribName] = this.gl.getAttribLocation(this.program, value);
        this.gl.enableVertexAttribArray(ShaderProgram[attribName]);
        return this;
    }
    getUniformLocation(uniformName, value) {
        ShaderProgram[uniformName] = this.gl.getUniformLocation(this.program, value);
        return this;
    }

    setVec3Uniform(uniformName, value) {
        this.gl.uniform3fv(ShaderProgram[uniformName], value);
    }
 }

 export default ShaderProgram;