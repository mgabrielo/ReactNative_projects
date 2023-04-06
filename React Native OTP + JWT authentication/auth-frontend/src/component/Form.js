
import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const BaseUrl = 'http://localhost:8000/api/user'

export default function Form() {
    const location = useLocation();
    const navigate = useNavigate();
    const [invalidUser, setInvalidUser] = useState('')
    const [busy, setBusy] = useState(true)
    const [err, setErr] = useState("")
    const [success, setSuccess] = useState(false)
    const[newpassword, setNewPassword] = useState({
            password:'',
            confirmPassword: ''
    });

    const { token, id } = queryString.parse(location.search);

    

    useEffect(() => {

        const verifyToken = async () => {
       
            try {
                const { data } = await axios(`${BaseUrl}/verify-token?token=${token}&id=${id}`);
    
               setBusy(false)
    
            } catch (error) {
                if (error?.response?.data) {
                    const {data} = error.response;
                    if(!data.success){
                        return setInvalidUser(data.error)
                    }
        
                    console.log(error.response.data);
                }
                console.log(error)
            }
    
    
        }

        verifyToken();
    }, [id, token]);

    const handleOnChange =({target})=>{
        const{name, value} =target;
        
        setNewPassword({...newpassword, [name]: value});
    }

    const handleSubmit =  async (e) =>{
        e.preventDefault()
        const{password, confirmPassword} =newpassword;

        if(password.trim().length < 8 || password.trim().length > 20 ){
            return setErr('Password must be within 8 and 20 characters')
        }

        if(password !== confirmPassword ){
            return setErr('Password does not match')
        }

        try {
            setBusy(true)
           
            const { data } = await axios.post(`${BaseUrl}/reset-password?token=${token}&id=${id}`, {password});

           setBusy(false)
           
           if(data.success){
           
            navigate('/reset-password')
            setSuccess(true);

           }

        } catch (error) {
            if (error?.response?.data) {
                const {data} = error.response;
                if(!data.success){
                    return setInvalidUser(data.error)
                }
    
                console.log(error.response.data);
            }
            console.log(error)
        }

    }

    if(success){
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Password Reset Successful</h1>
            </div>
        )
    }

    if(invalidUser){
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">{invalidUser}</h1>
            </div>
        )
    }

    if(busy){
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">Wait For A Momemt Verfing Token</h1>
            </div>
        )
    }

    return (
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3"> Reset Password</h1>

            <form onSubmit={handleSubmit} className="shadow w-full rounded-lg p-10" >
                {err && <p className="text-center p-2 mb-3 bg-red-500 text-white">{err}</p>}
                <div className="space-y-8">
                    <input type="password" placeholder='*******' name='password' onChange={handleOnChange} className="px-3 text-lg h-10 w-full border-gray-500
            border-2 rounded" />

                    <input type="password" placeholder='*******' name='confirmPassword' onChange={handleOnChange} className="px-3 text-lg h-10 w-full border-gray-500
            border-2 rounded" />

                    <input type="submit" value="Reset Password" className=" bg-gray-500 w-full py-3 text-white rounded" />
                </div>
            </form>

        </div>
    )
}