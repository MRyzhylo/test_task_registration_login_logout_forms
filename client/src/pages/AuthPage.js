import { useEffect, useState, useContext } from "react";
import { useErrMessage } from "../hooks/errorMessage.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from '../context/AuthContext';
import { useCountryList } from "../hooks/country.hooks";

function AuthPage () {
    const message = useErrMessage()
    const list = useCountryList()
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} =useHttp()
    const [form, setForm] = useState({
        email: '', login: '', real_name: '', password: '', birth_date: '', country: '', agreement:''
    });

    const countryListHandler = async () => {
        try {
            const countries = await request('/api/auth/country_list', 'GET')
            await list(countries)
        } catch (e) {}
    }
    
    useEffect( 
        ()=> {
        countryListHandler()
        message(error)
        clearError()
    }, [error, message, clearError]) // eslint-disable-line react-hooks/exhaustive-deps

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            auth.logIn(data.token, data.userId, data.userName, data.userEmail, data.Message)
            console.log(data.message)
        } catch (e) {}
    }

    return (
        <div className="auth_form">
        <form action="" metod="POST">
            <h1> Registration </h1>
            <label>
                Email:
                    <input 
                        placeholder="Email:" 
                        type="email" 
                        name="email" 
                        onChange={changeHandler}/>
                Login:
                    <input 
                        placeholder="Login:" 
                        type="text"  
                        name="login" 
                        onChange={changeHandler}/>
                Real name:
                    <input 
                        placeholder="Real name:" 
                        type="text" 
                        name="real_name" 
                        onChange={changeHandler}/>
                Password:
                    <input 
                        placeholder="Password:" 
                        type="password" 
                        name="password" 
                        onChange={changeHandler}/>
                Birth date:
                    <input 
                        type="date" 
                        name="birth_date" 
                        onChange={changeHandler}/>
                Country:
                    <select 
                        id="country_select" 
                        name="country" 
                        onChange={changeHandler} >
                            <option value=''>Please choose your country</option>
                            
                    </select>
                I agree with terms and conditions
                    <input 
                        type="checkbox" 
                        name="agreement" 
                        onChange={changeHandler}/>
            </label>
                <input id="reg_button" type="submit" value="Submit" 
                 onClick={registrationHandler} 
                 disabled={loading} />
                
        </form>
        <h4 id="error"> </h4>
    </div>
    )
}

export default AuthPage;