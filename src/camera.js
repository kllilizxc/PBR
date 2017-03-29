import Transform from './transform.js'
import {mat4, glMatrix} from 'gl-matrix'

export default class Camera {
	constructor(width, height) {
		this.transform = new Transform();

    	this.currentlyPressedKeys = {};

    	this.pitchRate = 0;
    	this.yawRate = 0;
    	this.speed = 0;

    	this.lastTime = 0
    	this.joggingAngle = 0;

    	this.width = width;
    	this.height = height;
    	this.viewAngle = glMatrix.toRadian(45);
    	this.near = 0.1;
    	this.far = 100.0;

    	this.pMatrix = mat4.create();

    	document.onkeydown = event => this.handleKeyDown(event);
		document.onkeyup = event => this.handleKeyUp(event);
	}
	reset() {
		mat4.identity(this.pMatrix);
		this.transform.reset();
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
				this.transform.position.z -= this.speed * elapsed; //Math.cos(Transform.degToRad(this.transform.yaw)) * this.speed * elapsed;

				// this.joggingAngle += elapsed * 0.6;  // 0.6 "fiddle factor" -- makes it feel more realistic :-)
				// this.transform.yPos = Math.sin(Transform.degToRad(this.joggingAngle)) / 20 + 0.4
			}

			this.transform.rotation.x += this.yawRate * elapsed;
			this.transform.rotation.y += this.pitchRate * elapsed;
		}
		this.lastTime = timeNow;

		return this;
	}
}