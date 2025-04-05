import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [errorValidation, setErrorValidation] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
        .required()
        .messages({
          "string.empty": "Email is required",
          "string.email": "Please enter a valid .com email",
        }),
      password: Joi.string()
        .pattern(
          new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$")
        )
        .required()
        .messages({
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must include uppercase, lowercase, and a number (6-12 chars)",
        }),
    });

    const { error } = schema.validate(user, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    const errors = validateLoginForm();
    if (errors) {
      setErrorValidation(errors);
      setLoading(false);
    } else {
      setErrorValidation({});
      console.log("Login Completed");
      setLoading(false);
      navigate("/");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl my-10 shadow-lg mt-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={submitData} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            onChange={getUserData}
            type="email"
            id="email"
            name="email"
            className={`w-full p-3 rounded-lg border ${
              errorValidation.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errorValidation.email && (
            <p className="text-sm text-red-500 mt-1">{errorValidation.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password:
          </label>
          <input
            onChange={getUserData}
            type="password"
            id="password"
            name="password"
            className={`w-full p-3 rounded-lg border ${
              errorValidation.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {errorValidation.password && (
            <p className="text-sm text-red-500 mt-1">
              {errorValidation.password}
            </p>
          )}
        </div>

        {/* Forget Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forget Password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
