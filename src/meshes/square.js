import Mesh from './mesh.js'

class Square extends Mesh {
	constructor(gl) {
		super(gl, 4);

		let vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];

		super.initVertexBuffer(vertices);
	}
}

export default Square;