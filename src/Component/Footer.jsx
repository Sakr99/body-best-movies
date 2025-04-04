import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-800 p-5 text-center">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2">
          &copy; {currentYear} BodyBest Movies. All rights reserved.
        </p>

        <ul className="flex justify-center space-x-4">
          <li>
            <a href="anything" className="text-gray-700 hover:text-gray-900">
              Privacy Policy
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="anything" className="text-gray-700 hover:text-gray-900">
              Terms of Service
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="anything" className="text-gray-700 hover:text-gray-900">
              Contact Us
            </a>
          </li>
        </ul>

        <div className="mt-3 flex justify-center space-x-4">
          <a
            href="https://www.facebook.com/"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://github.com/Sakr99/BodyBest-Movies.git"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://x.com/"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a
            href="https://whatsapp.com/"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
