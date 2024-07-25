import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./Wishlist.scss";

interface Movie {
  id: number;
  title: string;
  cover: string;
  categories: string[];
  bestQuality: string;
  isNew?: boolean;
}

const Wishlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setMovies(data.movie))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      (!filter || movie.categories.includes(filter)) &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMovie = (id: number) => {
    setSelectedMovies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((mid) => mid !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelection = () => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => !selectedMovies.includes(movie.id))
    );
    setSelectedMovies([]);
  };

  return (
    <div className="wishlist">
      <h1>Wishlist</h1>
      <div className="filters">
        <button onClick={() => setFilter(null)}>All</button>
        <button onClick={() => setFilter("Horror")}>+ Horror</button>
        <button onClick={() => setFilter("Comedy")}>+ Comedy</button>
        <button onClick={() => setFilter("4K")}>+ 4K</button>
      </div>
      <div className="actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src="/Icon-search.svg" alt="Search" />
        </div>
        <button className="add-movie">
          <img src="/icon-plus.svg" alt="Add a movie" /> Add a movie
        </button>
        <div className="view-toggle">
          <button
            className={isGridView ? "active" : ""}
            onClick={() => setIsGridView(true)}
          >
            <img src="/icon-grid.svg" alt="Grid view" />
          </button>
          <button
            className={!isGridView ? "active" : ""}
            onClick={() => setIsGridView(false)}
          >
            <img src="/icon-list.svg" alt="List view" />
          </button>
        </div>
        <button className="delete-selection" onClick={handleDeleteSelection}>
          Delete selection
        </button>
      </div>
      <div className={isGridView ? "movie-grid" : "movie-list"}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            selected={selectedMovies.includes(movie.id)}
            onSelect={() => handleSelectMovie(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
