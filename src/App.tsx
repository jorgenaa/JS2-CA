import {BrowserRouter as Router} from 'react-router-dom';
import './sass/styles.scss';

//Components
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <div className="wrapper">
        <Layout />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
