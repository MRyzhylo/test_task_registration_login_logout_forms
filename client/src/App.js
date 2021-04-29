import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes';
import Header from './Components/Header';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';


function App() {
  const {logIn, logOut, token, userId} = useAuth()
  const isAutenticated = !!token
  const routes = useRoutes(isAutenticated)
  return (
    <div className="App">
      <AuthContext.Provider value={{
        logIn, logOut, token, userId, isAutenticated
      }}>
        <Router> 
          <Header />
            {routes}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
