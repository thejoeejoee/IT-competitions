$(function(){
	$(".toggle").click(function(event){
		$(this).parent().children().each(function(index, val) {
			if (index!=0) {
				$(val).slideToggle(1000);
			}
		});
	});
});
