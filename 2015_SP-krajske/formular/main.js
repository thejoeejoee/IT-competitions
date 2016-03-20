jQuery(function($) {
	var google = function(val) {
		window.location = "https://www.google.cz/#q=" + encodeURIComponent(val);
 	};
 	var seznam = function(val) {
		window.location = "http://search.seznam.cz/?q=" + encodeURIComponent(val);
 	};
 	var cznic = function(val) {
 		window.location = "http://www.nic.cz/whois/?d=" + encodeURIComponent(val);
 	};
 	var tinyurl = function(val) {
 		window.location = "http://tinyurl.com/create.php?url=" + encodeURIComponent(val);
 	};
 	var js = function(val) {
 		try {
 			eval(val);	
 		} catch (e) {
 			alert("Vyskytla se chybička, asi nevalidní javascript!");
 		}
 	};
 	var services = {
 		google: google,
 		seznam: seznam,
 		cznic: cznic,
 		tinyurl: tinyurl,
 		js: js
 	};
 	var onSubmit = function($submitter, val) {
		var service = $submitter.data('action');
		var val = $submitter.parent().children('input').val();
		services[service](val);
	};

	$("li button").click(function(event) {
		onSubmit($(this));
	});
	$("li input").keyup(function(event) {
		// 13 - enter key
		if (event.keyCode == 13 && $("li:first-child button").length == 1) {
			onSubmit($(this).parent().children('button'));
		};
	});
});