import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import HomePage from './pages/Homepage';
import ProductsPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { useState, useEffect } from 'react';



function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }   catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
  

const products = [
  { 
    id: 1, 
    name: "Wireless Headphones", 
    price: 99.99, 
    image: "https://placehold.co/600x400",
    description: "Premium noise-cancelling headphones with 30-hour battery life"
  },
  { 
    id: 2, 
    name: "Smart Watch", 
    price: 249.99, 
    image: "https://placehold.co/600x400",
    description: "Fitness tracker with heart rate monitor and GPS"
  },
  { 
    id: 3, 
    name: "Bluetooth Speaker", 
    price: 79.99, 
    image: "https://placehold.co/600x400",
    description: "Portable waterproof speaker with 360-degree sound"
  },
  { 
    id: 4, 
    name: "Laptop Stand", 
    price: 49.99, 
    image: "https://placehold.co/600x400",
    description: "Ergonomic aluminum stand for laptops and tablets"
  },
  { 
    id: 5, 
    name: "Webcam", 
    price: 129.99, 
    image: "https://placehold.co/600x400",
    description: "4K webcam with auto-focus and noise reduction"
  },
  { 
    id: 6, 
    name: "Mechanical Keyboard", 
    price: 159.99, 
    image: "https://placehold.co/600x400",
    description: "RGB backlit keyboard with custom switches"
  }
];
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(`Added ${product.name} to cart`);
  };
  const removeFromCart = (productId) => {
    setCart(cart.filter((item, index) => index !== cart.findIndex(p => p.id === productId)));
  };
  
  return (
    <div className="app">
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage products={cart} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;