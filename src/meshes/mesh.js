import Transform from '../transform.js'

class Mesh {
	constructor(shaderManager, vertexNum) {
		this.gl = shaderManager.gl;
		this.shaderManager = shaderManager;
		this.transform = new Transform(shaderManager);

		this.vertexNum = vertexNum;
		this.hasBeenTransformed = false;
	}
	bindVertexBuffer(buffer, itemSize) {
		this.vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
	  	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.shaderManager.vertexPositionAttribute, itemSize, this.gl.FLOAT, false, 0, 0);

	  	return this;
	}
	bindIndexBuffer(buffer) {
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer), this.gl.STATIC_DRAW);

	  	return this;
	}
	bindColorBuffer(buffer, itemSize) {
		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.shaderManager.vertexColorAttribute, itemSize, this.gl.FLOAT, false, 0, 0);

		return this;
	}
	bindNormalBuffer(buffer, itemSize) {
		this.normalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(buffer), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.shaderManager.vertexNormalAttribute, itemSize, this.gl.FLOAT, false, 0, 0);

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
        this.transform.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexNum);

		if(this.hasBeenTransformed)
			this.popMatrix();

        return this;
	}
	drawElements() {
		//index
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        // this.transform.setMatrixUniforms();
		this.gl.drawElements(this.gl.TRIANGLES, this.vertexNum, this.gl.UNSIGNED_SHORT, 0);

		if(this.hasBeenTransformed)
			this.popMatrix();

        return this;
	}
}

export default Mesh;