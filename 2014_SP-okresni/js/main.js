$(function(){
	fixMenu();


	$("#text").click(function(event){
		$("*").toggleClass("dvojnasobne");
	});

	$("#kontrast").click(function(event){
		$("*").each(function(index,data){
			var color = $(data).css("color");
			var bgcolor = $(data).css("background-color");
			$(data).css("background-color",color);
			$(data).css("color",bgcolor);
		});
	});

	$("img").hover(function() {
		var img = this;
		$("#desc").val($(img).attr("alt"));
	})
});

function fixMenu() {
	var menu_place = $('header').offset().top + $('header').height(); //CSS selektor, od které pozice již menu bude přichyceno
	var menu = $('nav'); //CSS selektor pro menu, kterému se bude přidávat/oddělávat třída

	$(window).scroll(function(){

		var scroll_top = $(window).scrollTop(); 
		
		if (scroll_top > menu_place){
			menu.addClass("fixed");
		}
		else {
			menu.removeClass("fixed");
		}
	});
}
