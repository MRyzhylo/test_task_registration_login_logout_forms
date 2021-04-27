import { useState } from "react";
import { useHttp } from "../hooks/http.hook";

function AuthPage () {
    const {loading, request} =useHttp()
    const [form, setForm] = useState({
        email: '', login: '', realName: '', password: '', birthDate: '', country: '', agreement:''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        try {
            const data = await request('/api/auth/registration', 'POST', {...form})
            console.log('data:', data)
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
                <input type="text" name="realName" onChange={changeHandler}/>
                Password:
                <input type="password" name="password" onChange={changeHandler}/>
                Birth date:
                <input type="datetime" name="birthDate" onChange={changeHandler}/>
                Country:
                <select id="countrySelect" name="country" onChange={changeHandler}>

                </select>
                I agree with terms and conditions
                <input type="checkbox" name="agreement" onChange={changeHandler}/>
            </label>
                <input type="submit" value="Submit" 
                 onClick={registrationHandler} 
                 disabled={loading} />
                
        </form>
    </div>
    )
}

export default AuthPage;