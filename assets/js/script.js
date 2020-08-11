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
	
	}
})

/*
 * Pagination
 */
$(function(){
  /* initiate the plugin */
  $("div.page-holder-one").jPages({
      containerID  : "pag-itemContainer-one",
      previous: "«",
      next: "»",
      perPage      : 5,  /* num of items per page */
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  });
  $("div.page-holder-two").jPages({
      containerID  : "pag-itemContainer-two",
      previous: "«",
      next: "»",
      perPage      : 5,  /* num of items per page */
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  });
});
