import {NavLink} from 'react-router-dom';

function Header () {
    return (
        <div className='header'>
            <ul>
                <li><NavLink to="/"> Registration </NavLink></li>
                <li><NavLink to="/login"> Sign in </NavLink></li>
                <li><NavLink to="/user"> User page </NavLink></li>
            </ul>
        </div>
    )
}

export default Header