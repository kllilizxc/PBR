import Transform from '../transform.js'

class Mesh {
	constructor(shaderManager) {
		this.gl = shaderManager.gl;
		this.shaderManager = shaderManager;
		this.transform = new Transform(shaderManager);

		this.vertexBuffer = this.gl.createBuffer();
		this.indexBuffer = this.gl.createBuffer();
		this.colorBuffer = this.gl.createBuffer();
		this.normalBuffer = this.gl.createBuffer();

		this.hasBeenTransformed = false;
	}
	bindVertexBuffer(buffer, itemSize, itemNum) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
	  	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
	  	this.vertexBuffer.itemSize = itemSize;
	  	this.vertexBuffer.itemNum = itemNum;

	  	return this;
	}
	bindIndexBuffer(buffer, itemSize, itemNum) {
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer), this.gl.STATIC_DRAW);
	  	this.indexBuffer.itemSize = itemSize;
	  	this.indexBuffer.itemNum = itemNum;

	  	return this;
	}
	bindColorBuffer(buffer, itemSize, itemNum) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
		this.colorBuffer.itemSize = itemSize;
		this.colorBuffer.numItems = itemNum;

		return this;
	}
	bindNormalBuffer(buffer, itemSize, itemNum) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
		this.normalBuffer.itemSize = itemSize;
		this.normalBuffer.numItems = itemNum;

		return this;
	}
	pushMatrix() {
        Transform.mvPushMatrix();	
		this.hasBeenTransformed = true;
        return this;	
	}
	popMatrix() {
        Transform.mvPopMatrix();
		this.hasBeenTransformed = false;
        return this;
	}
	translate(x, y, z) {
		if(!this.hasBeenTransformed)
			this.pushMatrix();
		this.transform.translate(x, y, z);

		return this;
	}
	rotate(pitch, yaw) {
		if(!this.hasBeenTransformed)
			this.pushMatrix();
		this.transform.rotate(pitch, yaw);

		return this;
	}
	bindArrayBuffer(buffer, attr) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(attr, buffer.itemSize, this.gl.FLOAT, false, 0, 0);
	}
	drawArrays() {
		this.bindArrayBuffer(this.vertexBuffer, this.shaderManager.vertexPositionAttribute);
		this.bindArrayBuffer(this.colorBuffer, this.shaderManager.vertexColorAttribute);

        this.transform.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBuffer.itemNum);

		if(this.hasBeenTransformed)
			this.popMatrix();

        return this;
	}
	drawElements() {
		this.bindArrayBuffer(this.vertexBuffer, this.shaderManager.vertexPositionAttribute);
		this.bindArrayBuffer(this.colorBuffer, this.shaderManager.vertexColorAttribute);
		// this.bindArrayBuffer(this.normalBuffer, this.shaderManager.vertexNormalAttribute);

		//index
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.transform.setMatrixUniforms();
		this.gl.drawElements(this.gl.TRIANGLES, this.indexBuffer.itemNum, this.gl.UNSIGNED_SHORT, 0);

		if(this.hasBeenTransformed)
			this.popMatrix();

        return this;
	}
}

export default Mesh;