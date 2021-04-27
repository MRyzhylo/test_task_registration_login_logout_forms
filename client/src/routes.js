import {Switch, Route, Redirect} from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';

function useRoutes (isAutenticated) {
    if(isAutenticated) {
        return(
            <Switch>
                <Route path="/user" exact>
                    <UserPage />
                </Route>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Redirect to="/main">
                    <MainPage />
                </Redirect> 
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
        </Switch>
    )
}

export default useRoutes