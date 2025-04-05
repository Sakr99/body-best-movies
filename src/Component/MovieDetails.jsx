import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "./Context/GlobalContext";
import video from "../assets/8783355-hd_1920_1080_30fps.mp4";
export default function MovieDetails() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const { theme } = useContext(ThemeContext);

  const getMovieDetails = async () => {
    try {
      let { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      {movieDetails ? (
        <div
          className={`relative w-full min-h-screen flex items-center justify-center p-8
          ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-50"
            style={{
              backgroundImage: `url(${movieDetails.image?.original})`,
            }}
          ></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <img
                className="rounded-lg shadow-xl w-80 transition-transform duration-300 hover:scale-105"
                src={
                  movieDetails.image?.original ||
                  "https://via.placeholder.com/300x450"
                }
                alt={movieDetails.name}
              />
            </div>

            <div className="md:col-span-2 bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-white">
                {movieDetails.name}
              </h1>

              <div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg mt-2">
                <i className="fa-solid fa-star"></i>
                {movieDetails.rating?.average || "N/A"}
              </div>

              <hr className="my-4 border-gray-500" />

              <p className="text-gray-200 text-lg leading-relaxed">
                {movieDetails.summary?.replace(/<[^>]+>/g, "") ||
                  "No description available."}
              </p>

              <Link
                to={`https://www.tvmaze.com/shows/${id}/${movieDetails.name.toLowerCase()}`}
                className="mt-6 inline-block bg-red-600 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md
                hover:bg-red-700 transition duration-300"
              >
                <i className="fa-solid fa-play mr-2"></i> Watch Now
              </Link>

              <h4 className="text-xl font-semibold mt-8 text-white">
                Watch the trailer:
              </h4>
              <video
                src={video}
                className="w-full rounded-lg shadow-md my-3"
                alt="trailer"
                muted
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
