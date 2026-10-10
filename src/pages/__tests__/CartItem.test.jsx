import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../assets/components/CartItem';

const item = { id: 3, name: 'Bluetooth Speaker', price: 79.99 };

describe('CartItem', () => {
  it('renders without crashing', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />);
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('displays the item name and price', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />);
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
  });

  it('calls the remove function with the item id when Remove is clicked', () => {
    const onRemove = vi.fn();
    render(<CartItem item={item} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(3);
  });
});