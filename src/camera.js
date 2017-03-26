import Transform from './transform.js'
import {glMatrix, mat4} from "gl-matrix";

export default class Camerta {
	constructor(shaderManager) {
		this.gl = shaderManager.gl;
		this.shaderManager = shaderManager;

		this.transform = new Transform(shaderManager);

    	this.currentlyPressedKeys = {};

    	this.pitchRate = 0;
    	this.yawRate = 0;
    	this.speed = 0;

    	this.lastTime = 0
    	this.joggingAngle = 0;

    	document.onkeydown = event => this.handleKeyDown(event);
		document.onkeyup = event => this.handleKeyUp(event);
	}
	setViewPort() {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

        return this;
    }
    setPerspective() {
        mat4.perspective(Transform.pMatrix, glMatrix.toRadian(45), this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0);
        console.log(Transform.pMatrix);
        return this;
    }
    translate() {
    	this.transform._translate();

    	return this;
    }
    rotate() {
    	this.transform._rotate();

    	return this;
    }
	handleKeyDown(event) {
		this.currentlyPressedKeys[event.keyCode] = true;

		if(String.fromCharCode(event.keyCode) == "F") {

		}
	}
	handleKeyUp(event) {
		this.currentlyPressedKeys[event.keyCode] = false;
	}

	handleKeys() {
	   if (this.currentlyPressedKeys[33]) {
		  // Page Up
		  this.pitchRate = +0.1;
		} else if (this.currentlyPressedKeys[34]) {
		  // Page Down
		  this.pitchRate = -0.1;
		} else {
		  this.pitchRate = 0;
		}

		if (this.currentlyPressedKeys[37] || this.currentlyPressedKeys[65]) {
		  // Left cursor key or A
		  this.yawRate = 0.1;
		} else if (this.currentlyPressedKeys[39] || this.currentlyPressedKeys[68]) {
		  // Right cursor key or D
		  this.yawRate = -0.1;
		} else {
		  this.yawRate = 0;
		}

		if (this.currentlyPressedKeys[38] || this.currentlyPressedKeys[87]) {
		  // Up cursor key or W
		  this.speed = -0.001;
		} else if (this.currentlyPressedKeys[40] || this.currentlyPressedKeys[83]) {
		  // Down cursor key
		  this.speed = 0.001;
		} else {
		  this.speed = 0;
		}

		return this;
	}
	animate() {
		let timeNow = new Date().getTime();
		if(this.lastTime != 0) {
			let elapsed = timeNow - this.lastTime;

			if (this.speed != 0) {
				// this.transform.xPos -= Math.sin(Transform.degToRad(this.transform.yaw)) * this.speed * elapsed;
				this.transform.zPos -= this.speed * elapsed; //Math.cos(Transform.degToRad(this.transform.yaw)) * this.speed * elapsed;

				// this.joggingAngle += elapsed * 0.6;  // 0.6 "fiddle factor" -- makes it feel more realistic :-)
				// this.transform.yPos = Math.sin(Transform.degToRad(this.joggingAngle)) / 20 + 0.4
			}

			this.transform.yaw += this.yawRate * elapsed;
			this.transform.pitch += this.pitchRate * elapsed;
		}
		this.lastTime = timeNow;

		return this;
	}
}