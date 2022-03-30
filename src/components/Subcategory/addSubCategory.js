import React, { useState, useEffect } from "react";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";
import axios from "../axios";
import DefaultImage from "../assets/images/add_image1.png";

const NewSubCategory = () => {
  const [categories, setcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryImageFile, setsubcategoryImageFile] = useState("");
  const [subcategoryName, setsubcategoryName] = useState("");
  const [equipment, setequipment] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(DefaultImage);
  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get("/admin/getAllCategories")

      .then((res) => {
        // console.log("Getting from:", res.data.data[0].id);
        setcategories(res.data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const onChangeFile = (e) => {
    setsubcategoryImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryId", categoryId);
    formData.append("subcategoryImageFile", subcategoryImageFile);
    formData.append("subcategoryName", subcategoryName);
    formData.append("equipment", equipment);

    setCategoryId("");
    setsubcategoryImageFile("");
    setsubcategoryName("");
    setequipment("");

    axios
      .post("/admin/addSubCategoryToAdminPanel", formData)
      .then((res) => {
        if (res.data.success) {
          setMessage({
            status: true,
            success: true,
            message: "Successfully updated",
          });
          // alert("Successfully updated");
          setPreviewImage(DefaultImage);
          // navigate("/all__sub_category");
          //window.location.reload(false);
        } else {
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
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
                      <h1 className="card-title">New Sub Category Details</h1>
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
                        Now You can add new Sub Category Details
                      </p>
                      <br />
                      <form action="" method="post" onSubmit={changeOnClick}>
                        <div class="form-group">
                          <label for="exampleSelectGender">Category Id</label>
                          <select
                            class="form-control"
                            id="exampleSelectGender"
                            name="categoryId"
                            // value={selectedValue}
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            <option value="0">Select a Category</option>
                            {categories.map(function (category, i) {
                              // console.log(category.id);
                              return (
                                <option key={i} value={category.id}>
                                  {/* {category.id}{" "} */}
                                  {category.categoryName}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Select Category Image</label>
                          <input
                            type="file"
                            placeholder="Upload your image"
                            filename="subcategoryImageFile"
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

                        <div className="form-group">
                          <label htmlFor="subcategoryName">
                            Subcategory Name
                          </label>
                          <input
                            type="text"
                            name="subcategoryName"
                            className="form-control"
                            id="subcategoryName"
                            value={subcategoryName}
                            onChange={(e) => setsubcategoryName(e.target.value)}
                            placeholder="subcategoryName"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="equipment">Equipment</label>
                          <input
                            type="text"
                            name="equipment"
                            className="form-control"
                            id="equipment"
                            value={equipment}
                            onChange={(e) => setequipment(e.target.value)}
                            placeholder="Euipment"
                          />
                        </div>

                        <button type="submit" className="btn btn-primary mr-2">
                          Submit
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
export default NewSubCategory;
