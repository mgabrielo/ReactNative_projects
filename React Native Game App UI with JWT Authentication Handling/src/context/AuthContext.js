import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Base_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null);

    const LogIn = (username, password) => {
        setIsLoading(true)
        // axios.post(`${Base_URL}/jwt-auth/v1/token`, {
        //     username, password
        // }).then(res => {
        //     let userInfo = res.data;
        //     setUserInfo(userInfo);
        //     setUserToken(userInfo.data.token)
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        //     AsyncStorage.setItem('userToken', userInfo.data.token);
        // }).catch(e => {
        //     console.log(`login error ${e}`)
        // })
        setUserToken('osdkfj');
        AsyncStorage.setItem('userToken', 'osdkfj');
        setIsLoading(false);
    }

    const LogOut = () => {
        setIsLoading(true)
        setUserToken(null);
        // AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            // let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            // userInfo = JSON.parse(userInfo);

            // if (userInfo) {
            setUserToken(userToken);
            //     setUserToken(userInfo);
            // }

            setIsLoading(false)
        } catch (error) {
            console.log(`isLogged in Error ${error}`);
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ LogIn, LogOut, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}