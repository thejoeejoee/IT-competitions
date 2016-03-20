$(function() {
	function deg2rad (deg) {
			return (deg/180) * Math.PI;
		}
		var canvas = document.getElementById("c"),
			c = canvas.getContext("2d"),
			pocet = prompt("Počet prvků?"),

			dil = 360/pocet,
			sirka = canvas.width,
			vyska = canvas.height,

			stred = {
				x: sirka/2,
				y: vyska/2
			}

		for (var uhel1 = 0; uhel1 < 360 ; uhel1 += dil) {
			x1 = stred.x + sirka * 0.5 * Math.cos(deg2rad(uhel1));
			y1 = stred.y - vyska * 0.5 * Math.sin(deg2rad(uhel1));
			
			uhel2 = uhel1+dil;

			x2 = stred.x + sirka * 0.5 * Math.cos(deg2rad(uhel2));
			y2 = stred.y - vyska * 0.5 * Math.sin(deg2rad(uhel2));

			c.beginPath();
			c.moveTo(stred.x, stred.y)
			c.lineTo(x1, y1);
			c.closePath();
			c.stroke();

			c.beginPath();
			c.arc(stred.x, stred.y,stred.x,deg2rad(uhel1),deg2rad(uhel2));
			c.moveTo(x1,y1);
			c.closePath();
			c.stroke();

		};
		
		



	
});


