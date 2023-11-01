$(document).ready(function() {
    function showError(fieldId, errorId, message) {
        $(fieldId).css('border', '1px solid red');
        $(errorId).css('color', 'red').text(message).show();
    }

    function clearError(fieldId, errorId) {
        $(fieldId).css('border', '');
        $(errorId).css('color', '').text('').hide();
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
        return emailRegex.test(email);
    }

    $('#email, #username, #password, #confirm-password').on('change', function() {
        const fieldId = `#${this.id}`;
        const errorId = `#${this.id}-error`;

        clearError(fieldId, errorId);

        if ($(this).val() === '') {
            showError(fieldId, errorId, 'This field is required.');
        } else if (this.id === 'email' && !validateEmail($(this).val())) {
            showError(fieldId, errorId, 'Invalid email format. Must be a northeastern.edu email.');
        } else if (this.id === 'username') {
            if ($(this).val().length < 4) {
                showError(fieldId, errorId, 'Username must be at least 4 characters.');
            } else if ($(this).val().length > 12) {
                showError(fieldId, errorId, 'Username can be at most 12 characters.');
            }
        }else if (this.id === 'username' && !/^[a-zA-Z0-9._-]+$/.test($(this).val())) {
            showError(fieldId, errorId, 'Special characters not allowed.');}
         else if (this.id === 'password' && $(this).val().length < 6) {
            showError(fieldId, errorId, 'Password must be at least 6 characters.');
        } else if (this.id === 'confirm-password' && $('#password').val() !== $(this).val()) {
            showError(fieldId, errorId, 'Passwords do not match.');
        }
    });

    $('#login-form').on('change', function() {
        if ($('#email').val() !== '' &&
            $('#username').val() !== '' &&
            $('#password').val() !== '' &&
            $('#confirm-password').val() !== '' &&
            !$('#email-error').is(':visible') &&
            !$('#username-error').is(':visible') &&
            !$('#password-error').is(':visible') &&
            !$('#confirm-password-error').is(':visible')) {
            $('#login-button').prop('disabled', false);
        } else {
            $('#login-button').prop('disabled', true);
        }
    });

   $('#login-button').on('click', function() {
    
    const username = $('#username').val();

    const loginSuccessful = true; 

    if (loginSuccessful) {
        document.cookie = `username=${username}; path=/`;
        window.location.href = 'calculator.html';
    } else {
        alert('Login failed. Please try again.');
    }
});
});
