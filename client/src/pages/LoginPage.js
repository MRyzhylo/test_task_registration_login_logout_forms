function LoginForm() {
    return (
      <div className="LogForm">
          <form>
              <h1> Sign in </h1>
              <label>
                  Email or login:
                  <input type="text" name="email login" />
                  Password:
                  <input type="password" />
              </label>
                  <input type="submit" value="Sign in" />
                  
          </form>
      </div>
    );
  }
  
  export default LoginForm;