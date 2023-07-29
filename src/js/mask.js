import Inputmask from "inputmask";

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	maskForInput('+66(999)-999-99-99', 'popup-tel')
})

const maskForInput = (mask, id) => {
	const selector = document.getElementById(id)

	if( ! selector ) return

	Inputmask({ 'mask': mask, 'placeholder': '*', }).mask(selector)
}