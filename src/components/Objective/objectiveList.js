import React, { Component, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";

function ObjectiveList() {
  const navigate = useNavigate();
  const [objectives, setObjectives] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const [objective, setObjective] = useState({
    id: "",
    category_id: "",
    sub_category_id: "",
    objective_name: "",
    time: "",
    rules: "",
  });
  const [message, setMessage] = useState({
    status: false,
    success: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(
        "http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/objective/getAllObjectives",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEzLCJhZG1pbl9uYW1lIjoic2FnYXJhaCIsImVtYWlsX2FkZHJlc3MiOiJzYWdhcmFoQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ3NDIwNjAyMzQ2LCJleHAiOjE2NDc0MjE4MTE5NDZ9.huDeLFH61HQSeFP_K_E2Co8h7JMNG57Hm8kRGUllnoaRw4yCjSdOl5Q9NaE58hIYNruRdwQz-tHf0UhzQzMT_-wSleXs2JhOmXJTIfWqwl9g8-qPQBcxUpUYyaHxBEYj8dtK4x-fJkUeBmPwuFcLa3ZBb7u8MV2F-NoTADtvZoEwEo-VeJ-T5ZCwx5Bgx20cvZAnSagPgu8ZOZcDMKDAMq_TnB-DtuILSS6Z8VJSeHqMhJ5aqYlXEf8RhyfT_B6vg_6lowqM5c-qlKpWljAqWNyWqxFx81Cca7cDQjVVraaSX8GNQQsOp5llhG3TAEyZ77uO8H30SFTmkbAG5ytUH2_iuftp-rPfeIgzvfxDEYaYMNgLGgHu3iVoO-L0zdUDaeMQYS-soK9EO3GepNWwka_IxqV_1bzrbc2Vha_xyVPOeHAhR1Y-18LcppfrnnBVszdlk2OthJs5Y244k3LtzvRemmMIhND7SgSxqe1CYaBZHWP_K7ezqmfOqxgozxBrLErfEzA08YT1x4_XE75AZHxGXoFk1kbc_rNRvJAneVb5DlcINgP9oB2uxAjiVhScgJqgVVLEN0dTz9J5aY-0gt75TDZp9XObAslLGKDXDf0vzHytUWdIs8ZjAwegCfUVn8WbkQQLemmjtD9mn6gJkrMndTe7p0lXrjyMXsStBIo`,
          },
        }
      )
      .then((res) => {
        if (res.data.data) {
          setObjectives(res.data.data);
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
        navigate("/home");
      });
  }, []);

  const deleteObjective = (data) => {
    axios
      .delete(
        `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/objective/delete/${data}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjgsImFkbWluX25hbWUiOiJBbnVyYSBBbWFyYWJhbmR1IiwiZW1haWxfYWRkcmVzcyI6ImFudXJhQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ2ODA1OTcyNTYyLCJleHAiOjE2NDY4MDcxODIxNjJ9.ovNWylxyptm9pXJ4dxYR8robCKekTFjjaZjrLOaup3zhg3RK8o6elT8E4iwN6251RMvEux25SzQUBbo3EXDxAvuv1dPLEk1jL04P_rRejurY1W6C_b8LceqWpcJbuVKKJHigik4v8GxBguAsnUEeKsB_tNypKaSWv6K0pgt6ajuaEZktSKeHwuGVGmv8Zhpccbkh7R_gW1KkJs-iBRqn27aTBDX2XUSt94_J1pu0dTI6-Au4zHKwp-H8-PkFK1yq8e0cUZUzbvYOAy9QeUIinVQk0Nx0rRtp4fE1GVkQe_s5Zq819ZT_5HdjXkHE3XIBpkUcCR7Mgf68VfrdVE0awaXFiOzob3uQu7Wq86B0HYQmndFMEQeMOHCu6xbnbY-QT8IqwUSPBJeLunfkksMc6hHjI5kpCPieJ_HWIqsa-h-gG9F0T2g0eMkxWUV2jHsXwgKltcz0lI5Nh7L6OgCllZrEhTFt3K81qhaYKgIztZOEK4XLtAgj0ClK0U-DLSev1y7a4iZXx3PgyT14hCx9ljfvLXjDhCmKKSRko_1lYMVSuwl2a1e_WVfTbk46gKEXyDn_8V3lEeqCrlfu-UI2aCwcZB36t2tRQBqT2z7qYjVvnfNXMu3pPF5aq-qme7mhn-kT4QskKXvWXFft-4D6wqEnGxx91ksc1GEQ8wnQ3NA`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage({
            status: true,
            success: true,
            message: res.data.message,
          });
        } else {
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/home");
      });
  };

  //getting all subcategories
  useEffect(() => {
    if (categories.length !== 0) {
      axios
        .get(
          `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/admin/getAllSubCategoriesByCategoryId/${objective.category_id}`
        )
        .then((res) => {
          if (res.data.data) {
            setSubCategories(res.data.data);
          } else {
            setSubCategories([]);
            setMessage({
              status: true,
              success: false,
              message: res.data.message,
            });
          }
        })
        .catch((error) => {
          console.log("error = " + error);
          navigate("/home");
        });
    } else {
      setSubCategories([]);
    }
  }, [objective.category_id]);

  const editObjective = async (id) => {
    axios
      .get(
        "http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/admin/getAllCategories"
      )
      .then((res) => {
        if (res.data.data) {
          setCategories(res.data.data);
        } else {
          setCategories([]);
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/home");
      });

    axios
      .get(
        `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/objective/getObjective/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEzLCJhZG1pbl9uYW1lIjoic2FnYXJhaCIsImVtYWlsX2FkZHJlc3MiOiJzYWdhcmFoQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ3NDIwNjAyMzQ2LCJleHAiOjE2NDc0MjE4MTE5NDZ9.huDeLFH61HQSeFP_K_E2Co8h7JMNG57Hm8kRGUllnoaRw4yCjSdOl5Q9NaE58hIYNruRdwQz-tHf0UhzQzMT_-wSleXs2JhOmXJTIfWqwl9g8-qPQBcxUpUYyaHxBEYj8dtK4x-fJkUeBmPwuFcLa3ZBb7u8MV2F-NoTADtvZoEwEo-VeJ-T5ZCwx5Bgx20cvZAnSagPgu8ZOZcDMKDAMq_TnB-DtuILSS6Z8VJSeHqMhJ5aqYlXEf8RhyfT_B6vg_6lowqM5c-qlKpWljAqWNyWqxFx81Cca7cDQjVVraaSX8GNQQsOp5llhG3TAEyZ77uO8H30SFTmkbAG5ytUH2_iuftp-rPfeIgzvfxDEYaYMNgLGgHu3iVoO-L0zdUDaeMQYS-soK9EO3GepNWwka_IxqV_1bzrbc2Vha_xyVPOeHAhR1Y-18LcppfrnnBVszdlk2OthJs5Y244k3LtzvRemmMIhND7SgSxqe1CYaBZHWP_K7ezqmfOqxgozxBrLErfEzA08YT1x4_XE75AZHxGXoFk1kbc_rNRvJAneVb5DlcINgP9oB2uxAjiVhScgJqgVVLEN0dTz9J5aY-0gt75TDZp9XObAslLGKDXDf0vzHytUWdIs8ZjAwegCfUVn8WbkQQLemmjtD9mn6gJkrMndTe7p0lXrjyMXsStBIo`,
          },
        }
      )
      .then((res) => {
        if (res.data.data[0]) {
          const objective = res.data.data[0];

          setObjective({
            ...objective,
            id: objective.id,
            category_id: objective.category_id,
            sub_category_id: objective.sub_category_id,
            objective_name: objective.objective_name,
            time: objective.time,
            rules: objective.rules,
          });
          setVisibleEditForm(true);
        } else {
          setVisibleEditForm(false);
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/home");
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "sent data = " +
        "objective_name - " +
        objective.objective_name +
        ", sub_category_id- " +
        objective.sub_category_id +
        ", category_id- " +
        objective.category_id +
        ", time- " +
        objective.time
    );
    let updateObjective = {
      category_id: objective.category_id,
      sub_category_id: objective.sub_category_id,
      objective_name: objective.objective_name,
      time: objective.time,
      rules: objective.rules,
    };
    axios
      .put(
        `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/objective/update/${objective.id}`,
        updateObjective,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEzLCJhZG1pbl9uYW1lIjoic2FnYXJhaCIsImVtYWlsX2FkZHJlc3MiOiJzYWdhcmFoQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ3NDIwNjAyMzQ2LCJleHAiOjE2NDc0MjE4MTE5NDZ9.huDeLFH61HQSeFP_K_E2Co8h7JMNG57Hm8kRGUllnoaRw4yCjSdOl5Q9NaE58hIYNruRdwQz-tHf0UhzQzMT_-wSleXs2JhOmXJTIfWqwl9g8-qPQBcxUpUYyaHxBEYj8dtK4x-fJkUeBmPwuFcLa3ZBb7u8MV2F-NoTADtvZoEwEo-VeJ-T5ZCwx5Bgx20cvZAnSagPgu8ZOZcDMKDAMq_TnB-DtuILSS6Z8VJSeHqMhJ5aqYlXEf8RhyfT_B6vg_6lowqM5c-qlKpWljAqWNyWqxFx81Cca7cDQjVVraaSX8GNQQsOp5llhG3TAEyZ77uO8H30SFTmkbAG5ytUH2_iuftp-rPfeIgzvfxDEYaYMNgLGgHu3iVoO-L0zdUDaeMQYS-soK9EO3GepNWwka_IxqV_1bzrbc2Vha_xyVPOeHAhR1Y-18LcppfrnnBVszdlk2OthJs5Y244k3LtzvRemmMIhND7SgSxqe1CYaBZHWP_K7ezqmfOqxgozxBrLErfEzA08YT1x4_XE75AZHxGXoFk1kbc_rNRvJAneVb5DlcINgP9oB2uxAjiVhScgJqgVVLEN0dTz9J5aY-0gt75TDZp9XObAslLGKDXDf0vzHytUWdIs8ZjAwegCfUVn8WbkQQLemmjtD9mn6gJkrMndTe7p0lXrjyMXsStBIo`,
          },
        }
      )
      .then((res) => {
        if (res.data.data) {
          alert(res.data.message);
          setObjective({
            id: "",
            category_id: "",
            sub_category_id: "",
            objective_name: "",
            time: "",
            rules: "",
          });
          setVisibleEditForm(false);
          window.location.reload(false);
        } else {
          setMessage({
            status: true,
            success: false,
            message: res.data.message,
          });
          setVisibleEditForm(false);
        }
      })
      .catch((error) => {
        console.log("error = " + error);
        navigate("/home");
      });
  };

  const onCancel = (e) => {
    setCategories([]);
    setSubCategories([]);
    setObjective({
      id: "",
      category_id: "",
      sub_category_id: "",
      objective_name: "",
    });
    setVisibleEditForm(false);
  };

  const drawer = () => {
    return (
      <div>
        <form action="" method="put">
          <div class="form-group">
            <label for="categories">Category</label>
            <select
              class="form-control"
              id="categories"
              name="categories"
              onChange={(e) => {
                console.log("category_id :-" + e.target.value);
                setObjective({
                  ...objective,
                  category_id: e.target.value,
                });
              }}
            >
              <option value="">-Select-Category-</option>
              {categories.map(function (category, i) {
                if (category.id === objective.category_id) {
                  return (
                    <option key={i} value={category.id} selected>
                      {category.id} {category.categoryName}
                    </option>
                  );
                } else {
                  return (
                    <option key={i} value={category.id}>
                      {category.id} {category.categoryName}
                    </option>
                  );
                }
              })}
            </select>
            {categories.length === 0 && visibleEditForm ? (
              <small id="passwordHelp" class="text-danger">
                Category list is empty. Please create a category before creating
                an objective{" "}
              </small>
            ) : null}
          </div>

          <div class="form-group">
            <label for="subCategories">Sub Category</label>
            <select
              class="form-control"
              id="subCategories"
              name="subCategories"
              onChange={(e) => {
                console.log("sub_category_id :-" + e.target.value);
                setObjective({
                  ...objective,
                  sub_category_id: e.target.value,
                });
              }}
            >
              <option value="">-Select-Subcategory-</option>
              {subCategories.map(function (subCategory, i) {
                if (subCategory.id === objective.sub_category_id) {
                  return (
                    <option key={i} value={subCategory.id} selected>
                      {subCategory.id} {subCategory.subcategoryName}
                    </option>
                  );
                } else {
                  return (
                    <option key={i} value={subCategory.id}>
                      {subCategory.id} {subCategory.subcategoryName}
                    </option>
                  );
                }
              })}
            </select>
            {subCategories.length === 0 && visibleEditForm ? (
              <small id="passwordHelp" class="text-danger">
                Sub category list is empty. Please create a sub category before
                creating an objective{" "}
              </small>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="objective_name">Objective Name</label>
            <input
              type="text"
              name="objective_name"
              className="form-control"
              id="objective_name"
              value={objective.objective_name}
              onChange={(e) => {
                console.log("objective_name :-" + e.target.value);
                setObjective({
                  ...objective,
                  objective_name: e.target.value,
                });
              }}
              placeholder="Objective Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              className="form-control"
              id="time"
              value={objective.time}
              onChange={(e) => {
                console.log("time :-" + e.target.value);
                setObjective({
                  ...objective,
                  time: e.target.value,
                });
              }}
              placeholder="Time"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rules">Rules</label>
            <input
              type="text"
              name="rules"
              className="form-control"
              id="rules"
              value={objective.rules}
              onChange={(e) => {
                console.log("rules :-" + e.target.value);
                setObjective({
                  ...objective,
                  rules: e.target.value,
                });
              }}
              placeholder="Rules"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={onSubmit}
          >
            Submit
          </button>
          <button className="btn btn-light" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  };
  const arr = objectives.map((data, index) => {
    return (
      <tr>
        {/* <td>{data.id}</td> */}
        <td>{data.category_id}</td>
        <td>{data.sub_category_id}</td>
        <td>{data.objective_name}</td>
        <td>{data.time}</td>
        <td>{data.rules}</td>
        <td>
          <div className="row">
            <div className="col-6">
              <button
                // class="btn btn-deep-purple"
                onClick={() => editObjective(data.id)}
              >
                Edit
                {/* <i class="fa fa-pencil mr-1"></i> Edit */}
              </button>
            </div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-6">
              <button
                // className="deleteButton"
                onClick={() => deleteObjective(data.id)}
              >
                Delete
              </button>
            </div>
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
                    <h1 className="card-title">List of All Objective </h1>
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

                    <p className="card-description">Check All Objective List</p>
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Category Id</th>
                            <th>Sub Category Id</th>
                            <th>Objective Name</th>
                            <th>Time</th>
                            <th>rules</th>
                            <th>Action</th>
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
          {visibleEditForm === true ? drawer() : null}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default ObjectiveList;
