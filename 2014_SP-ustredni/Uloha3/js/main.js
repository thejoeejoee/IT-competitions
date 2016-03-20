$(function(){
	var $cifernik = $(".cifernik"),
	$mala = $("#mala"),
	$velka = $("#velka"),
	$vterinova = $("#vterinova"),
	rucicky = [$velka,$mala,$vterinova],
	params = [24,60,60],
	time = $.now();

	for (var i = 1; i <= 12; i++) { //cisla na ciferniku
		angle = (360/12 * i - 90)/180*Math.PI;

		left = (320 + Math.cos(angle) * (300-20));
		topx = (320 + Math.sin(angle) * (300-20));

		console.log(topx);
		$("<div>" + i + "</div>")
		.appendTo("body")
		.css("left", left)
		.css('top', topx);

	};

	timeset = function(d) {
			casy = [
				d.Hours+d.Minutes/60+d.Seconds/3600,
				d.Minutes+d.Seconds/60,
				d.Seconds
			];

		$.each(rucicky,function(key,val){
			angle = casy[key]/params[key] * 360;
			$(val).css("transform", "rotate(" + angle + "deg)");
		});
	};

	shake = function() {
		offset = 15;
		for (var i = 15; i > 0; i--) {
			offset = -offset - i;
			$("body").animate({
			"top": offset,
			"left": offset},
			20);
		};
		$("body").animate({
			"top": 0,
			"left": 0}, 20);
	};
	timeupdate = function() {
		time += 500;
		date = new Date(time);
		d = {
			Hours:date.getHours(),
			Minutes:date.getMinutes(),
			Seconds:date.getSeconds()
		};
		if (d.Hours == 0 && d.Minutes == 0 && d.Seconds ==0) {
			shake();
		}
		timeset(d);
		console.log(d);
	};



	$("input").click(function() {
		$.getJSON("http://time.jsontest.com",function(data) {
			console.log(data);
			time = data.milliseconds_since_epoch;
		});
	});

	setInterval("timeupdate()",500);
});