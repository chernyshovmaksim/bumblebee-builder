let popupBtns = $('[data-popup]');

popupBtns.click(function (e) {
	$('.popup').addClass('active');
});

$(document).click(e => {
	if ($(e.target).is('.popup') && $(e.target).hasClass('active')) {
		$(e.target).removeClass('active');
	}
});
