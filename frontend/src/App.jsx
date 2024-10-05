import React from 'react';
import ProductCard from './components/Cards/ProductCard.jsx';  // Import the ProductCard component
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* Map over the products array to display multiple ProductCard components */}
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default App
