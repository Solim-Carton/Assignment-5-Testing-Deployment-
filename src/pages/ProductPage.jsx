import ProductCard from '../assets/components/ProductCard';

function ProductsPage({ products, addToCart }) {
  return (
    <div className="products-page">
      <h1>BuzzBoard Feed</h1>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;