import Validator from 'validator';
import isEmpty from 'is-empty';

function validateLoginInput(data) {
    let error={};
    //convert empty fields to an ampt string so we can use validator functions
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";

    //Email checks
    if(Validator.isEmpty(data.email)) {
        error.email = "Email is required";
    } else if(!Validator.isEmail(data.email)) {
        error.email = "Email is invalid";
    }

    //Password checks
    if(Validator.isEmpty(data.password)) {
        error.password = "Password is required";
    } 
    
    return {
        error,
        isValid: isEmpty(error)
    };
};

export default validateLoginInput;