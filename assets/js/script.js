/* 
* Scroll to the top
*/

$(window).bind("scroll",display);
function display () {
    if($(document).scrollTop()>300) {
        //$("#top").show();
		$("#top").fadeIn(300);
    }else {
        //$("#top").hide();
		$("#top").fadeOut(300);
    }
}

/* 
* Tab of posts
*/
$(document).ready(function () {
	var tabContainer = $(".posts-tabs");
	if (tabContainer.length) {
		$(".tab-two").bind("click", showTabTwo);
		$(".tab-one").bind("click", showTabOne);
	}
	function showTabOne () {
		$(".tab-one").addClass("active");
		$(".tab-two").removeClass("active");
		$(".tab-two-list").addClass("tab-hidden");
		$(".tab-one-list").removeClass("tab-hidden");
		$(".page-holder-two").addClass("tab-hidden");
		$(".page-holder-one").removeClass("tab-hidden");
	}
	function showTabTwo () {
		$(".tab-two").addClass("active");
		$(".tab-one").removeClass("active");
		$(".tab-one-list").addClass("tab-hidden");
		$(".tab-two-list").removeClass("tab-hidden");
		$(".page-holder-one").addClass("tab-hidden");
		$(".page-holder-two").removeClass("tab-hidden");
	}
})
