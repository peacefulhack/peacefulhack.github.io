$(".js-delete").on("click", function () {
	
	if($('.mobile__wrapper').hasClass('active')) {
		TweenLite.killTweensOf('.mobile__app');
		happyKawaii();
	} else {
		wiggle(".mobile__app");
		mildWorry($(".mobile__app"));
	}
	
	setTimeout(function(){
		$('.mobile__wrapper').toggleClass('active');
		$('.js-delete').toggleClass('active');
	},300)
	
	/*alternative with no variation
		var tl = new TimelineMax({repeat:-1})
			.to('.mobile__app',0.06,{rotation:1.5, x: -1.5,ease:'rotationEase'})
			.to('.mobile__app',0.06,{rotation:-1.5, x: 1.5, });*/
	
});

function wiggle(selector) {
	$(selector).each(function () {
		wiggleProp(this, "rotation", -2, 2);
		wiggleProp(this, "x", -2, 2);
		wiggleProp(this, "y", -2, 2);
	});
}

function wiggleProp(element, prop, min, max) {
	var duration = 0.05;
	var tweenProps = {
		ease: Power1.easeInOut,
		onComplete: wiggleProp,
		onCompleteParams: [element, prop, min, max]
	};
	tweenProps[prop] = Math.random() * (max - min) + min;
	TweenMax.to(element, duration, tweenProps);
}

function happyKawaii() {
	gsap.to('.mobile__app', {
		x: 0,
		y: 0,
		rotation: 0
	});
	gsap.to(".mouth", {
		duration: 0.6,
		ease: "expo.out",
		morphSVG: "M167.94,90.1c6.53,8.68,18.12,10.82,26.95,4.11,2.52-1.92,0-6.27-2.53-4.32-6.44,4.9-15.09,4.36-20.1-2.31-1.91-2.54-6.26,0-4.32,2.52Z"
	});

	gsap.to(".eyebrow-right", {
		duration: 0.3,
		ease: "expo.out",
		opacity: 0,
		morphSVG: "#eyebrow-right-neutral"
	});
	gsap.to(".eyebrow-left", {
		duration: 0.3,
		ease: "expo.out",
		opacity: 0,
		morphSVG: "#eyebrow-left-neutral"
	});
	gsap.to(
		".eye-white-big-r, .eye-white-big-r, .eye-white-big-l, .eye-white-big-l",
		{
			duration: 0.3,
			ease: "expo.out",
			x: 0,
			y: 0
		}
	);
	gsap.to(".blush", {
		duration: 0.6,
		ease: "expo.out",
		opacity: 1
	});
	gsap.to(".short-tear", {
		duration: 0.6,
		ease: "expo.out",
		opacity: 0
	});
	gsap.to(".longhand-l", {
		duration: 0.4,
		ease: "expo.out",
		morphSVG: { shape: "#longhand-1-l", shapeIndex: -1 }
	});
	gsap.to(".longhand-r", {
		duration: 0.4,
		ease: "expo.out",
		morphSVG: { shape: "#longhand-1-r", shapeIndex: -1 }
	});
}

function mildWorry(el) {
	var mouth = el.find(".mouth"),
		blush = el.find(".blush"),
		shortTear = el.find(".short-tear"),
		eyebrowRight = el.find(".eyebrow-right"),
		eyebrowLeft = el.find(".eyebrow-left"),
		eyeLgRight = el.find(".eye-white-big-r"),
		eyeSmRight = el.find(".eye-white-small-r"),
		eyeLgLeft = el.find(".eye-white-big-l"),
		eyeSmLeft = el.find(".eye-white-small-l"),
		handLeft = el.find(".longhand-l"),
		handRight = el.find(".longhand-r");

	var tl = new TimelineMax();
	tl
		.add("start")
		.to(mouth, 1, {
			duration: 0.6,
			ease: "expo.out",
			morphSVG:
				"M172.88,94.8l16.93.7c3.21.13,3.21-4.87,0-5l-16.93-.7c-3.21-.14-3.21,4.86,0,5Z"
		})
		.to(
			shortTear,
			{
				duration: 0.6,
				ease: "expo.out",
				opacity: 0
			},
			"start"
		)
		.to(
			blush,
			{
				duration: 0.6,
				ease: "expo.out",
				opacity: 0
			},
			"start"
		)
		.to(
			eyebrowRight,
			{
				duration: 0.3,
				ease: "expo.out",
				opacity: 1,
				morphSVG: "#eyebrow-right-sad"
			},
			"start"
		)
		.to(
			eyebrowLeft,
			{
				duration: 0.3,
				ease: "expo.out",
				opacity: 1,
				morphSVG: "#eyebrow-left-sad"
			},
			"start"
		)
		.to(
			eyeLgRight,
			{
				duration: 0.3,
				ease: "expo.out",
				x: 8,
				y: -11
			},
			"start"
		)
		.to(
			eyeSmRight,
			{
				duration: 0.3,
				ease: "expo.out",
				x: -9,
				y: 6
			},
			"start"
		)
		.to(
			eyeLgLeft,
			{
				duration: 0.3,
				ease: "expo.out",
				x: -13,
				y: -15
			},
			"start"
		)
		.to(
			eyeSmLeft,
			{
				duration: 0.3,
				ease: "expo.out",
				x: 6,
				y: 11
			},
			"start"
		)
		.to(
			handLeft,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-1-l", shapeIndex: 1 }
			},
			"start"
		)
		.to(
			handRight,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-1-r", shapeIndex: 1 }
			},
			"start"
		);
}

function panic(el) {
	var mouth = el.find(".mouth"),
		blush = el.find(".blush"),
		shortTear = el.find(".short-tear"),
		eyebrowRight = el.find(".eyebrow-right"),
		eyebrowLeft = el.find(".eyebrow-left"),
		eyeLgRight = el.find(".eye-white-big-r"),
		eyeSmRight = el.find(".eye-white-small-r"),
		eyeLgLeft = el.find(".eye-white-big-l"),
		eyeSmLeft = el.find(".eye-white-small-l"),
		handLeft = el.find(".longhand-l"),
		handRight = el.find(".longhand-r"),
		longTearRight = el.find(".longtear-r"),
		longTearLeft = el.find(".longtear-l");

	var tl = new TimelineMax();
	tl
		.add("start")
		.to(mouth, {
			duration: 0.6,
			ease: "expo.out",
			morphSVG: "#mouth-shocked"
		})
		.to(
			shortTear,
			{
				duration: 0.6,
				ease: "expo.out",
				opacity: 1
			},
			"start"
		)
		.to(
			handLeft,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-3-l", shapeIndex: 1 }
			},
			"start"
		)
		.to(
			handRight,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-3-r", shapeIndex: 1 }
			},
			"start"
		)
		.to(
			longTearRight,
			{
				duration: 0.4,
				ease: "expo.out",
				opacity: 0
			},
			"start"
		)
		.to(
			longTearLeft,
			{
				duration: 0.4,
				ease: "expo.out",
				opacity: 0
			},
			"start"
		);
}

function bigPanic(el) {
	var mouth = el.find(".mouth"),
		blush = el.find(".blush"),
		shortTear = el.find(".short-tear"),
		eyebrowRight = el.find(".eyebrow-right"),
		eyebrowLeft = el.find(".eyebrow-left"),
		eyeLgRight = el.find(".eye-white-big-r"),
		eyeSmRight = el.find(".eye-white-small-r"),
		eyeLgLeft = el.find(".eye-white-big-l"),
		eyeSmLeft = el.find(".eye-white-small-l"),
		handLeft = el.find(".longhand-l"),
		handRight = el.find(".longhand-r"),
		longTearRight = el.find(".longtear-r"),
		longTearLeft = el.find(".longtear-l");

	gsap.set(longTearRight, {
		transformOrigin: "top center",
		scale: 0,
		opacity: 0
	});
	gsap.set(longTearLeft, {
		transformOrigin: "top center",
		scale: 0,
		opacity: 0
	});
	var tl = new TimelineMax();
	tl
		.add("start")
		.to(mouth, {
			duration: 0.6,
			ease: "expo.out",
			morphSVG: "#mouth-sad"
		})
		.to(
			handLeft,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-4-l", shapeIndex: 1 }
			},
			"start"
		)
		.to(
			handRight,
			{
				duration: 0.4,
				ease: "expo.out",
				morphSVG: { shape: "#longhand-4-r", shapeIndex: 1 }
			},
			"0.2"
		)
		.to(
			longTearRight,
			{
				duration: 0.7,
				ease: "expo.out",
				opacity: 1,
				scale: 1
			},
			"start"
		)
		.to(
			longTearLeft,
			{
				duration: 0.7,
				ease: "expo.out",
				opacity: 1,
				scale: 1
			},
			"0.1"
		);
}

$(".mobile__app").on("mouseenter", function () {
	panic($(this));
});
/*
$(".mobile__app").on("mousedown", function () {
	bigPanic($(this));
});*/

/*
$(".mobile__app").on("mouseup", function () {
	TweenLite.killTweensOf($(this));
	panic($(this));
	wiggle($(this));
});*/

$('.delete').on('click', function(){
	var item = $(this).closest('.mobile__app');
	bigPanic(item);
	setTimeout(function(){
		gsap.to(item, {
			duration: 0.6,
			ease: Back.easeIn.config(2),
			scale: 0 }
		);
	}, 900);
	setTimeout(function(){
		item.remove();
	}, 2000);
});

$(".mobile__app").on("mouseleave", function () {
	TweenLite.killTweensOf($(this));
	mildWorry($(this));
	wiggle($(this));
});
