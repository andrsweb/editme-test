import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	swiperInit('.assets-swiper', '.assets-next', '.assets-prev')
	swiperInit('.gallery-swiper', '.gallery-next', '.gallery-prev')
})

const swiperInit = (selector, next, prev) => {
	const swiper = new Swiper(selector, {
		grabCursor: true,
		loop:true,
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 30,
		initialSlide: 1,
		modules: [Navigation],
		navigation: {
			nextEl: next,
			prevEl: prev
		}
	})
}



