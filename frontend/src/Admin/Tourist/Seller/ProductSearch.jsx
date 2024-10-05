import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/Cards/ProductCard';
import './ProductSearch.css';

const ProductSearch = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // Fetch all products 
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/products?name=${searchTerm}`); // Send search term to backend
            setProducts(response.data);
        } catch (error) {
            setError('Error searching products');
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-search">
            <h1>Search for Products</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search product by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
                <button onClick={handleSearch}>Search</button> {/* Trigger search */}
            </div>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductSearch;
