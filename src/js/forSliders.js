import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	swiperInit('.assets-swiper', '.assets-next', '.assets-prev')
})

const swiperInit = (selector, next, prev) => {
	const swiper = new Swiper(selector, {
		effect: 'coverflow',
		grabCursor: true,
		loop: true,
		slidesPerView: 1,
		modules: [Navigation],
		navigation: {
			nextEl: next,
			prevEl: prev
		}
	})
}



