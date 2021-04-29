import {createContext} from 'react';

function nope() {}

export const AuthContext = createContext ({
    token: null,
    userId: null,
    logIn: nope,
    logOut: nope,
    isAutenticated: false
})