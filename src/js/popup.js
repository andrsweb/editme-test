import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'


document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	showPopup('.main-popup', '.popup-button', '#popup-lock')
} )

const showPopup = ( selector, btn, lock) => {
	const popupWrapper    = document.querySelector( selector )
	const popButtons       = document.querySelectorAll( btn )
	const closeButtons     = document.querySelectorAll('.popup-close')
	setTargetElement( document.querySelector( lock ) )

	if( ! popupWrapper ) return
	popButtons.forEach( button => {
		button.addEventListener('click', () => {
			if(!popupWrapper.classList.contains('showed')) {
				popupWrapper.classList.add('showed')
				disableBodyScroll( getTargetElement(), { reserveScrollBarGap: true } )
			} else {
				popupWrapper.classList.remove( 'showed')
				enableBodyScroll( getTargetElement() )
			}
		})
	})

	closeButtons.forEach( closeBtn => {
		closeBtn.addEventListener( 'click', () => {
			popupWrapper.classList.remove( 'showed' )
			enableBodyScroll( getTargetElement() )
		} )
	})

	popupWrapper.addEventListener( 'click', e => {
		e.stopPropagation()

		const target = e.target

		if ( target.className && target.classList.contains( 'popup-wrapper' ) ) {
			popupWrapper.classList.remove( 'showed' )
			enableBodyScroll( getTargetElement() )
		}
	} )
}