import { isInScope } from "./common/global"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	showMap()
} )

const showMap = () => {

	const map = document.querySelector( '.iframe-map' )

	if( ! map ) return

	document.addEventListener( 'scroll', () => {
			if ( isInScope( '.map', window.scrollY ) ) {
				if( ! map.classList.contains( 'loaded' ) ) {
					map.src= 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95610.9448566796!2d3.647653212617322!3d50.97058304414363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c36d8132788611%3A0x294be92da1399860!2zSG9vZ2xhdGVtLCA5ODMwINCh0LjQvdGCLdCc0LDRgNGC0LXQvdGBLdCb0LDRgtC10LwsINCR0LXQu9GM0LPQuNGP!5e0!3m2!1sru!2sth!4v1690617378492!5m2!1sru!2sth'
					map.classList.add( 'loaded' )
				}
			}
		}
	)
}