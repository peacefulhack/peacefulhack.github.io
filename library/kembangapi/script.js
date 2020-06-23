let maxFireworkSize = 30;
let minBandSize = 1;
let maxBandSize = 15;
let maxNumberOfFireworks = 60;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	maxNumberOfFireworks = 30;
}

let fireworks = [];
let rateOfChange = 0.25;
let inverseDensity = 15;
let bandRateOfChange = 0.5;

function degrees_to_radians(degrees) {
	var pi = Math.PI;
	return degrees * (pi / 180);
}

setInterval(() => {
	if (fireworks.length < maxNumberOfFireworks) {
		let width = windowWidth / 2;
		fireworks.push(
			new abstractFirework(
				random(0, windowWidth),
				random(0, windowHeight),
				random(10, maxFireworkSize),
				maxFireworkSize * 250
			)
		);
	}
}, 2000);

function setup() {
	createCanvas(windowWidth, windowHeight);
	fireworks.length = 0;
}

function windowResized() {
	waitress = millis() + 2000;
	if (fullscreen()) {
		resizeCanvas(displayWidth, displayHeight);
	} else {
		resizeCanvas(windowWidth, windowHeight);
	}
	showing = true;
	setup();
}

function draw() {
	background(0, 0, 0);
	_.forEach(fireworks, (f) => f.display());
	_.remove(fireworks, (f) => f.removed);
}

class abstractFirework {
	constructor(x, y, size, til) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.til = til;
		this.removed = false;
		this.rings = [];
		this.rings.length = 0;
		this.bornAt = Date.now();

		for (let i = 0; i < this.size; i++) {
			this.rings.push(
				new Ring(
					i,
					i,
					random(minBandSize, maxBandSize),
					color(random(0, 256), random(0, 256), random(0, 256)),
					this.x,
					this.y,
					this.rings,
					this.bornAt,
					this.til
				)
			);
		}

		_.forEach(this.rings, (r) => r.init());

		setTimeout(() => {
			this.removed = true;
		}, til);
	}

	display() {
		_.forEach(this.rings, (r) => r.display());
	}
}

class Ring {
	constructor(
		id,
		layer,
		baseBandSize,
		ringDetailColor,
		x,
		y,
		rings,
		bornAt,
		til
	) {
		this.id = id;
		this.layer = layer;
		this.currentBandSize = 0;
		this.ringDetailColor = ringDetailColor;
		this.angle = 0;
		this.x = x;
		this.y = y;
		this.rings = rings;
		this.bornAt = bornAt;
		this.til = til;
		this.directionClockwise = this.layer % 2;

		this.newColorTarget = color(
			random(0, 256),
			random(0, 256),
			random(0, 256),
			random(0, 256)
		);

		this.maxRotations = 360 / inverseDensity;
		this.angleFind = 360 / this.maxRotations;
		this.tick = [];
		this.tickMax = [];
		this.tickMin = [];
		this.ticksTarget = [];

		this.tick.length = this.maxRotations;
		this.tickMax.length = this.maxRotations;
		this.tickMin.length = this.maxRotations;
		this.ticksTarget.length = this.maxRotations;
		this.rateOfTickChange = 0.5;

		this.base = 0;
		for (let i = 0; i < this.layer; i++) {
			this.base += this.rings[i].currentBandSize;
		}
	}

	radius() {
		return this.base + this.currentBandSize;
	}

	init() {
		for (let i = 0; i < this.maxRotations; i++) {
			this.tick[i] = 0;

			let r1 = this.newTargetTock();
			let r2 = this.newTargetTock();
			this.tickMax[i] = r2 > r1 ? r2 : r1;
			this.tickMin[i] = r2 > r1 ? r1 : r2;
			this.ticksTarget[i] = 0;
		}

		this.targetBandSize = this.newTargetBandSize();
	}

	display() {
		noFill();
		strokeWeight(1);
		this.updateColor();
		stroke(this.ringDetailColor);
		this.updateBand();
		this.drawTicTockBand();
	}

	updateColor() {
		let updateColor = (current, target, index) => {
			if (current.levels[index] == target.levels[index]) {
				return 0;
			} else if (current.levels[index] <= target.levels[index]) {
				return 1;
			} else {
				return -1;
			}
		};

		let targetReached = (current, target) => {
			let result = true;
			for (let i = 0; i < 3; i++) {
				if (current.levels[i] != target.levels[i]) {
					result = false;
				}
			}

			return result;
		};

		for (let i = 0; i < 3; i++) {
			this.ringDetailColor.levels[i] += updateColor(
				this.ringDetailColor,
				this.newColorTarget,
				i
			);

			this.ringDetailColor._array[3] = 1 - (Date.now() - this.bornAt) / this.til;
		}

		if (targetReached(this.ringDetailColor, this.newColorTarget)) {
			this.newColorTarget = color(
				random(0, 256),
				random(0, 256),
				random(0, 256),
				256
			);
		}
	}

	updateBand() {
		if (this.currentBandSize <= this.targetBandSize) {
			this.currentBandSize += bandRateOfChange;

			if (this.currentBandSize >= this.targetBandSize) {
				this.targetBandSize = this.newTargetBandSize();
			}
		} else {
			this.currentBandSize -= bandRateOfChange;

			if (this.currentBandSize <= this.targetBandSize) {
				this.targetBandSize = this.newTargetBandSize();
			}
		}
	}

	newTargetBandSize() {
		return random(this.layer * minBandSize, (this.layer + 1) * maxBandSize);
	}

	getMaxTick() {
		let m1 = _.max(this.tickMax, (t) => t);
		let m2 = _.max(this.tickMin, (t) => t);

		return m1 > m2 ? m1 : m2;
	}

	getMinTick() {
		let m1 = _.min(this.tickMax, (t) => t);
		let m2 = _.min(this.tickMin, (t) => t);

		return m1 > m2 ? m2 : m1;
	}

	drawTicTockBand() {
		if (this.directionClockwise) {
			this.angle = (this.angle + rateOfChange) % 360;
		} else {
			this.angle = (this.angle - rateOfChange) % 360;
		}

		for (let i = 0; i < this.maxRotations; i++) {
			this.drawTick((this.angle + i * this.angleFind) % 360, this.angleFind, i);
		}
	}

	drawTick(topAngle, angleFind, index) {
		let point1 = this.findPointByAngleAndCircle(topAngle, this.radius());

		if (this.ticksTarget[index] == 0) {
			this.tick[index] = this.tickMin[index];
			this.ticksTarget[index] = this.tickMax[index];
		}

		if (this.tick[index] >= this.tickMax[index]) {
			this.tickMin[index] = this.newTargetTock();
			this.ticksTarget[index] = this.tickMin[index];
		}

		if (this.tick[index] <= this.tickMin[index]) {
			this.tickMax[index] = this.newTargetTock();
			this.ticksTarget[index] = this.tickMax[index];
		}

		if (this.ticksTarget[index] > this.tick[index]) {
			this.tick[index] += this.rateOfTickChange;
		} else {
			this.tick[index] -= this.rateOfTickChange;
		}

		let point2 = this.findPointByAngleAndCircle(topAngle, this.tick[index]);

		line(point2.x, point2.y, point1.x, point1.y);
	}

	newTargetTock() {
		return random(
			this.currentBandSize + minBandSize,
			this.currentBandSize + maxBandSize
		);
	}

	findPointByAngleAndCircle(a, r) {
		let x = this.x + r * cos(degrees_to_radians(a));
		let y = this.y + r * sin(degrees_to_radians(a));

		return { x: x, y: y };
	}
}
