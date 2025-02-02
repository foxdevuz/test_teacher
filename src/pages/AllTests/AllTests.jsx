import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link component
import "./AllTests.css";

const AllTests = () => {
  const [categories, setCategories] = useState([]);
  const [categoryTestCount, setCategoryTestCount] = useState([]);
  const navigate = useNavigate();
  const isUserLogin = sessionStorage.getItem("enus");
  if (!isUserLogin) {
    navigate("/");
  }

  localStorage.removeItem("fan");

  const allTestCategories = () => {
    const apiUrl = `https://api.nabdullayeva.uz/api/v1/admin/${isUserLogin}/category/list`;
    axios.post(apiUrl).then((res) => {
      setCategories(res.data.categories);
      setCategoryTestCount(res.data.test_count);
    });
  };

  useEffect(() => {
    allTestCategories();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center alltest_wrapper"
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div className="circle pos_1"></div>
      <div className="circle pos_2"></div>
      <div className="circle pos_3"></div>
      <div className="circle pos_4"></div>
      <div className="circle pos_5"></div>
      <div className="circle pos_6"></div>

      <div className="all_tests_wrapper">
        <div className="test_cards">
          {categories && categories.length >= 0 ? (
            categories.map((category) => (
              <Link
                to={
                  categoryTestCount[category.name] !== 0
                    ? `/quiz/${category.slug}`
                    : "#"
                }
                onClick={() => localStorage.setItem("fan", category.name)}
                //if not working change localStorage.setItem("fan", category.name) because Bobur said
                key={category.id}
                className="test_card"
              >
                {/* <small>Test soni: {categoryTestCount[category.name]}</small> */}
                <h4 className="my-3">{category.name}</h4>
                <small>Tuzuvchi: N.Abdullayeva</small>
                {categoryTestCount[category.name] !== 0 ? (
                  <span>
                    Boshlash<i className="fas fa-arrow-right"></i>
                  </span>
                ) : null}
              </Link>
            ))
          ) : (
            <div className="text-center" style={{ color: "#e1e1e1" }}>
              <i
                className="fa-solid fa-ban m-3"
                style={{ fontSize: "150px" }}
              ></i>
              <br /> TESTLAR MAVJUD EMAS
            </div>
          )}

          <Link
            to={`/quiz/mixed`}
            onClick={() => localStorage.setItem("fan", "mixed")}
            className="test_card"
          >
            {/* <small>Test soni: 40</small> */}
            <h4 className="my-3">Aralash</h4>
            <small>Tuzuvchi: N.Abdullayeva</small>
            <span>
              Boshlash<i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTests;
