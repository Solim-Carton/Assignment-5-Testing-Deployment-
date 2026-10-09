import CartItem from '../assets/components/CartItem';

function CartPage({ products, removeFromCart }) {
  const cartTotal = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      {products.length > 0 ? (
        <>
          {products.map((item, index) => (
            <CartItem key={index} item={item} onRemove={removeFromCart} />
          ))}
          <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default CartPage;