const validate = {

    emptyString(input) {return input !== '' ? true : 'Entry cannot be empty, please try again.';},
    
    nan(input) {const pattern = /^[0-9]*\.?[0-9]*$/; return pattern.test(input) && input !== '' ? true : 'Entry is not a number, please try again.';}      
};

module.exports = validate;