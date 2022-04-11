import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PersonForm from './components/PersonForm';
import PeopleList from './components/PeopleList';
import Footer from './components/Footer';
import About from './pages/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='Container'>
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
    </>
  );
}

export default App;
