import './Header.css';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="store-name">BuzzBoard</h1>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link">Cart ({cartCount})</Link>
        </nav>
      </div>
    </header>
  );
}


export default Header;