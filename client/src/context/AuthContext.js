import {createContext} from 'react';

function nope() {}

export const AuthContext = createContext ({
    token: null,
    userId: null,
    userName: null,
    userEmail: null,
    logIn: nope,
    logOut: nope,
    isAutenticated: false
})