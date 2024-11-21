import "./Rating.css";

// 별을 클릭했을때
// 마우스를 올렸을때
// 마우스가 나갔을 때

const Star = ({ selected = false, rating, onSelect, onHover }) => {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;
  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  return (
    <span
      className={className}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      *
    </span>
  );
};

const RATINGS = [1, 2, 3, 4, 5];

export const Rating = ({
  value = 0,
  onSelect,
  onHover,
  onMouseOut,
  className,
}) => {
  return (
    <div onMouseOut={onMouseOut} className="className">
      {RATINGS.map((v) => (
        <Star
          key={v}
          rating={v}
          selected={value >= v}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
};
