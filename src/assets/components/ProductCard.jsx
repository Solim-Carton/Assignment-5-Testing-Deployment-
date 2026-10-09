import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="description">{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;