import $ from 'jquery';
require("mmenu-light");

const menu = new MmenuLight(
	document.querySelector(".mobile-nav"),
	"(max-width: 1080px)"
);

menu.navigation({
	title: "Вывоз мусора Новосибирск"
});

const drawer = menu.offcanvas();

document.querySelector(".hamburger")
	.addEventListener("click", (event) => {
		event.preventDefault();
		drawer.open();
	});



let headerHeight = $('.header').outerHeight();

$('.nav__item').click(function () {
	let el = $(this).attr("href");

	if(/^#[a-z]+/.test(el)){
		$('html, body').animate({
					scrollTop: $(el).offset().top - headerHeight
				}, 500);
				drawer.close();
	}

	if($(this).hasClass('nav__callback')){
		drawer.close();
	}
	
});
