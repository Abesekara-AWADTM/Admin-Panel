import React, { useEffect, useState } from "react";
import axios from "../axios";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";
import { Link } from "react-router-dom";

function SubCategoryList() {
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/getAllCategories")

      .then((res) => {
        // console.log("Getting from:", res.data.data[0].id);
        //console.log(res.data.data)
        setCategories(res.data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const getAllSubCategories = (id) => {
    // console.log(data);

    axios
      .get(`/admin/getAllSubCategoriesByCategoryId/${id}`)
      .then((res) => {
        console.log(res.data.data);
        // console.log("Getting from:", res.data.data[0].id);
        if (res.data.data.length === 0) {
          setSubCategory([]);
        } else {
          setSubCategory(res.data.data);
        }
      })

      .catch((err) => console.log(err));
  };

  const deleteObjective = (data) => {
    axios
      .delete(`/admin/deleteSubCategories/${data}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjgsImFkbWluX25hbWUiOiJBbnVyYSBBbWFyYWJhbmR1IiwiZW1haWxfYWRkcmVzcyI6ImFudXJhQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ2ODA1OTcyNTYyLCJleHAiOjE2NDY4MDcxODIxNjJ9.ovNWylxyptm9pXJ4dxYR8robCKekTFjjaZjrLOaup3zhg3RK8o6elT8E4iwN6251RMvEux25SzQUBbo3EXDxAvuv1dPLEk1jL04P_rRejurY1W6C_b8LceqWpcJbuVKKJHigik4v8GxBguAsnUEeKsB_tNypKaSWv6K0pgt6ajuaEZktSKeHwuGVGmv8Zhpccbkh7R_gW1KkJs-iBRqn27aTBDX2XUSt94_J1pu0dTI6-Au4zHKwp-H8-PkFK1yq8e0cUZUzbvYOAy9QeUIinVQk0Nx0rRtp4fE1GVkQe_s5Zq819ZT_5HdjXkHE3XIBpkUcCR7Mgf68VfrdVE0awaXFiOzob3uQu7Wq86B0HYQmndFMEQeMOHCu6xbnbY-QT8IqwUSPBJeLunfkksMc6hHjI5kpCPieJ_HWIqsa-h-gG9F0T2g0eMkxWUV2jHsXwgKltcz0lI5Nh7L6OgCllZrEhTFt3K81qhaYKgIztZOEK4XLtAgj0ClK0U-DLSev1y7a4iZXx3PgyT14hCx9ljfvLXjDhCmKKSRko_1lYMVSuwl2a1e_WVfTbk46gKEXyDn_8V3lEeqCrlfu-UI2aCwcZB36t2tRQBqT2z7qYjVvnfNXMu3pPF5aq-qme7mhn-kT4QskKXvWXFft-4D6wqEnGxx91ksc1GEQ8wnQ3NA`,
        },
      })
      .then((res) => {
        if (
          res.data.code === 200 &&
          res.data.message === "succesfully deleted" &&
          res.data.success === true
        ) {
          console.log(res.data.message);
        } else if (res.data.success === false) {
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("delete fail! server error", error);
      });
  };

  return (
    <>
      <div className="container-scroller">
        <Dashboard />

        <div className="container-fluid page-body-wrapper">
          <DashboardMenu />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="card-title">List of All SubCateogry</h1>
                      <p className="card-description">
                        Check All Sub Category List
                      </p>
                      <br />

                      <select
                        class="form-control"
                        id="exampleSelectGender"
                        name="id"
                        value={categories.id}
                        onChange={(e) => getAllSubCategories(e.target.value)}
                      >
                        <option value="0">Select a Category</option>
                        {categories.map(function (category, i) {
                          // console.log(category.id);
                          return (
                            <option key={i} value={category.id}>
                              {category.id}
                              {"-"}
                              {category.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Subcategory Id</th>
                            <th>categoryId</th>
                            <th>subcategoryName</th>
                            <th>Equipment</th>
                            <th>Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subCategory.map(function (subCategory, i) {
                            console.log(subCategory.id);
                            return (
                              <tr>
                                <td>{subCategory.id}</td>
                                <td>{subCategory.categoryId}</td>
                                <td>{subCategory.subcategoryName}</td>
                                <td>{subCategory.equipment}</td>
                                <td>
                                  <img
                                    src={subCategory.subcategoryImageFile}
                                    width="50px"
                                    height="50px"
                                  ></img>
                                </td>
                                <td>
                                  <div className="col-6">
                                    <Link
                                      to={`/edit_sub_category/${subCategory.id}`}
                                    >
                                      <button>Edit</button>
                                    </Link>
                                  </div>
                                </td>
                                <td>
                                  <div className="col-6">
                                    <button
                                      onClick={() =>
                                        deleteObjective(subCategory.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubCategoryList;
