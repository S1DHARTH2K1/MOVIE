import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./moviecard";
import "./movie.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "562ebef";

  const fetchMovies = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setMovies([]);
      setError("An error occurred while fetching movies.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MO-FLIX</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main className="movie-results">
        {error && <p className="error-message">{error}</p>}
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
