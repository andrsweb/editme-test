<?php

/**
 * Clean incoming value from trash.
 *
 * @param	mixed	$value	Some value to clean.
 * @return	mixed	$value	The same value, but cleaned.
 */
function as_clean_value( $value )
{
	$value = trim( $value );
	$value = stripslashes( $value );
	$value = strip_tags( $value );

	return htmlspecialchars( $value );
}

/**
 * Function checks if value length is between min and max parameters.
 *
 * @param   string	$value  Specific string..
 * @param   int		$min    Minimum symbols value length.
 * @param   int		$max	Maximum symbols value length.
 * @return  bool            True if OK, false if value length is too small or large.
 */
function as_check_length( string $value, int $min, int $max ): bool
{
	return ! ( mb_strlen( $value ) < $min || mb_strlen( $value ) > $max );
}

/**
 * Function checks name symbols.
 *
 * @param   string  $name   Some name.
 * @return  bool            True if OK, false if string has bad symbols.
 */
function as_check_name( string $name ): bool
{
	return preg_match('/^[a-zа-я\s]+$/iu', $name );
}

/**
 * Function checks phone symbols.
 *
 * @param   string  $phone  Some phone number.
 * @return  bool            True if OK, false if string has bad symbols.
 */
function as_check_phone( string $phone ): bool
{
	return preg_match('/^[0-9()+\-\s]+$/iu', $phone );
}

if( ! empty( $_POST ) && isset( $_POST['func'] ) ){
	switch( $_POST['func'] ){
		case 'popup-form':
			as_send_popup_form();
			break;

		case 'form':
			as_send_main_form();
			break;

		default:
			as_send_main_form();
	}
}

function as_send_popup_form(){
	$name		= isset( $_POST['popup-name'] ) ? as_clean_value( $_POST['popup-name'] ) : null;
	$tel		= isset( $_POST['popup-tel'] ) ? as_clean_value( $_POST['popup-tel'] ) : null;
	$title		= 'Fast message';

	// Required fields.
	if( ! $name || ! $tel ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Please complete all fields.'
		] );
		die();
	}

	// Only letters & spaces in name.
	if( ! as_check_name( $name ) ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Please enter correct name.'
		] );
		die();
	}

	// Check length to avoid very large text.
	if( ! as_check_length( $name, 1, 50 ) ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'The name must not exceed 50 characters'
		] );
		die();
	}

	if( ! as_check_length( $tel, 3, 30 ) ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'The phone number must not exceed 30 characters or be less than 3 characters.'
		] );
		die();
	}

	// Check phone symbols.
	if( ! as_check_phone( $tel ) ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Please enter correct phone number'
		] );
		die();
	}

	// Prepare message for mail.
	$message = "Hello!\n" .
		"{$title}:\n\n" .
		"Name - $name\n" .
		"Phone - $tel \n\n\n";

	as_send_email( $title, $message );
}

function as_send_main_form(){
	$name	= isset( $_POST['name'] ) ? as_clean_value( $_POST['name'] ) : null;
	$email	= isset( $_POST['email'] ) ? as_clean_value( $_POST['email'] ) : null;
	$text	= isset( $_POST['text'] ) ? as_clean_value( $_POST['text'] ) : null;
	$title	= 'Contacts form';


	// Prepare message for mail.
	$message = "Hello!\n" .
		"{$title}:\n\n" .
		"Name - $name\n" .
		"Email - $email\n" .
		"Message - $text \n\n\n";
	as_send_email( $title, $message );
}

/**
 * @param string $subject
 * @param string $message
 * @return void
 */
function as_send_email( string $subject, string $message ){
	// Mail headers.
	$headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"Reply-To: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

	$result = mail('Your email', $subject, $message, $headers );

	if( $result )
		echo json_encode( [
			'success'	=> 1,
			'message'	=> 'Thank you for your message! We will contact you as soon as possible.'
		] );	// Success.
	else
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Sending error. Please try again later.'
		] );	// Failed.
}

die();