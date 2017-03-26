/**
 * Created by 54179 on 2017/3/21.
 */
import OBJ from "webgl-obj-loader";

 class MeshManager {
    constructor(shaderManager) {
        this.gl = shaderManager.gl;
        this.shaderManager = shaderManager;
        this.meshes = [];
    }
    generateMesh(data) {
        let mesh = new OBJ.Mesh(data);
        OBJ.initMeshBuffers(this.gl, mesh);
        this.meshes.push(mesh);
    }
    bindBuffer(mesh, attrib, buffer) {
        var gl = this.gl;
        var shaderManager = this.shaderManager;
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh[buffer]);
        gl.vertexAttribPointer(shaderManager[attrib], mesh[buffer].itemSize, gl.FLOAT, false, 0, 0);

    }
    bindBuffers() {
        var gl = this.gl;
        for(let mesh of this.meshes) {
            this.bindBuffer(mesh, "vertexPositionAttribute", "vertexBuffer");
            // this.bindBuffer(mesh, "vertexNormalAttribute", "normalBuffer");
        }

        return this;
    }
    draw() {
        var gl = this.gl;
        for(let mesh of this.meshes) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
            gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
    }
 }

 export default MeshManager;