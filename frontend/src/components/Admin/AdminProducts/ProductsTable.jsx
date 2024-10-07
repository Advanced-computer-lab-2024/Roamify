import ProductsTableRow from "./ProductsTableRow.jsx";

const ProductsTable = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-300">
            <th className="font-normal py-3 px-6 text-left">ID</th>
            <th className="font-normal py-3 px-6 text-left">Name</th>
            <th className="font-normal py-3 px-6 text-left">Image</th>
            <th className="font-normal py-3 px-6 text-left">Description</th>
            <th className="font-normal py-3 px-6 text-left">Seller Name</th>
            <th className="font-normal py-3 px-6 text-left">Price</th>
            <th className="font-normal py-3 px-6 text-left">Rating</th>
            <th className="font-normal py-3 px-6 text-left">Reviews</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-light">
          {products.map((product, index) => (
            <ProductsTableRow
              key={index}
              id={product._id}
              name={product.name}
              img={product.img}
              description={product.description}
              price={product.price}
              sellerName={product.sellerId.username}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
