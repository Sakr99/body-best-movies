import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "./Context/GlobalContext";
import * as actions from "./Context/ActionTypes";

function Card({ movie }) {
  const MovieContext = useMovieContext();
  const [isDisabled, setIsDisabled] = useState(() =>
    MovieContext.favourites.some((mo) => mo.id === movie.id)
  );

  const addToFavourites = () => {
    MovieContext.MoviesDispatch({
      type: actions.ADD_MOVIE_TO_FAVOURITES,
      payload: movie,
    });
    setIsDisabled(true);
  };

  return (
    <>
      <Link to={`/movieDetails/${movie.id}`}>
        <div className="relative flex items-center justify-center h-fit m-3 overflow-hidden group">
          <img
            src={
              movie.image?.medium ||
              "https://via.placeholder.com/210x295?text=No+Image"
            }
            className="w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            alt={movie.name || "Movie Image"}
          />
          <div className="absolute w-full inset-x-0 bottom-0 h-1/4 rounded-lg bg-black bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <p className="text-yellow-200 text-xs font-bold md:text-3xl">
              {movie.name}
            </p>
          </div>
        </div>
      </Link>
      <button
        disabled={isDisabled}
        onClick={addToFavourites}
        type="button"
        className={`w-full mt-2 px-4 py-2 btn btn-primary flex items-center justify-center gap-2 text-sm md:text-base ${
          isDisabled ? "btn-disabled" : ""
        }`}
      >
        <span>{isDisabled ? "Added" : "Add to Favourites"}</span>
        <i className="fa-solid fa-heart fa-beat text-lg"></i>
      </button>
    </>
  );
}

export default Card;
