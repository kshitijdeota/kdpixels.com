window.onscroll = function() {stickyHeader()};
var header = document.getElementById("kd-page-header");
function stickyHeader() {
	if (document.body.contains(header)) {
		var sticky = header.offsetTop;
		if (window.pageYOffset > sticky) {
			header.classList.add("sticky");
		} else {
			header.classList.remove("sticky");
		}
	}
}

var bunsPrimary = $("#kd-buns-primary");
var bunsSecondary = $("#kd-buns-secondary");

$(document).ready(function() {
	$("#kd-buns-primary").click(function() {
		$(this).toggleClass('open');
		$("html, body").toggleClass('noscroll');
		$(".kd-nav-primary").slideToggle();
		$(".kd-branding .kd-nav-social").fadeToggle();
	});

	$("#kd-buns-secondary").click(function() {
		$(this).toggleClass('open');
		$("html, body").toggleClass('noscroll');
		$(".kd-nav-secondary").slideToggle();
	});

	$(".kd-footer h3").click(function() {
		$(this).next('nav').slideToggle();
		$(this).toggleClass('rotate45');
	});
});