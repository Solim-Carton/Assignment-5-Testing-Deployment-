import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../assets/components/ProductCard';

const product = {
  id: 1,
  name: 'Wireless Headphones',
  price: 99.99,
  image: 'https://placehold.co/600x400',
  description: 'Premium noise-cancelling headphones with 30-hour battery life',
};

function renderCard(addToCart = vi.fn()) {
  render(
    <MemoryRouter>
      <ProductCard product={product} onAddToCart={addToCart} />
    </MemoryRouter>
  );
  return addToCart;
}

describe('ProductCard rendering', () => {
  it('renders the product name', () => {
    renderCard();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  it('renders the product price', () => {
    renderCard();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('renders the description and image', () => {
    renderCard();
    expect(screen.getByText(/noise-cancelling/i)).toBeInTheDocument();
    expect(screen.getByAltText('Wireless Headphones')).toBeInTheDocument();
  });

  it('contains an "Add to Cart" button', () => {
    renderCard();
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});

describe('ProductCard interactions', () => {
  it('calls addToCart with the product when "Add to Cart" is clicked', () => {
    const addToCart = renderCard();
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });

  it('does not call addToCart before a click', () => {
    const addToCart = renderCard();
    expect(addToCart).not.toHaveBeenCalled();
  });
});
