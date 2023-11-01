$(document).ready(function() {
    function showError(fieldId, errorId, message) {
        $(fieldId).css('border', '1px solid red');
        $(errorId).css('color', 'red').text(message).show();
    }

    function clearError(fieldId, errorId) {
        $(fieldId).css('border', '');
        $(errorId).css('color', '').text('').hide();
    }

    function validateNumberInput(value) {
        if (value === '') {
            return 'This field is required.';
        }
        if (!/^[+-]?\d*(\.\d+)?$/.test(value)) {
            return 'Please enter a valid number.';
        }
        if (parseFloat(value) === Infinity || isNaN(value)) {
            return 'Please enter a valid number (not infinite or NaN).';
        }
        return '';
    }

    $('#number1, #number2').on('change', function() {
        const fieldId = `#${this.id}`;
        const errorId = `#${this.id}-error`;

        clearError(fieldId, errorId);

        const errorMessage = validateNumberInput($(this).val());
        if (errorMessage) {
            showError(fieldId, errorId, errorMessage);
        }
    });

    const calculate = (operation) => {
        const num1 = parseFloat($('#number1').val());
        const num2 = parseFloat($('#number2').val());

        if (!isNaN(num1) && !isNaN(num2)) {
            const result = operation(num1, num2);
            $('#result').val(result);
        } else {
            $('#result').val('');
        }
    };

    $('#add-button').on('click', () => calculate((a, b) => a + b));
    $('#subtract-button').on('click', () => calculate((a, b) => a - b));
    $('#multiply-button').on('click', () => calculate((a, b) => a * b));
    $('#divide-button').on('click', () => calculate((a, b) => (b !== 0) ? a / b : 'Cannot divide by zero'));
    $('#reset-button').on('click', function() {
        $('#number1').val('');
        $('#number2').val('');

        clearError('#number1', '#number1-error');
        clearError('#number2', '#number2-error');
        $('#result').val('');
    });


    const cookies = document.cookie.split(';');
    let username = null;
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'username') {
            username = value;
            break;
        }
    }

    if (username) {
        $('#username-display').text(`Welcome, ${username}!`);
    }
});
