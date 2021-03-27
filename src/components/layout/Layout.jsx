import { useContext} from 'react'; 
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
import { clearStorage } from '../services/storage';
import AuthContext from "../common/AuthContext";

const Layout = () => {
    const [auth, setAuth] = useContext(AuthContext);
   
    const history = useHistory();
    
    const handleLogoutBtn = () => {
        //eslint-disable-next-line no-restricted-globals
        let doLogout = confirm("Are you sure");
        if(doLogout) {
            setAuth(null);
            clearStorage();
            history.push('/');
        }
    }
   
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
                {auth ? (
                    <>
                        <NavLink className="router__link router__link--hover" activeClassName="router__link--active" to="/addBooks/">
                          Add Books
                        </NavLink>
                        <span className="router__logout router__logout--hover"><BiLogOut onClick={handleLogoutBtn} /></span>
                    </>  
                    
                ) :(
                    <NavLink className="router__link router__link--hover" activeClassName="router__link--active" to="/Login/">Login</NavLink>
                )}
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