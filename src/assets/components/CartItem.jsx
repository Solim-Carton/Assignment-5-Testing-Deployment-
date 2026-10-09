import './CartItem.css';

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <div className="item-info">
        <h4>{item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove-btn">
        Remove
      </button>
    </div>
  );
}

export default CartItem;