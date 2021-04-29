import { useState, useCallback, useEffect} from "react";

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null);
    const [userEmail,setUserEmail] = useState(null)

    const logIn = useCallback( (jwtToken, id, uName, uEmail)=>{
        setToken(jwtToken)
        setUserId(id)
        setUserName(uName)
        setUserEmail(uEmail)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: uName, userEmail: uEmail
        }))
    }, [])

    const logOut = useCallback( ()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [] )

    useEffect( ()=> {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            logIn(data.token, data.userId, data.userName, data.userEmail)
        }
    }, [logIn])

    return { logIn, logOut, token, userId, userName, userEmail}
}