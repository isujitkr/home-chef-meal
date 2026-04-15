import "./SelectedMeals.css";

const SelectedMeals = ({ selectedMeals, onReset }) => {
  const total = selectedMeals.reduce((sum, m) => sum + m.price, 0);

  const maxPrice = selectedMeals.length > 0 ? Math.max(...selectedMeals.map((m) => m.price)) : null;
  const minPrice = selectedMeals.length > 0 ? Math.min(...selectedMeals.map((m) => m.price)) : null;

  return (
    <section className="selected-section">
      <div className="selected-section__header">
        <h2 className="section-title">Selected Meals</h2>
        {selectedMeals.length > 0 && (
          <button className="btn btn--reset" onClick={onReset}>
            Reset
          </button>
        )}
      </div>

      {selectedMeals.length === 0 ? (
        <p className="empty-state">No meals selected yet. Add meals from the list!</p>
      ) : (
        <>
          <ul className="selected-list">
            {selectedMeals.map((meal) => {
              const isMostExpensive = meal.price === maxPrice;
              const isCheapest = meal.price === minPrice && minPrice !== maxPrice;

              return (
                <li
                  key={meal.id}
                  className={`selected-item ${isMostExpensive ? "selected-item--expensive" : ""} ${isCheapest ? "selected-item--cheap" : ""}`}
                >
                  <span className="selected-item__name">
                    {meal.name}
                    {isMostExpensive && <span className="tag tag--expensive">Most Expensive</span>}
                    {isCheapest && <span className="tag tag--cheap">Least Expensive</span>}
                  </span>
                  <span className="selected-item__price">₹{meal.price.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
          <div className="selected-total">
            <span className="selected-total__label">Total</span>
            <span className="selected-total__amount">₹{total.toFixed(2)}</span>
          </div>
        </>
      )}
    </section>
  );
}

export default SelectedMeals;
