import React from 'react';

const ProductsTable = ({ products }) => {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Seller</th>
          <th>Rating</th>
          <th>Reviews</th> {/* Add the Reviews column */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <img src={product.imageUrl} alt={product.name} width="50" />
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{product.seller}</td>
            <td>{product.rating}</td>
            <td>
              {/* Display reviews in the Reviews column */}
              {product.reviews && product.reviews.length > 0 ? (
                <ul>
                  {product.reviews.map((review, index) => (
                    <li key={index}>
                      <strong>{review.reviewer}</strong>: {review.comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
