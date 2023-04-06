import React from "react";
import Home from '../Screens/Home/Home'
import Profile from '../Screens/Profile/Profile'


export default function (Stack) {
    return (
        <>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />

        </>
    )
}



