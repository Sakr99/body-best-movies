import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [errorValidation, setErrorValidation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function validateLoginForm() {
    let schema = Joi.object({
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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    let validation = validateLoginForm();
    if (validation.error) {
      setErrorValidation(validation.error.details);
      setLoading(false);
    } else {
      console.log("Login Completed");
      setLoading(false);
      navigate("/"); 
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Login Now</h1>
      
      {errorValidation.map((error, i) => (
        <div key={i} className="bg-red-100 text-red-700 p-2 rounded mb-2">
          {i === 1 ? error.message : "Password Invalid"}
        </div>
      ))}

      <form onSubmit={submitData} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            onChange={getUserData}
            type="email"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            id="email"
            name="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            onChange={getUserData}
            type="password"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            id="password"
            name="password"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
