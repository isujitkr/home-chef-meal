import "./MealCard.css";

const MealCard = ({ meal, onAdd, isSelected }) => {
  return (
    <div className={`meal-card ${!meal.isAvailable ? "meal-card--unavailable" : ""}`}>
      <div className="meal-card__badge">
        {meal.isAvailable ? (
          <span className="badge badge--available">Available</span>
        ) : (
          <span className="badge badge--unavailable">Unavailable</span>
        )}
      </div>
      <div className="meal-card__body">
        <h3 className="meal-card__name">{meal.name}</h3>
        <p className="meal-card__price">₹{meal.price.toFixed(2)}</p>
      </div>
      <div className="meal-card__footer">
        {meal.isAvailable ? (
          <button
            className={`btn btn--add ${isSelected ? "btn--added" : ""}`}
            onClick={() => onAdd(meal)}
            disabled={isSelected}
          >
            {isSelected ? "✓ Added" : "+ Add"}
          </button>
        ) : (
          <button className="btn btn--disabled" disabled>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
}

export default MealCard;
