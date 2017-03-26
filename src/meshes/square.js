import Mesh from './mesh.js'

class Square extends Mesh {
	constructor(shaderManager) {
		super(shaderManager, 6);

		let vertices = [
		0.5,  0.5,  0.0,
		-0.5, 0.5,  0.0,
		0.5,  -0.5, 0.0,
		-0.5, -0.5, 0.0
		];

		let indices = [0, 1, 3, 3, 1, 2];

		let colors = [
		1, 0, 0, 
		0, 1, 0,
		0, 0, 1,
		1, 0, 0
		];

		super.bindVertexBuffer(vertices, 3)
			 .bindColorBuffer(colors, 3)
			 .bindIndexBuffer(indices);
	}
	draw() {
		super.drawElements();
	}
}

export default Square;