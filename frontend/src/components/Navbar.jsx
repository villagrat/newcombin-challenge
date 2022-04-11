import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaHome } from 'react-icons/fa';

function Navbar() {
  return (
    <header className='header'>
      <ul>
        <li className='header-text'>
          <Link to='/'>
            <FaHome /> Home
          </Link>
        </li>
        <li className='header-text'>
          <Link to='/about'>
            <FaQuestionCircle /> About
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
