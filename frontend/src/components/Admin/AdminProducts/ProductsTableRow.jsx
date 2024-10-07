import React from "react";
import { EditProductButton } from "./EditProductButton";

const ProductsTableRow = ({
  id,
  name,
  img,
  description,
  sellerName,
  price,
  rating,
  reviews,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200 ease-in-out border-b border-gray-200">
      <td className="py-4 px-6 ">{id}</td>
      <td className="py-4 px-6">{name}</td>
      <td className="py-4 px-6">
        <img src={"/images/productImage.jpg"}></img>
      </td>
      <td className="py-4 px-6">{description}</td>
      <td className="py-4 px-6">{sellerName}</td>
      <td className="py-4 px-6">{price}</td>
      <td className="py-4 px-6">{rating}</td>
      <td className="py-4 px-6">{reviews}</td>
      <td className="py-4 px-6">
        <EditProductButton
          productId={id}
          description={description}
          price={price}
        />
      </td>
    </tr>
  );
};

export default ProductsTableRow;
