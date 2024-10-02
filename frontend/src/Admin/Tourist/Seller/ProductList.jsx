import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/Cards/ProductCard';
import './ProductList.css'; 
import axios from 'axios'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API is set up on this route
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
