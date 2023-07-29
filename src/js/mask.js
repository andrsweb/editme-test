import Inputmask from "inputmask";

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	maskForInput('+7(999)-999-99-99', 'main-input')
	maskForInput('+7(999)-999-99-99', 'add-input')
	maskForInput('+7(999)-999-99-99', 'footer-input')
})

const maskForInput = (mask, id) => {
	const selector = document.getElementById(id)

	if( ! selector ) return

	Inputmask({ 'mask': mask, 'placeholder': '*', }).mask(selector)
}