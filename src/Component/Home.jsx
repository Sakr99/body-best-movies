import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./Context/GlobalContext";
import MotionStyle from "./MotionStyle";

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
              <MotionStyle>
                <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                  <img
                    src={
                      movie.image?.medium ||
                      "https://via.placeholder.com/210x295?text=No+Image"
                    }
                    className="w-full object-cover"
                    alt="Poster Movie"
                  />

                  <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-3 py-2 rounded-t-lg">
                    <span className="bg-red-500 text-white text-sm md:text-lg font-semibold px-3 py-1 md:px-6 md:py-2 rounded-full shadow-sm">
                      4K
                    </span>
                    <span className="bg-green-700 text-wh text-sm md:text-lg font-semibold px-3 py-1 md:px-6 md:py-2 rounded-full flex items-center gap-1 shadow-sm">
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      {movie.rating?.average || "N/A"}
                    </span>
                  </div>
                </div>
              </MotionStyle>
            </Link>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
