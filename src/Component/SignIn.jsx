import Joi from "joi";
import React, { useState } from "react";

export default function SignIn() {
  const [errorValidation, setErrorValidation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(18).max(80).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,12}$")
        )
        .required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  const getUserData = (e) => {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    const validateForm = validateRegisterForm();

    if (validateForm.error) {
      setErrorValidation(validateForm.error.details);
      setLoading(false);
    } else {
      setSuccessMessage("Registration completed successfully!");
      setErrorValidation([]);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 my-10 mt-10 rounded-lg shadow-2xl bg-white dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign in</h1>

      {successMessage && (
        <div className="mb-4 text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 p-2 rounded-md">
          {successMessage}
        </div>
      )}

      {errorValidation.map((error, i) => (
        <div
          key={i}
          className="mb-4 text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-2 rounded-md"
        >
          {error.message}
        </div>
      ))}

      <form onSubmit={submitData}>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          First Name:
        </label>
        <input
          onChange={getUserData}
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Abdelrahman"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Last Name:
        </label>
        <input
          onChange={getUserData}
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Sakr"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Age:
        </label>
        <input
          onChange={getUserData}
          type="number"
          name="age"
          id="age"
          placeholder="e.g. 25"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Email:
        </label>
        <input
          onChange={getUserData}
          type="email"
          name="email"
          id="email"
          placeholder=" example@gmail.com"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Password:
        </label>
        <input
          onChange={getUserData}
          type="password"
          name="password"
          id="password"
          placeholder="Ahmed123"
          className="w-full p-2 border mb-1 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Must be 6–12 characters, include uppercase, lowercase and a number.
        </p>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Sign in"}
        </button>
      </form>
    </div>
  );
}
