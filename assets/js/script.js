$(window).bind("scroll",display);
function display () {
    if($(document).scrollTop()>300) {
        $("#top").show();
    }else {
        $("#top").hide();
    }
}