import AdminMenu from './AdminMenu';

const Sidebar:React.FC = () => {
    return (
        <aside className="home__sidebar">
            <div className="admin">
                <h3 className="admin__title">Admin Menu</h3>
                <AdminMenu  />
            </div>
        </aside>
    )
}

export default Sidebar;