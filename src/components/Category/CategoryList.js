import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";

function CategoryList() {
  const [data, setDate] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/getAllCategories")

      .then((res) => {
        console.log("Getting from:", res.data);
        setDate(res.data.data);
      })

      .catch((err) => console.log(err));
  }, []);
  const deleteObjective = (data) => {
    axios
      .delete(`/admin/deleteCategories/${data}`, {
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

  const arr = data.map((data, index) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.categoryName}</td>
        <td>
          <img src={data.categoryImageFile} width="50px" height="50px"></img>
        </td>
        <td>
          <div className="col-6">
            <button onClick={() => deleteObjective(data.id)}>Delete</button>
          </div>
        </td>
        <td>
          <div className="col-6">
            <Link to={`/${data.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        </td>
      </tr>
    );
  });

  return (
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
                    <h1 className="card-title">List of All Categories </h1>
                    <p className="card-description">
                      Check All Categories List
                    </p>
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Image</th>
                            {/* <th>Action-01</th> */}
                            {/* <th>Action-02</th> */}
                          </tr>
                        </thead>

                        {arr}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
