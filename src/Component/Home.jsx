import axios from "axios";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./Context/GlobalContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        setMovies(response.data.slice(0, 50));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const changeSlide = useCallback(
    (direction) => {
      setActiveIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % movies.length
          : (prevIndex - 1 + movies.length) % movies.length
      );
    },
    [movies.length]
  );

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => changeSlide("next"), 3000);
    return () => clearInterval(interval);
  }, [movies, changeSlide]);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-6 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : " text-white "
      }`}
    >
      <section className="text-center mb-10">
        <h1 className="border border-gray-700 dark:border-gray-200 p-4 rounded-xl text-4xl md:text-5xl font-extrabold shadow-lg">
          BodyBest Movies
        </h1>
        <hr className="my-6 border-gray-300" />
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl border-4 border-gray-700">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {movies.map((movie) => (
              <img
                key={movie.id}
                src={
                  movie.image?.original ||
                  "https://via.placeholder.com/210x295?text=No+Image"
                }
                className="w-full h-80 object-cover flex-shrink-0"
                alt="Movie Poster"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, i) => (
          <div key={i} className="group relative">
            <Link to={`/movieDetails/${movie.id}`}>
              <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                <img
                  src={
                    movie.image?.medium ||
                    "https://via.placeholder.com/210x295?text=No+Image"
                  }
                  className="w-full object-cover"
                  alt="Poster Movie"
                />

                <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-1 rounded-t-lg">
                  <span className="bg-red-600 text-white text-sm px-4 py-0.5 rounded">
                    4K
                  </span>
                  <span className="bg-green-400 text-black text-sm px-4 py-0.5 rounded flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-400"></i>
                    {movie.rating?.average || "N/A"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
