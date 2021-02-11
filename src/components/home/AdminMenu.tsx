
import {NavLink} from 'react-router-dom';

export const AdminMenu:React.FC = () => {
    return (
       <nav className="admin__nav">
            <NavLink className="admin__link admin__link--hover" activeClassName="admin__link--active" to="/addBooks/">
                Add Books
            </NavLink>
          
            {/* <NavLink className="admin__link admin__link--hover" activeClassName="admin__link--active" to="/deleteBooks/">
                Delete Books
            </NavLink> */}
        </nav>
    )
}

export default AdminMenu;
