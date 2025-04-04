import React from "react";
import { useMovieContext } from "./Context/GlobalContext";
import MovieFavouriteCard from "./MovieFavouriteCard";
import * as actions from "./Context/ActionTypes";

function Favourites() {
  const MovieContext = useMovieContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h1 className="text-3xl font-bold text-center mb-4">Favourite Movies</h1>
      <hr className="my-4 border-gray-300" />

      {MovieContext.favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MovieContext.favourites.map((movie) => (
            <div key={movie.id} className="card bg-base-100 shadow-lg">
              <figure>
                <MovieFavouriteCard movie={movie} />
              </figure>
              <div className="card-body text-center">
                <button
                  onClick={() =>
                    MovieContext.MoviesDispatch({
                      type: actions.REMOVE_MOVIE_FROM_FAVOURITES,
                      payload: movie,
                    })
                  }
                  type="button"
                  className="btn btn-error flex items-center justify-center"
                >
                  Remove <i className="fa-solid fa-trash ml-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center mt-6">
          <span>No Movies In Your Favourites</span>
        </div>
      )}
    </div>
  );
}

export default Favourites;
