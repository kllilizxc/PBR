/**
 * Created by 54179 on 2017/3/21.
 */
 class ShaderManager {
    constructor(gl) {
        this.gl = gl;
        this.program = gl.createProgram();
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
            console.log(this.gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    }
    checkProgram() {
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.log("Could not initialise shaders");
        }
        return this;
    }
    useProgram() {
        this.checkProgram();
        this.gl.useProgram(this.program);
        return this;
    }
    getAttribLocation(attribName, varName) {
        this[attribName] = this.gl.getAttribLocation(this.program, varName);
        this.gl.enableVertexAttribArray(this[attribName]);
        return this;
    }
    getUniformLocation(attribName, varName) {
        this[attribName] = this.gl.getUniformLocation(this.program, varName);
        return this;
    }
 }

 export default ShaderManager;