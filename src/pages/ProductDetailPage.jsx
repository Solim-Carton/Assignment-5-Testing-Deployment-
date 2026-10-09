import { useParams, Link } from 'react-router-dom';

function ProductDetailPage({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail">
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to="/products">← Back to products</Link>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetailPage;