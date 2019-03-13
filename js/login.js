
// JS code for logging in or creating new account
$(document).ready(function() {
	$('#loginBtn').on('click', function(){
		$('.loginModalWindow').show();
		$('.loginModalWindow').css('display', 'flex');
	})

	$('.loginClose').on('click', function(){
		$('.signUpWrapper').hide();
		$('.signInWrapper').show();
		$('.loginModalWindow').hide();
		$('#welcomeWrapper').hide();
	})

	$('.toSignUp').on('click', function(){
		$('.signUpWrapper').show();
		$('.signInWrapper').hide();
	})

	$('.toLogin').on('click', function(){
		$('.signUpWrapper').hide();
		$('.signInWrapper').show();
	})

	$('#welcomeToLogin').on('click', function(){
		// show login page
		$('.signUpWrapper').hide();
		$('#welcomeWrapper').hide();
		$('.signInWrapper').show();

	})

	$('#createAccountForm').submit(function(e) {
		$.ajax({
		    type: "POST",
		    url: "../../private/createAccount.php",
		    data: $(this).serialize(),
		    // dataType: 'json; charset=utf-8',
		    success: function(d) {
		    	var response = d.trim();
		    	var success = response.split(':')[0]
		    	var welcomeName = response.split(':')[1]
		    	console.log(response)
		    	
		    	if (success) {
		    		// set welcome name var to be used on the welcome screen
		    		app.welcomeName = welcomeName;
		    		//display message back to user here
			        // if account was created successfully
			      	displayMessage();
			      	// clear form values
			      	clearCreateAccountForm();
		    	}else{
		    		console.log('it failed');
		    	}
		    }
		});
		return false;
	});


	function clearCreateAccountForm(){
		// on account create success, loop through all form inputs and set value to empty
		$.each($('#createAccountForm input'), function(i,v){
			if(v.type != 'submit'){
				$(v).val(''); // reset value to nothing
				$(v).css('background-color', 'rgb(255,255,255)'); // reset background color to white
			}
		})
	}

	function displayMessage(){
		$('#createAccountWrapper').hide();
		$('#loginWrapper').hide();
		$('#welcomeWrapper').show();
		//welcomeMemberName
		console.log(app.welcomeName)
		// customize welcome message
		$('#welcomeMemberName').html(app.welcomeName);
	}


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
			if (fnameValid && lnameValid && emailValid && pass1 && pass2) {
				// disable submit button until all form values are validated
				$('#submitCreateAccount').prop('disabled', false);
			}else{
				// disable submit button until all form values are validated
				$('#submitCreateAccount').prop('disabled', 'disabled');
			}
		}
	}
	validateFormValues(); // call the function
})





