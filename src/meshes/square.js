import Mesh from './mesh.js'

class Square extends Mesh {
	constructor(shaderManager) {
		super(shaderManager);

		let vertices = [
		1.0,  1.0,  0.0,
		-1.0, 1.0,  0.0,
		1.0,  -1.0, 0.0,
		-1.0, 1.0,  0.0,
		1.0,  -1.0, 0.0,
		-1.0, -1.0, 0.0
		];

		super.bindVertexBuffer(vertices, 3, 6);
	}
	draw() {
		super.drawArrays();
	}
}

export default Square;