import React from "react";
import { Link } from "react-router-dom";

function Icon() {
  return (
    <>
      <div className="d-flex mx-2  align-items-center bg-dark rounded">
        <Link href="https://github.com/Sakr99/BodyBest-Movies.git">
          <i className="fab mx-2 hover:text-gray-400  fa-github"></i>
        </Link>
        <Link href="https://www.facebook.com/">
          <i className="fab mx-2 hover:text-gray-400 fa-facebook"></i>
        </Link>
        <Link href="https://www.instagram.com/">
          <i className="fab mx-2 hover:text-gray-400 fa-instagram"></i>
        </Link>
        <Link href="https://tiktok.com/">
          <i className="fab mx-2 hover:text-gray-400 fa-tiktok"></i>
        </Link>

        <Link href="https://x.com/">
          <i className="fab mx-2 hover:text-gray-400 fa-x-twitter"></i>
        </Link>
      </div>
    </>
  );
}

export default Icon;
