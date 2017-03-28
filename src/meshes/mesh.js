import Transform from '../transform.js'

class Mesh {
	constructor(gl, vertexNum) {
		this.gl = gl;
		
		this.transform = new Transform();
		this.vertexNum = vertexNum;
	}
	initVertexBuffer(buffer) {
		this.vertexBuffer = this.gl.createBuffer();
	  	this.vertexBuffer.itemSize = 3;

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
	  	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);

	  	return this;
	}
	initIndexBuffer(buffer) {
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer), this.gl.STATIC_DRAW);

	  	return this;
	}
	initColorBuffer(buffer) {
		this.colorBuffer = this.gl.createBuffer();
		this.colorBuffer.itemSize = 4;

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);

		return this;
	}
	initNormalBuffer(buffer) {
		this.normalBuffer = this.gl.createBuffer();
		this.normalBuffer.itemSize = 3;

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);

		return this;
	}
	bindBuffer(vaoId, buffer) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(vaoId, buffer.itemSize, this.gl.FLOAT, false, 0, 0);
	}
}

export default Mesh;