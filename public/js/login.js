
// JS code for logging in or creating new account

$('#loginBtn').on('click', function(){
	$('.loginModalWindow').show();
	$('.loginModalWindow').css('display', 'flex');
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
	    // dataType: 'json; charset=utf-8',
	    success: function(d) {
	    	var response = d.trim();
	    	if (response) {
	    		console.log('it worked');
	    	}else{
	    		console.log('it failed');
	    	}
	    	
	      //display message back to user here
	      // if account was created successfully
	      	clearCreateAccountForm();
	      	displayMessage();

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

function validateFormValues(){
	var fnameValid = false;
	var lnameValid = false;
	var emailValid = false;
	var pass1 = false;
	var pass2 = false;

	$( "#ca-firstName" ).keyup(function(){
		input = $(this).val().trim();
		if(input.length<2 || input.length > 50){
			$(this).css('background-color', 'rgb(255,255,255)');
			fnameValid = false;
		}else{
			$(this).css('background-color', 'rgb(218, 226, 215)')
			fnameValid = true;
		}
		isValid()
	})

	$( "#ca-lastName" ).keyup(function() {
	  // check to make sure last name is a string between 2 and 50 chars
	  input = $(this).val().trim();
		if(input.length<2 || input.length > 50){
			$(this).css('background-color', 'rgb(255,255,255)');
			lnameValid = false;
		}else{
			$(this).css('background-color', 'rgb(218, 226, 215)')
			lnameValid = true;
		}
	  	isValid()
	});

	$( "#ca-email" ).keyup(function() {
	  // check to make sure email is a valid email address
	  	var input=$(this).val().trim();
	  	var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
		var is_email=re.test(input);
		if(!is_email || input.length < 3){
			// display email error message
			$(this).css('background-color', 'rgb(255,255,255)');
			emailValid = false;
		}else{
			$(this).css('background-color', 'rgb(218, 226, 215)');
			emailValid = true;
		}
		isValid()
	});
	$( "#ca-passOne" ).keyup(function() {
		input = $(this).val().trim();
		if(input.length<6 || input.length > 25){
			$(this).css('background-color', 'rgb(255,255,255)');
			pass1 = false;
		}else{
			$(this).css('background-color', 'rgb(218, 226, 215)');
			pass1 = true;
		}
		isValid()
	});
	
	// check to make sure this matches password one
	$("#ca-passTwo").keyup(function() {
	    var password = $("#ca-passOne").val().trim();
	    var confirmPassword = $("#ca-passTwo").val().trim();
	    if (password != confirmPassword){
	    	$(this).css('background-color', 'rgb(255,255,255)');
	    	pass2 = false;
	    }else{
	    	$(this).css('background-color', 'rgb(218, 226, 215)');
	    	pass2 = true;
	    }
	    isValid()
	});

	function isValid(){
		console.log(pass2, pass1, emailValid, lnameValid, fnameValid)
		if (fnameValid && lnameValid && emailValid && pass1 && pass2) {
			console.log('names valid')
			// disable submit button until all form values are validated
			$('#submitCreateAccount').prop('disabled', false);
		}else{
			// disable submit button until all form values are validated
			$('#submitCreateAccount').prop('disabled', 'disabled');
		}
	}
	
}
validateFormValues(); // call the function











function clearCreateAccountForm(){
	console.log('clear form');
}

function displayMessage(){
	console.log('Welcome to the site!!')
}

