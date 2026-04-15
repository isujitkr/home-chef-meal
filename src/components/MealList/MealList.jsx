import MealCard from "../MealCard/MealCard";
import "./MealList.css";

const MealList = ({ meals, onAdd, selectedMeals, showAll, onToggleFilter, sortOrder, onToggleSort }) => {
  const selectedIds = new Set(selectedMeals.map((m) => m.id));

  return (
    <section className="meal-list-section">
      <div className="meal-list-section__header">
        <h2 className="section-title">Browse Meals</h2>
        <div className="meal-list-section__controls">
          <button className="btn btn--control" onClick={onToggleFilter}>
            {showAll ? "Show Available Only" : "Show All Meals"}
          </button>
          <button className="btn btn--control" onClick={onToggleSort}>
            Sort: {sortOrder === "asc" ? "Price Low → High" : "Price High → Low"}
          </button>
        </div>
      </div>

      {meals.length === 0 ? (
        <p className="empty-state">No meals to display.</p>
      ) : (
        <div className="meal-grid">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onAdd={onAdd}
              isSelected={selectedIds.has(meal.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MealList;
