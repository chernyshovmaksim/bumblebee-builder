import Swiper, { Pagination, Navigation } from "swiper";
import "swiper/css/bundle";

export default () => {
	Swiper.use([Pagination, Navigation]);
	const swiper = new Swiper(".swiper-product", {
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
		},
	});
};
