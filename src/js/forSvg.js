import { renderSVGs } from "./common/global"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	renderSVGs( document.querySelector( '.assets-swiper' ) )
	renderSVGs( document.querySelector( '.gallery__navigation' ) )
})

