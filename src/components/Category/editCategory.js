import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";
import DefaultImage from "../assets/images/add_image1.png";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const categoryId = id;
  const [category, setCategory] = useState({
    categoryName: "",
    categoryImageFile: "",
  });

  const [previewImage, setPreviewImage] = useState(DefaultImage);
  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  const onChangeFile = (e) => {
    setCategory({ ...category, categoryImageFile: e.target.files[0] });
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const updateCategoryData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(category.equipment);
    formData.append("categoryName", category.categoryName);
    formData.append("categoryImageFile", category.categoryImageFile);
    axios
      .put(`/admin/editCategory/${categoryId}`, formData)
      .then((res) => {
        if (res.data.success) {
          setMessage({
            status: true,
            success: true,
            message: "Successfully updated",
          });
        } else {
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/all_category");
      });
  };

  const getCategoryData = (categoryId) => {
    axios
      .get("/admin/getCategoryById/" + categoryId)
      .then((res) => {
        if (res.data.data) {
          const categoryDetails = res.data.data[0];
          setCategory({
            ...category,
            categoryName: categoryDetails.categoryName,
            categoryImageFile: categoryDetails.categoryImageFile,
          });
          setPreviewImage(categoryDetails.categoryImageFile);
        } else {
          setCategory({
            ...category,
            categoryName: "",
            categoryImageFile: "",
          });
          setPreviewImage(DefaultImage);
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/all_category");
      });
  };

  useEffect(() => {
    getCategoryData(categoryId);
  }, []);

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
                      <h1 className="card-title">Edit Category Details</h1>

                      {message.status && message.success ? (
                        <div class="alert alert-success" role="alert">
                          {message.message}
                        </div>
                      ) : null}

                      {message.status && !message.success ? (
                        <div class="alert alert-danger" role="alert">
                          {message.message}
                        </div>
                      ) : null}

                      <p className="card-description">
                        Now You can edit Category Details
                      </p>
                      <br />
                      <form className="forms-sample">
                        <div className="form-group">
                          <label htmlFor="exampleInputName1">
                            Category Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="categoryName"
                            value={category.categoryName}
                            onChange={handleChange}
                            id="exampleInputName1"
                            placeholder="Category Name"
                          />
                        </div>

                        <div className="form-group">
                          <label>Category Images</label>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={onChangeFile}
                            className="form-control form-control-user"
                            required
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

                        <button
                          type="submit"
                          className="btn btn-primary mr-2"
                          onClick={updateCategoryData}
                        >
                          Save
                        </button>
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

export default EditCategory;
