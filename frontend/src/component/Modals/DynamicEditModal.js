import React, { useState, useEffect, useRef } from "react";

const DynamicEditModal = ({ isOpen, onClose, fields, onSubmit, img }) => {
  const modalRef = useRef(null);

  const [image, setImage] = useState(img);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, productImages: file }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] =
        field.name === "productImages" ? image : field.value || "";
      return acc;
    }, {});
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "600px",
          height: "fit-content",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Edit Fields
        </h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) =>
            field.type === "img" ? (
              <div
                key={field.name}
                style={{ display: "flex", flexDirection: "column", gap: "1vh" }}
              >
                <label>Image</label>
                {image && (
                  <img
                    src={image}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "20vw", transform: "none" }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div key={field.name} style={{ marginBottom: "10px" }}>
                <label
                  htmlFor={field.name}
                  style={{
                    display: "block",
                    color: "#4A5568",
                  }}
                >
                  {field.label || field.name}
                </label>
                <input
                  type={field.type || "text"} // Use the dynamic type here
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "4px 8px",
                    border: "1px solid #D2D6DC",
                    borderRadius: "4px",
                    outline: "none",
                  }}
                  placeholder={field.placeholder || ""}
                />
              </div>
            )
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                marginRight: "16px",
                backgroundColor: "#E2E8F0",
                color: "#4A5568",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#CBD5E0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#E2E8F0")
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "#2B6CB0",
                color: "white",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#3182CE")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2B6CB0")
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicEditModal;
