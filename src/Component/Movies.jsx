import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filterMovie, setfilterMovie] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        setMovies(response.data.slice(0, 32));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setfilterMovie(movies);
  }, [movies]);

  const handleSearch = (e) => {
    const filter = movies.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value)
    );
    setfilterMovie(filter);
  };

  return (
    <>
      <div className="container py-4">
        <form role="search">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            aria-label="Search"
            type="search"
            onInput={handleSearch}
          />
        </form>

        {filterMovie.length > 0 && (
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 md:gap-2  mt-4">
            {filterMovie.map((movie, i) => (
              <div key={i} className="p-2">
                <Card movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
