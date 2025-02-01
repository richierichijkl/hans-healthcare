import React, { useState, useEffect } from "react";
import "./HealthArticles.css";

const HealthArticles = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Fetch articles from API or local JSON
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=health&apiKey=bec0566ef3d549cba47dbb15cd1fc4e6"
        );
        const data = await response.json();
        setArticles(data.articles);
        setFilteredArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  // Handle search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="health-articles">
      <h2>Health Educational Articles</h2>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div className="article-card" key={index}>
              <img src={article.urlToImage} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default HealthArticles;
