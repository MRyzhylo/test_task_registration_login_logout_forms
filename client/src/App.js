import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes';
import Header from './Components/Header';


function App() {
  const routes = useRoutes(false)
  return (
    <div className="App">
      <Router> 
        <Header />
          {routes}
      </Router>
    </div>
  );
}

export default App;
