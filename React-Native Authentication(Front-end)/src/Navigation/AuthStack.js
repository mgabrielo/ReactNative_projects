import React from "react";
import LogIn from '../Screens/LogIn/LogIn';
import SignUp from '../Screens/SignUp/SignUp'

export default function (Stack) {
    return (
        <>

            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </>
    )
}

