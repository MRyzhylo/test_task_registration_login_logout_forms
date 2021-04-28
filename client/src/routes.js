import {Switch, Route} from 'react-router-dom';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';

function useRoutes (isAutenticated) {
    if(isAutenticated) {
        return(
            <Switch>
                <Route path="/user" exact>
                    <UserPage />
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
        </Switch>
    )
}

export default useRoutes