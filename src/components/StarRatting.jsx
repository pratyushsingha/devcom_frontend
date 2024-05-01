const ratings = [1, 2, 3, 4, 5];

const StarRatting = ({
  editable = false,
  rating,
  setRating,
  onClick,
  fontSize = "35px",
}) => {
  return (
    <div>
      {ratings.map((star) => (
        <span
          key={star}
          style={{
            cursor: editable ? "pointer" : "default",
            color: star <= rating ? "gold" : "grey",
            fontSize: fontSize,
          }}
          onClick={() => {
            editable && setRating(star);
            editable && onClick(star);
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRatting;
