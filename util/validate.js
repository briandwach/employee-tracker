// Object exported for calling functions to validate user input to Inquirer prompts

const invalid = 'Entry is invalid, please try again.';

const validate = {

    string(input) { const pattern = /^[a-zA-Z\s]+$/; return pattern.test(input) && input !== '' ? true : invalid; },

    nan(input) { const pattern = /^[0-9]*\.?[0-9]*$/; return pattern.test(input) && input !== '' ? true : invalid; }
};

module.exports = validate;