import { useState } from "react";

function AuthPage () {
    const [form, setForm] = useState({
        email: '', login: '', realName: '', password: '', birthDate: '', country: '', agrees:''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
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
                <input type="checkbox" name="agrees" onChange={changeHandler}/>
            </label>
                <input type="submit" value="Submit" />
                
        </form>
    </div>
    )
}

export default AuthPage;