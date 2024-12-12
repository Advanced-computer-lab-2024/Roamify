import React, { useState } from "react";

const CartItem = (item, handleIncrement, handleDecrement) => {
  const [count, setCount] = useState(item.quantity);
  return (
    <div
      key={item.productId}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "15px",
        height: "35vh",
        padding: "30px",
        border: "1px solid var(--secondary-border-color)",
        borderRadius: "8px",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "80%",
          padding: "30px 0px",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            flex: 1,
            objectFit: "cover",
            borderRadius: "0px",
            marginRight: "10px",
          }}
        />
      </div>
      <div>
        <strong style={{ fontSize: "25px" }}>{item.name}</strong>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flex: "0 0 auto",
        }}
      >
        <button
          type="button"
          style={{
            width: "60px",
            height: "40px",
            backgroundColor: "#8b3eea",
            border: "none",
            borderRadius: "5px",
            fontSize: "25px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            handleDecrement(item.productId);
          }}
        >
          {item.quantity == 1 ? (
            <DeleteIcon fill="white" height="20px" width="20px" />
          ) : (
            "-"
          )}
        </button>
        <span
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {item.quantity}
        </span>
        <button
          type="button"
          style={{
            width: "60px",
            height: "40px",
            backgroundColor: "#8b3eea",
            border: "none",
            borderRadius: "5px",
            fontSize: "22px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleIncrement(item.productId)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#f44336",
          cursor: "pointer",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => handleDelete(item.productId)}
      >
        <DeleteIcon fill="var(--text-color)" height="20px" width="20px" />
      </button>
    </div>
  );
};

export default CartItem;
