import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PersonForm from './components/PersonForm';
import PeopleList from './components/PeopleList';
import Footer from './components/Footer';
import About from './pages/About';
import { PersonasProvider } from './context/PersonasContext';

function App() {
  return (
    <PersonasProvider>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <PersonForm />
                  <PeopleList />
                </>
              }
            ></Route>

            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
      <Footer />
      <ToastContainer />
    </PersonasProvider>
  );
}

export default App;
