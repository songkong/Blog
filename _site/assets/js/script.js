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
