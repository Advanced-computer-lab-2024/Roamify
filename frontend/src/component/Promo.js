const Promo = ({ size = "50px" }) => {
  return (
    <img
      src="/promo.svg" // Path to your loading GIF
      alt={"img"}
      style={{
        width: size, // Set the size of the GIF (default is 50px)
        height: size,
      }}
    />
  );
};

export default Promo;
