import React, { useState, useEffect } from "react";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";
import Back from "../assets/images/add_image1.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import DefaultImage from "../assets/images/add_image1.png";
import { WindowSharp } from "@mui/icons-material";

const EditSubCategory = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(DefaultImage);
  const { id } = useParams();
  console.log("id is " + id);
  const [categories, setcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryImageFile, setsubcategoryImageFile] = useState("");
  const [subcategoryName, setsubcategoryName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`/admin/getAllSubCategories/${id}`)

      .then((res) => {
        // console.log("Getting from:", res.data.data[0].id);
        setcategories(res.data.data);
        setsubcategoryName(res.data.data[0].subcategoryName);
        setCategoryId(res.data.data[0].categoryId);
        setEquipment(res.data.data[0].equipment);
        setPreviewImage(res.data.data[0].subcategoryImageFile);
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(categories);

  const onChangeFile = (e) => {
    setsubcategoryImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    console.log(categoryId);
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
    setEquipment("");

    axios
      .put(`/admin/editSubCategory/${id}`, formData)
      .then((res) => {
        if (res.data.success) {
          setMessage({
            status: true,
            success: true,
            message: "Successfully updated",
          });
          alert("Successfully updated");
          navigate("/all__sub_category");
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
        console.log("error = " + error);
        navigate("/all__sub_category");
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
                      <h1 className="card-title">Edit Sub Category Details</h1>
                      <p className="card-description">
                        Now You can add new Sub Category Details
                      </p>
                      <br />
                      <form action="" method="post" onSubmit={changeOnClick}>
                        <div className="form-group">
                          <label for="exampleSelectGender">Category Id</label>
                          <input
                            className="form-control"
                            id="exampleSelectGender"
                            name="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                          />
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
                        <div className="form-group">
                          <img
                            src={previewImage}
                            style={{ height: "50%", width: "50%" }}
                            alt="subCategoryImage"
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
                            onChange={(e) => setEquipment(e.target.value)}
                            placeholder="equipment"
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
export default EditSubCategory;

////////////////////////////////////////////

const initialState = {
  image: null,
  previewImage: Back,
};
