
// JS code for logging in or creating new account

$('#loginBtn').on('click', function(){
	$('.loginModalWindow').show();
})

$('.loginClose').on('click', function(){
	$('.signUpWrapper').hide()
	$('.signInWrapper').show()
	$('.loginModalWindow').hide();
})

$('.toSignUp').on('click', function(){
	$('.signUpWrapper').show()
	$('.signInWrapper').hide()
})

$('.toLogin').on('click', function(){
	$('.signUpWrapper').hide()
	$('.signInWrapper').show()
})

