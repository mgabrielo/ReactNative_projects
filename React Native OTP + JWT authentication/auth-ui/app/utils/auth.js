import axios from "axios"

const catchError = error => {
    if (error?.response?.data) {
        return error?.response?.data
    }
    return { success: false, error: error.message }
}


export const Signs_Up = async values => {
    try {
        const { data } = await axios.post('http://192.168.1.117:8000/api/user/create', { ...values })

        return data;

    } catch (error) {

        return catchError(error)

    }

}


export const Logs_In = async values => {
    try {
        const { data } = await axios.post('http://192.168.1.117:8000/api/user/signin', { ...values })

        return data;

    } catch (error) {

        return catchError(error)

    }

}


export const Forget_Password = async email => {
    try {
        const { data } = await axios.post('http://192.168.1.117:8000/api/user/forgot-password', { email })

        return data;

    } catch (error) {

        return catchError(error)

    }

}


export const verify_email = async (otp, userId) => {
    try {
        const { data } = await axios.post('http://192.168.1.117:8000/api/user/verifyemail', { otp, userId })

        return data;

    } catch (error) {

        return catchError(error)

    }

}