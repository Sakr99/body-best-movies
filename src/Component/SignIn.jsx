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
    <div className="w-full max-w-md mx-auto p-4 mt-10 rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign in</h1>
      {successMessage && (
        <div className="mb-4 text-green-500 bg-green-100 p-2 rounded-md">
          {successMessage}
        </div>
      )}
      {errorValidation.map((error, i) => (
        <div key={i} className="mb-4 text-red-500 bg-red-100 p-2 rounded-md">
          {error.message}
        </div>
      ))}
      <form onSubmit={submitData}>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-50"
        >
          First Name:
        </label>
        <input
          onChange={getUserData}
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          id="first_name"
          name="first_name"
        />

        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-50"
        >
          Last Name:
        </label>
        <input
          onChange={getUserData}
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          id="last_name"
          name="last_name"
        />

        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 dark:text-gray-50"
        >
          Age:
        </label>
        <input
          onChange={getUserData}
          type="number"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          id="age"
          name="age"
        />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-50"
        >
          Email:
        </label>
        <input
          onChange={getUserData}
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          id="email"
          name="email"
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-50"
        >
          Password:
        </label>
        <input
          onChange={getUserData}
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          id="password"
          name="password"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Sign in"}
        </button>
      </form>
    </div>
  );
}
