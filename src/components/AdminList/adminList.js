import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";
import Dashboard from "../DashBoard/dashboard";
import DashboardFooter from "../DashBoard/dashboard_footer";
import DashboardMenu from "../DashBoard/dashboard_menu";
import "../assets/category.scss";

function AdminList() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Objective, SetObjective] = useState({
    id: "",
    admin_name: "",
    email_address: "",
    mobile_number: "",
  });
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    axios
      .get("/adminnew/getAllAdmin", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEzLCJhZG1pbl9uYW1lIjoic2FnYXJhaCIsImVtYWlsX2FkZHJlc3MiOiJzYWdhcmFoQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ3NDIwNjAyMzQ2LCJleHAiOjE2NDc0MjE4MTE5NDZ9.huDeLFH61HQSeFP_K_E2Co8h7JMNG57Hm8kRGUllnoaRw4yCjSdOl5Q9NaE58hIYNruRdwQz-tHf0UhzQzMT_-wSleXs2JhOmXJTIfWqwl9g8-qPQBcxUpUYyaHxBEYj8dtK4x-fJkUeBmPwuFcLa3ZBb7u8MV2F-NoTADtvZoEwEo-VeJ-T5ZCwx5Bgx20cvZAnSagPgu8ZOZcDMKDAMq_TnB-DtuILSS6Z8VJSeHqMhJ5aqYlXEf8RhyfT_B6vg_6lowqM5c-qlKpWljAqWNyWqxFx81Cca7cDQjVVraaSX8GNQQsOp5llhG3TAEyZ77uO8H30SFTmkbAG5ytUH2_iuftp-rPfeIgzvfxDEYaYMNgLGgHu3iVoO-L0zdUDaeMQYS-soK9EO3GepNWwka_IxqV_1bzrbc2Vha_xyVPOeHAhR1Y-18LcppfrnnBVszdlk2OthJs5Y244k3LtzvRemmMIhND7SgSxqe1CYaBZHWP_K7ezqmfOqxgozxBrLErfEzA08YT1x4_XE75AZHxGXoFk1kbc_rNRvJAneVb5DlcINgP9oB2uxAjiVhScgJqgVVLEN0dTz9J5aY-0gt75TDZp9XObAslLGKDXDf0vzHytUWdIs8ZjAwegCfUVn8WbkQQLemmjtD9mn6gJkrMndTe7p0lXrjyMXsStBIo`,
        },
      })

      .then((res) => {
        console.log("Getting from:", res.data);
        setData(res.data.data);
      })

      .catch((err) => console.log(err));
  }, [deleteId]);

  console.log(visible);
  console.log(Objective);
  const drawer = () => {};
  const arr = data.map((data, index) => {
    return (
      <tr style={{ color: "#848e8a" }}>
        {/* <td>{data.id}</td> */}
        <td>{data.id}</td>
        <td>{data.admin_name}</td>
        <td>{data.email_address}</td>
        <td>{data.mobile_number}</td>
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
                    <h1 className="card-title">Admin List </h1>
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>ADMIN NAME</th>
                            <th>EMAIL ADDRESS</th>
                            <th>MOBILE NUMBER</th>
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
          {visible == true ? drawer() : null}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default AdminList;
