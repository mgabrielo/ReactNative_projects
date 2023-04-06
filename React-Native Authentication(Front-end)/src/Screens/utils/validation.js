import validator from 'is_js';

const checkEmpty = (val, key) => {
    if (validator.empty(val.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}


const checkMinLength = (val, minlength, key) => {
    if (val.trim().length < minlength) {
        return `Please enter valid ${key}`
    } else {
        return '';
    }
}

export default function (data) {

    const { userName, email, password, } = data

    if (userName !== undefined) {
        let emptyValidationText = checkEmpty(userName, 'Please enter username')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(userName, 3, 'userName')

            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    if (userName !== undefined) {
        let emptyValidationText = checkEmpty(userName, 'Please enter username')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(userName, 3, 'userName')
        }
    }

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Please enter email')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return 'Please enter valid email'
            }
        }
    }


    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Please enter passwword')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(password, 6, 'password')

            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }
}