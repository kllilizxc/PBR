import Transform from "../transform.js"

class Square {
	constructor(shaderManager) {
		this.gl = shaderManager.gl;
		this.shaderManager = shaderManager;
		this.verticesBuffer = this.gl.createBuffer();

		this.transform = new Transform(shaderManager);
  
		this.vertices = [
		1.0,  1.0,  0.0,
		-1.0, 1.0,  0.0,
		1.0,  -1.0, 0.0,
		-1.0, -1.0, 0.0
		];
	}
	bindBuffers() {
	  	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
	  	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

	  	return this;
	}
	translate(x, y, z) {
		this.transform.xPos = x;
		this.transform.yPos = y;
		this.transform.zPos = z;
		this.transform.translate();

		return this;
	}
	draw() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
  		this.gl.vertexAttribPointer(this.shaderManager.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
  		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

  		return this;
	}
}

export default Square;