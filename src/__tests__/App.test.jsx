import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Fake localStorage so tests never touch real browser storage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => (key in store ? store[key] : null)),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    reset: () => {
      store = {};
    },
  };
})();

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.stubGlobal('localStorage', localStorageMock);
  localStorageMock.reset();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App rendering', () => {
  it('renders without crashing and shows the home page', () => {
    renderApp('/');
    expect(
      screen.getByRole('heading', { name: /why shop with us/i })
    ).toBeInTheDocument();
  });

  it('starts with an empty cart when nothing is saved', () => {
    renderApp('/cart');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});

describe('App localStorage persistence', () => {
  it('loads cart data from localStorage on startup', () => {
    const saved = [
      { id: 2, name: 'Smart Watch', price: 249.99 },
      { id: 4, name: 'Laptop Stand', price: 49.99 },
    ];
    localStorageMock.setItem('cart', JSON.stringify(saved));
    vi.clearAllMocks();

    renderApp('/cart');

    expect(localStorageMock.getItem).toHaveBeenCalledWith('cart');
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
    expect(screen.getByText('Laptop Stand')).toBeInTheDocument();
    expect(screen.getByText('Total: $299.98')).toBeInTheDocument();
  });

  it('falls back to an empty cart if saved data is corrupted', () => {
    localStorageMock.setItem('cart', '{not valid json');
    vi.clearAllMocks();

    renderApp('/cart');

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('saves the cart to localStorage when an item is added', () => {
    renderApp('/products');

    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    const [key, value] = localStorageMock.setItem.mock.calls.at(-1);
    const savedCart = JSON.parse(value);
    expect(key).toBe('cart');
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].name).toBe('Wireless Headphones');
  });

  it('saves the updated cart when an item is removed', () => {
    localStorageMock.setItem(
      'cart',
      JSON.stringify([{ id: 2, name: 'Smart Watch', price: 249.99 }])
    );
    vi.clearAllMocks();

    renderApp('/cart');
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));

    const [, value] = localStorageMock.setItem.mock.calls.at(-1);
    expect(JSON.parse(value)).toEqual([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});