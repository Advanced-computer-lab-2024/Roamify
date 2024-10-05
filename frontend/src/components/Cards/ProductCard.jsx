import React from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Seller:</strong> {product.seller}</p>
                <p><strong>Rating:</strong> {product.rating} / 5</p>
                <div className="reviews">
                    <h4>Reviews:</h4>
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review.reviewer}:</strong> {review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

