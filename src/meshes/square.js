import Mesh from './mesh.js'

class Square extends Mesh {
	constructor(gl) {
		super(gl, 6);

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

		super.initVertexBuffer(vertices)
			 .initColorBuffer(colors)
			 .initIndexBuffer(indices);
	}
}

export default Square;