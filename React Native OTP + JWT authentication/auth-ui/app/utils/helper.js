export const navigateToSignUp = navigation => () => {
    navigation.navigate('SignUp')
}

export const navigateToLogIn = navigation => () => {
    navigation.navigate('Login')
}
export const navigateToForgotPass = navigation => () => {
    navigation.navigate('ForgetPassword')
}

export const updateNotification = (updater, text, type = 'error') => {
    updater({ text, type });

    setTimeout(() => {
        updater({ text: '', type: '' });
    }, 2200)
}