    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying vec4 vColor;

    void main(void) {
        gl_Position = uMVMatrix * uPMatrix * vec4(aVertexPosition, 1.0);
        vColor = aVertexColor;
    }