import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/online_test.jpg";
import "./UserRegister.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Parollar mos kelmaydi!");
      return;
    }

    try {
      const response = await fetch(
        "https://api.nabdullayeva.uz/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            login: formData.login,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        navigate("/");
      } else {
        alert("Bu login band! Iltimos boshqa login kiriting!");
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };
  return (
    <>
      <div
        className="user_register_wrapper d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="" style={{ width: "100%", height: "100%" }} />
          <h2 className="text-center fst-italic text-primary opacity-75">
            Nasiba Abdullayeva
          </h2>

          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="login"
              value={formData.login}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Parol
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">
              Qaytadan parol
            </label>
            <input
              type="text"
              className="form-control"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
            {errorMessage && (
              <div className="text-danger mt-2">Parollar mos emas</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 bg-primary bg-gradient"
          >
            Ro`yxatdan o`tish <i className="fa-solid fa-angles-right"></i>
          </button>
          <p className="p-2 text-center fs-6">
            Hisobim bor <a href="/">Kirish</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
