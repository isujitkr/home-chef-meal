import React, { useState, useEffect } from "react";
import MealList from "./components/MealList/MealList";
import SelectedMeals from "./components/SelectedMeals/SelectedMeals";
import mealsData from "./data/meal";
import "./App.css";

const App = () => {
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedMeals, setSelectedMeals] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedMeals");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const handleAdd = (meal) => {
    setSelectedMeals((prev) => {
      if (prev.find((m) => m.id === meal.id)) return prev;
      return [...prev, meal];
    });
  };

  const handleReset = () => {
    setSelectedMeals([]);
  };

  const handleToggleFilter = () => setShowAll((prev) => !prev);
  const handleToggleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const filteredMeals = showAll
    ? mealsData
    : mealsData.filter((m) => m.isAvailable);

  const sortedMeals = [...filteredMeals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__logo">🍽</div>
          <div>
            <h1 className="app-header__title">Home Chef Meals</h1>
            <p className="app-header__subtitle">Fresh meals crafted by local chefs</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-layout">
          <div className="app-layout__primary">
            <MealList
              meals={sortedMeals}
              onAdd={handleAdd}
              selectedMeals={selectedMeals}
              showAll={showAll}
              onToggleFilter={handleToggleFilter}
              sortOrder={sortOrder}
              onToggleSort={handleToggleSort}
            />
          </div>
          <div className="app-layout__sidebar">
            <SelectedMeals selectedMeals={selectedMeals} onReset={handleReset} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
