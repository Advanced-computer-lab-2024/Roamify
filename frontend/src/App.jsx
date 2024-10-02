
import React from 'react';
import ProductCard from './components/Cards/ProductCard.jsx';

const products = [
    {
        name: "Product 1",
        description: "Museum souvenir..",
        price: 29.99,
        seller: "John Doe",
        rating: 4.5,
        imageUrl: "path-to-image",
        reviews: [
            { reviewer: "Jane", comment: "Amazing product!" },
            { reviewer: "Alex", comment: "Pretty good for the price." }
        ]
    }
];

const App = () => {
    return (
        <div>
            <h1>Product List</h1>
            <ProductCard product={products[0]} /> {/* Pass in product data here */}
        </div>
    );
};

export default App;
