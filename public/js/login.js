
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

$('#createAccountForm').submit(function(e) {
	$.ajax({
	    type: "POST",
	    url: "../../private/createAccount.php",
	    data: $(this).serialize(),
	    success: function(d) {
	    	console.log('success',d)
	      //display message back to user here
	    }
	  });
	  return false;

	// $.post("../../private/login.php", $(this).serialize())
	// $.post("../../private/login.php", $(this).serialize(), function(data){
	// 	console.log(data)
	// });
	// // console.log(e,$(this).serialize())
	// e.preventDefault();
});




