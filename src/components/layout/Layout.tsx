import { useEffect, useState} from 'react'; 
import { useHistory } from 'react-router-dom';
import {
	Switch,
    Route,
	NavLink
} from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';

//Components
import Home from '../home/Home';
import Favourites from '../favourites/Favourites';
import LoginForm from '../login/LoginForm';
import AddBooks from '../home/admin/AddBooks';
import EditBooks from '../home/admin/EditBooks';
import { getUsername, clearStorage} from '../services/storage';

const Layout: React.FC = () => {
    const [authLink, setAuthLink] = useState(<NavLink className="router__link router__link--hover" activeClassName="router__link--active" to="/Login/">Login</NavLink>);
    const username = getUsername();
    const history = useHistory();
    
    const handleLogoutBtn = () => {
        //eslint-disable-next-line no-restricted-globals
        let doLogout = confirm("Are you sure");
        if(doLogout) {
            clearStorage();
            history.push('/');
            
        }
    }

    useEffect(() => {
        if(username) {
            setAuthLink(<span className="router__logout router__logout--hover"><BiLogOut onClick={handleLogoutBtn} /></span>);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   
    return (
        <>
        <div className="router">
            <label htmlFor="hamburger-menu" className="router__label"><GiHamburgerMenu className="router__hamburger" /></label>
            <input type="checkbox" id="hamburger-menu" className="router__input" />
            <nav className="router__nav">
                <NavLink className="router__link router__link--hover" activeClassName="router__link--active" to="/" exact={true}>
                    Home
                </NavLink>
                <NavLink className="router__link router__link--hover" activeClassName="router__link--active" to="/favourites/">
                    Favourites
                </NavLink>
                {authLink}
            </nav>
        </div>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/login" component={LoginForm} />
            <Route path="/addBooks" component={AddBooks} />
            <Route path="/editBooks/:id" component={EditBooks} /> 
        </Switch>
        </>
    )
}

export default Layout;