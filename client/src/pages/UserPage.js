import { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

function UserPage () {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logOutHandler = ()=> {
        auth.logOut()
        history.push('/')
    }

    return (
        <div>
            <h1>User Page</h1>
            <p>Hi : {auth.userName} </p>
            <p>Your email: {auth.userEmail} </p>
            <input type="button" value="Log out" onClick={logOutHandler} />
        </div>
    )
}

export default UserPage