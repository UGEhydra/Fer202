import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
