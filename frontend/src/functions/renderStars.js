export const renderStars = (rating) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if decimal >= 0.5
  const emptyStars = 5 - fullStars - halfStars; // Empty stars

  let stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i
        key={`full-${i}`}
        className="fas fa-star"
        style={{ color: "var(--main-color)" }}
      ></i>
    ); // Full star
  }
  if (halfStars) {
    stars.push(
      <i
        key="half"
        className="fas fa-star-half-alt"
        style={{ color: "var(--main-color)" }}
      ></i>
    ); // Half star
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i
        key={`empty-${i}`}
        className="far fa-star"
        style={{ color: "var(--main-color)" }}
      ></i>
    ); // Empty star
  }
  return stars;
};
