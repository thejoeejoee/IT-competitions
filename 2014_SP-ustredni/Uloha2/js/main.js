$(function(){
	start();
	function start () {
		var rnd = 5*1000*Math.random(),
			counts = [0,0,0,0,0];
	

	timeout = setTimeout(function(){
		var time = Date.now(),
		$screen = $(window),
		diff = 0;

		$('<div class="square"></div>')
			.appendTo('body')
			.css("left", 100 + Math.random()*($screen.width() - 200)) //random position on screen
			.css('top', 100 + Math.random()*($screen.height() - 200))
			.click(function(e) {
				diff = Date.now() - time;
				$(this).remove();
				if (diff > 5000) {
					mark = 5;
				} else if(diff > 2000) {
					mark = 4;
				} else if(diff > 1500) {
					mark = 3;
				} else if(diff > 1000) {
					mark = 2;
				} else {
					mark = 1;
				};
				counts[mark-1]++;
				$("h1").text("Vaše známka je " + mark + ".");
				rgb = new Array(
					Math.round(2 * Math.random() * 255/3 + 255/3),
					Math.round(2 * Math.random() * 255/3 + 255/3),
					Math.round(2 * Math.random() * 255/3 + 255/3)
				);
				$('<div class="item"></div>') //one mark adding to mark column
				.appendTo("."+mark)
				.css("background-color", 'rgb('+ rgb.join(",") +')');

				$.each(counts, function(key,value) { //recomputing height of every marks
					len = $(".mark." + key).children().length;
					h = ($screen.height() * 0.6)/len;
					$(".mark." + key).children().each(function(i,el) {
						$(this).css("height", h).css("bottom",i*h);
					});
				});
				start(); //restart after click and recomputing
			});
	},rnd); //random time to generate
	}
});