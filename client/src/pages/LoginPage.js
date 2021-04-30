import { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useErrMessage } from '../hooks/errorMessage.hook';


function LoginForm() {
    const message = useErrMessage();
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '', password: '', 
    });
    const {loading, request, error, clearError} =useHttp()

    useEffect( ()=> {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }
    
    const signinHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form})
            auth.logIn(data.token, data.userId, data.userName, data.userEmail, data.Message)
            
        } catch (e) {}
    }
    
    
     return (  
      <div className="login_form">
          <form action="" method="POST">
              <h1> Sign in </h1>
              <label>
                  Email or login:
                  <input type="text" name="username" onChange={changeHandler}/>
                  Password:
                  <input type="password" name="password" onChange={changeHandler}/>
              </label>
                  <input type="submit" value="Sign in" 
                  onClick={signinHandler}
                  disabled={loading}
                  />
          </form>
          <h1 id="error"> </h1>
      </div> 
    )
  }
  
  export default LoginForm;