import smoothscroll from 'smoothscroll-polyfill';

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	smoothscroll.polyfill()
	smoothScrollForAnchors()
} )

const smoothScrollForAnchors = () => {
	const anchors = document.querySelectorAll( '.anchor' )
		if ( ! anchors ) return

		for ( let anchor of anchors ) {
			anchor.addEventListener( 'click', function ( e ) {
				e.preventDefault()

			const blockID = anchor.getAttribute( 'href' ).substring( 1 )

			document.getElementById( blockID ).scrollIntoView( {
				behavior: 'smooth',
				block: 'start'
			} )
		} )
	}
}