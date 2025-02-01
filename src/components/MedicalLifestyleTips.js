import React, { useState, useEffect } from "react";
import "./MedicalLifestyleTips.css";

const MedicalLifestyleTips = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/tips.json")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching tips:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    tips: category.tips.filter((tip) =>
      tip.toLowerCase().includes(searchTerm)
    )
  })).filter(category => category.tips.length > 0);

  return (
    <div className="tips-container">
      <h1>Medical and Lifestyle Awareness</h1>
      <input
        type="text"
        placeholder="Search tips..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredCategories.map((category) => (
        <div key={category.name} className="category">
          <h2>{category.name}</h2>
          <ul>
            {category.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      ))}
      {filteredCategories.length === 0 && (
        <p className="no-results">No tips match your search criteria.</p>
      )}
    </div>
  );
};

export default MedicalLifestyleTips;
