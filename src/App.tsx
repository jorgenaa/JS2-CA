import {BrowserRouter as Router} from 'react-router-dom';
import './sass/styles.scss';

//Components
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';
import { AuthProvider } from "./components/common/AuthContext";

const App: React.FC = () => {
  return (
        <AuthProvider>
          <Router>
            <div className="container">
              <div className="wrapper">
              <Layout />
              </div>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      )
}

export default App;
