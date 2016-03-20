<!doctype html>
<html lang="cs">
<head>
	<meta charset="UTF-8">
	<meta name="author" content="Josef Kolář 2A, VOŠ a SPŠE Olomouc">
	<title>Krajské kolo soutěže v programování</title>
	<style>
	#sipka {
		position: absolute;
		left: 510px;
		top: 221px;
		vertical-align: middle;
		font-size: 400%;
		display: inline;
		z-index: 99;
	}
	#c {
		display: inline;
		z-index: 120;
	}
	</style>
	<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
</head> 
<body>
	<canvas id="c" width="500" height="500">Nejde canvas</canvas>
	<div id="sipka">◄</div>
	<script>
	$(function() {
	function deg2rad (deg) {
		return (deg/180) * Math.PI;
	}
		var canvas = document.getElementById("c"),
			c = canvas.getContext("2d"),
			pocet = prompt("Počet prvků?"),
			polozky = new Array(),
			dil = 360/pocet, //
			sirka = canvas.width,
			vyska = canvas.height,
			stred = {
				x: sirka/2,
				y: vyska/2
			}, 
			stHandle, 
			deg = 0, 
			time;

			c.strokeStyle = "black";
			c.font = "30px Verdana";
			c.textAlign = "end";
			c.textBaseLine = "middle";

		for (var uhel = 0; uhel < 360 ; uhel += dil) {
			x1 = stred.x + sirka * 0.5 * Math.cos(deg2rad(uhel));
			y1 = stred.y + vyska * 0.5 * Math.sin(deg2rad(uhel));
			polozka = prompt("Jméno položky?");
			polozky.push(polozka);
			
			rgb = new Array(
				Math.round(Math.random()*255/3 + 255/3),
				Math.round(Math.random()*255/3 + 255/3),
				Math.round(Math.random()*255/3 + 255/3)
			);

			c.fillStyle = 'rgb('+ rgb.join(",") +')';
			c.lineWidth = 2;
			c.beginPath();
			c.moveTo(stred.x, stred.y);
			c.lineTo(x1, y1);
			c.arc(stred.x, stred.y,stred.x,deg2rad(uhel),deg2rad(uhel + dil));
			c.lineTo(stred.x, stred.y);
			c.closePath();
			c.fill();
			c.save();

			c.translate(stred.x, stred.y);
			c.rotate(deg2rad(uhel + dil/2));
			c.translate(-stred.x, -stred.y); 

			c.strokeText(polozka,sirka-20,stred.y,sirka/4);
			c.restore();
						
		};
		polozky.reverse();
	$("#c").click(function(event) {
		$(this).css({'transition': 'ease 0s'});
        $(this).css({'transform': 'rotate(0deg)'});
        
        window.clearTimeout(stHandle);
        stHandle = 0;

		deg = -deg + 360 + Math.random()*960;
		time = 1 + Math.random()*5;

		var pozice = (deg - (deg % (360/pocet)))/(360/pocet) % pocet;

		$(this).css({'transition': 'ease '+ time +'s'});
        $(this).css({'transform': 'rotate(' + deg + 'deg)'});


        stHandle = setTimeout(function(){alert("Vyhráli jste "+polozky[pozice]+"! Gratulujeme!")},time*1000);
	});

	
});



	</script>
</body>
</html>