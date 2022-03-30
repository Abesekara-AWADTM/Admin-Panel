import React, { useState, useEffect } from "react";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";
import axios from "../axios";
import DefaultImage from "../assets/images/add_image1.png";

const NewCategory = () => {
  const [categoryName, setcategoryName] = useState("");
  const [categoryImageFile, setcategoryImageFile] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(DefaultImage);

  const onChangeFile = (e) => {
    setcategoryImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryName", categoryName);
    formData.append("categoryImageFile", categoryImageFile);

    setcategoryName("");
    setcategoryImageFile("");

    axios
      .post("/admin/addCategoryToAdminPanel", formData)
      .then((res) => res.data.success)
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        } else {
          console.log(error);
        }
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
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h1 className="card-title">New Category Details</h1>
                      <p className="card-description">
                        Now You can add new Category Details
                      </p>
                      <br />
                      <form action="" method="post" onSubmit={changeOnClick}>
                        <div className="form-group">
                          <label htmlFor="exampleInputName1">
                            Category Name
                          </label>
                          <input
                            type="text"
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setcategoryName(e.target.value)}
                            placeholder="Category Name"
                          />
                        </div>

                        <div className="form-group">
                          <label>Category Images</label>
                          <input
                            type="file"
                            placeholder="Upload your image"
                            filename="categoryImageFile"
                            onChange={onChangeFile}
                            required
                            className="form-control form-control-user"
                          />
                        </div>
                        <div className="col-12 p-0 ">
                          <img
                            src={previewImage}
                            alt="Category Image"
                            style={{ height: "50%", width: "50%" }}
                          />
                        </div>
                        <br />

                        <button type="submit" className="btn btn-primary mr-2">
                          Submit
                        </button>
                        {/* <button className="btn btn-light">Cancel</button> */}
                      </form>
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
};
export default NewCategory;
