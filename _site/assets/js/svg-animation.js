$(document).ready(function () {
    var bearPaw = Snap("#bear-paw-left");
	if (bearPaw) {
		var rotatePaw = function () {
			Snap.animate(-20, 20, function (val) {
				bearPaw.transform("r" + [val, 340, 400]);
			}, 2500);
			setTimeout(function(){
				Snap.animate(20, -20, function (val) {
					bearPaw.transform("r" + [val, 340, 400]);
				}, 2500);
			},2500);
		};
		rotatePaw();
		setInterval(rotatePaw,5000);
	}
    var sun = Snap("#sun");
	if (sun) {
		var rotateSun = function () {
			Snap.animate(0, 360, function (val) {
				sun.transform("r" + [val, 1400, 230]);
			}, 2500);
		};
		rotateSun();
		setInterval(rotateSun,2500);
	}
});