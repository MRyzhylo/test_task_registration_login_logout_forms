import { useEffect, useState } from "react";
import { useErrMessage } from "../hooks/errorMessage.hook";
import { useHttp } from "../hooks/http.hook";

function AuthPage () {
    const message = useErrMessage()
    const {loading, request, error, clearError} =useHttp()
    const [form, setForm] = useState({
        email: '', login: '', real_name: '', password: '', birth_date: '', country: '', agreement:''
    });

    useEffect( ()=> {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/registration', 'POST', {...form})
            console.log( data.message )
        } catch (e) {}
    }

    return (
        <div className="RegForm">
        <form action="" metod="POST">
            <h1> Registration </h1>
            <label>
                Email:
                <input type="email" name="email" onChange={changeHandler}/>
                Login:
                <input type="text"  name="login" onChange={changeHandler}/>
                Real name:
                <input type="text" name="real_name" onChange={changeHandler}/>
                Password:
                <input type="password" name="password" onChange={changeHandler}/>
                Birth date:
                <input type="date" name="birth_date" onChange={changeHandler}/>
                Country:
                <select id="countrySelect" name="country" onChange={changeHandler}>
                    <option value=''>Please choose your country</option>
                    <option>Poland</option>
                </select>
                I agree with terms and conditions
                <input type="checkbox" name="agreement" onChange={changeHandler}/>
            </label>
                <input type="submit" value="Submit" 
                 onClick={registrationHandler} 
                 disabled={loading} />
                
        </form>
        <h1 id="error"> </h1>
    </div>
    )
}

export default AuthPage;