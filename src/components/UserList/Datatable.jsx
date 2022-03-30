/** @format */

import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import "./datatable.scss";
import "./model.css";
import "../assets/category.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid, GridCellEditCommitParams } from "@mui/x-data-grid";
import { userColumns, userRows } from "./userlistSource";
import Dashboard from "../DashBoard/dashboard";
import DashboardMenu from "../DashBoard/dashboard_menu";
// import { Button } from "@mui/material";
import { Modal, Button, Col, Row, Container } from "react-bootstrap";
var dayjs = require("dayjs");

const Datatable = () => {
  useEffect(() => {
    getItems();
  }, []);

  const [userDetail, setuserDetail] = useState([]);
  const [viewUserDetail, setviewUserDetail] = useState([]);
  const [show, setshow] = useState(false);
  const handleShow = (id) => {
    setshow(true);
    getOneUserDetail(id);
  };
  const handleClose = () => {
    setshow(false);
    setviewUserDetail([]);
  };

  const getItems = () => {
    axios
      .get(`/user/get-all-users`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjUxOSwidXNlcm5hbWUiOiJkdWxhbl9TIiwiZ2VuZGVyIjoibWFsZSIsImJpcnRoZGF5IjoiMTk5OS0wNS0yNSIsImVtYWlsX2FkZHJlc3MiOiJkdWxhbi5TQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIrOTQ3MTIzNDU2Nzg5IiwiaXNfYWN0aXZlIjp0cnVlfSwiaWF0IjoxNjQ3MDA5ODQwNDMzLCJleHAiOjE2NDcwMTEwNTAwMzN9.IIXXf1jWlIqfZryI1HskYtCgIZm0aQ4wAfSWvvyfzbYnUo5v-h2OaUvrvtHGjEDE4DpwJiSrxanwO7lE__WdZsO-bL6huoRlFOZ2rqMcrItGRiVVmcW3R9CUeSyzGvbJiSR7X2tACEriEly3vltcLEQniShTMMjz9OYc7JMZhWnX3fXZaEO3OuMwmdHJSrtjzjvKOPQX0xY1IgOFDn2-DIeYUdWYUbH-Nf9h1wzas5BrXg3TkGd_AMcNhDhD0xlK9xckAKd2VDFS3ObE9CSzSXpTQ4Ie5H91v6p7y_ChDkaLG3SiImuc026bCHMm0jIJQWkp_l4QPByPcur0NwBhFai3bT-UpI5Qbb7QNAX2bUIhunK5rhQX0HQx-r8FzQ7c1FuUGk4z2kmvb4gom3f_ZrAQoR5YtCznTn0olUJ7YjqtdC1JJUkH-sl7hcE7GbBRrm-8BjkjeaN1iKaMXNAqnjHRse7THgII5kOun6le2uo5QzreWUUXAp1fKL-aakbKZA7txReJ__i2YRuo_1zknMZ6fXR0sm31dG7N3SPzXeJJ4mmReiykbA5-xDxRs0t5qsAU9L-arv94bLDaHe-wbpFqA_R7zqL6j2yQzyEql3iL2FEEfff1d-exmwDjhCDTuC143FUANODhLF8lDYtxOCpNxL8dyYS8HJdmc6ywYlw`,
        },
      })
      .then((res) => {
        if (
          res.data.status === 200 &&
          res.data.message === "All Users List Received" &&
          res.data.data.length > 0
        ) {
          console.log(res.data);
          console.log(res.data.message);
          // console.log(res.data.length);
          const users = res.data.data;
          setuserDetail(users);

          // loopUsername();
          // console.log("userdetails:", userDetail[[0]].username);
        } else if (res.data.data.length === 0) {
          console.log(res.data.message);
        } else {
          console.error("internal database Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOneUserDetail = (userRowId) => {
    axios
      .get(`/user/profile/${userRowId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjUxOSwidXNlcm5hbWUiOiJkdWxhbl9TIiwiZ2VuZGVyIjoibWFsZSIsImJpcnRoZGF5IjoiMTk5OS0wNS0yNSIsImVtYWlsX2FkZHJlc3MiOiJkdWxhbi5TQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIrOTQ3MTIzNDU2Nzg5IiwiaXNfYWN0aXZlIjp0cnVlfSwiaWF0IjoxNjQ3MDA5ODQwNDMzLCJleHAiOjE2NDcwMTEwNTAwMzN9.IIXXf1jWlIqfZryI1HskYtCgIZm0aQ4wAfSWvvyfzbYnUo5v-h2OaUvrvtHGjEDE4DpwJiSrxanwO7lE__WdZsO-bL6huoRlFOZ2rqMcrItGRiVVmcW3R9CUeSyzGvbJiSR7X2tACEriEly3vltcLEQniShTMMjz9OYc7JMZhWnX3fXZaEO3OuMwmdHJSrtjzjvKOPQX0xY1IgOFDn2-DIeYUdWYUbH-Nf9h1wzas5BrXg3TkGd_AMcNhDhD0xlK9xckAKd2VDFS3ObE9CSzSXpTQ4Ie5H91v6p7y_ChDkaLG3SiImuc026bCHMm0jIJQWkp_l4QPByPcur0NwBhFai3bT-UpI5Qbb7QNAX2bUIhunK5rhQX0HQx-r8FzQ7c1FuUGk4z2kmvb4gom3f_ZrAQoR5YtCznTn0olUJ7YjqtdC1JJUkH-sl7hcE7GbBRrm-8BjkjeaN1iKaMXNAqnjHRse7THgII5kOun6le2uo5QzreWUUXAp1fKL-aakbKZA7txReJ__i2YRuo_1zknMZ6fXR0sm31dG7N3SPzXeJJ4mmReiykbA5-xDxRs0t5qsAU9L-arv94bLDaHe-wbpFqA_R7zqL6j2yQzyEql3iL2FEEfff1d-exmwDjhCDTuC143FUANODhLF8lDYtxOCpNxL8dyYS8HJdmc6ywYlw`,
        },
      })
      .then((res) => {
        if (
          res.data.code === 200 &&
          res.data.message === "profile exists" &&
          res.data.data.length > 0
        ) {
          // console.log("response:", res.data);
          console.log(res.data.data[0].username);
          // console.log(res.data.message);
          // console.log(res.data.length);
          const user = res.data.data[0];
          // console.log("user", user);
          setviewUserDetail(user);
          // console.log(viewUserDetail);

          // loopUsername();
          // console.log("userdetails:", userDetail[[0]].username);
        } else if (res.data.data.length === 0) {
          console.log(res.data.message);
        } else {
          console.error("internal database Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteItems = (rowId) => {
    axios
      .delete(`/adminnew/deleteUser/${rowId}`, {
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
          // console.log(rowId, "hello");
        } else if (res.data.success === false) {
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
        // console.log(res.data.length);
        // const users = res.data.data;
        // setuserDetail(users);
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("delete fail! server error", error);
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "View profile",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              variant="success"
              size="sm"
              onClick={() => handleShow(params.row.id)}
            >
              View
            </Button>
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            {/* <div className="deleteButton">Delete</div> */}
          </div>
        );
      },
    },
  ];

  const actionColumn2 = [
    {
      field: "action2",
      headerName: "Delete user",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteItems(params.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleCommit = (e) => {
    const body = (r) => {
      if ((r.field = "username")) {
        return {
          username: r.value,
          body: "",
          mobile_number: "",
        };
      } else if ((r.field = "email_address")) {
        return {
          username: "",
          email: r.value,
          mobile_number: "",
        };
      } else {
        return {
          username: "",
          email: "",
          mobile_number: r.value,
        };
      }
    };

    console.log("edit data:", e.value);

    // axios
    //   .put(
    //     `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000//${e.id}`,
    //     body(e),
    //     {
    //       headers: {
    //         Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjgsImFkbWluX25hbWUiOiJBbnVyYSBBbWFyYWJhbmR1IiwiZW1haWxfYWRkcmVzcyI6ImFudXJhQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjQ2ODA1OTcyNTYyLCJleHAiOjE2NDY4MDcxODIxNjJ9.ovNWylxyptm9pXJ4dxYR8robCKekTFjjaZjrLOaup3zhg3RK8o6elT8E4iwN6251RMvEux25SzQUBbo3EXDxAvuv1dPLEk1jL04P_rRejurY1W6C_b8LceqWpcJbuVKKJHigik4v8GxBguAsnUEeKsB_tNypKaSWv6K0pgt6ajuaEZktSKeHwuGVGmv8Zhpccbkh7R_gW1KkJs-iBRqn27aTBDX2XUSt94_J1pu0dTI6-Au4zHKwp-H8-PkFK1yq8e0cUZUzbvYOAy9QeUIinVQk0Nx0rRtp4fE1GVkQe_s5Zq819ZT_5HdjXkHE3XIBpkUcCR7Mgf68VfrdVE0awaXFiOzob3uQu7Wq86B0HYQmndFMEQeMOHCu6xbnbY-QT8IqwUSPBJeLunfkksMc6hHjI5kpCPieJ_HWIqsa-h-gG9F0T2g0eMkxWUV2jHsXwgKltcz0lI5Nh7L6OgCllZrEhTFt3K81qhaYKgIztZOEK4XLtAgj0ClK0U-DLSev1y7a4iZXx3PgyT14hCx9ljfvLXjDhCmKKSRko_1lYMVSuwl2a1e_WVfTbk46gKEXyDn_8V3lEeqCrlfu-UI2aCwcZB36t2tRQBqT2z7qYjVvnfNXMu3pPF5aq-qme7mhn-kT4QskKXvWXFft-4D6wqEnGxx91ksc1GEQ8wnQ3NA`,
    //       },
    //     }
    //   )
    //   .then(res => {
    //     if (res.data.status === 200 && res.data.status === "OK") {
    //       console.log(res.data.message);
    //     } else {
    //       console.log(res.data.message);
    //     }
    //     // console.log(res.data.length);
    //     // const users = res.data.data;
    //     // setuserDetail(users);
    //   })
    //   .then(res => {
    //     window.location.reload(false);
    //   })
    //   .catch(error => {
    //     console.error("delete fail! server error", error);
    //   });

    // editItems(e.id);
    // const array = userDetail.map(r => {
    //   if (r.id === e.id) {
    //     editItems;
    //     return { ...r, [e.field]: e.value };
    //   } else {
    //     return { ...r };
    //   }
    // });
    // setuserDetail(array);
    // console.log(array);
  };

  return (
    <>
      <div className="container-scroller">
        <Dashboard />
        <div className="container-fluid page-body-wrapper">
          <DashboardMenu />
          {/*right side bar content*/}
          <div id="right-sidebar" className="settings-panel">
            <i className="settings-close ti-close" />
            <ul
              className="nav nav-tabs border-top"
              id="setting-panel"
              role="tablist"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="todo-tab"
                  data-toggle="tab"
                  href="#todo-section"
                  role="tab"
                  aria-controls="todo-section"
                  aria-expanded="true"
                >
                  TO DO LIST
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="chats-tab"
                  data-toggle="tab"
                  href="#chats-section"
                  role="tab"
                  aria-controls="chats-section"
                >
                  CHATS
                </a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div
                className="tab-pane fade show active scroll-wrapper"
                id="todo-section"
                role="tabpanel"
                aria-labelledby="todo-section"
              >
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        className="form-control todo-list-input"
                        placeholder="Add To-do"
                      />
                      <button
                        type="submit"
                        className="add btn btn-primary todo-list-add-btn"
                        id="add-task"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Resolve all the low priority tickets due today
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="checkbox"
                            type="checkbox"
                            defaultChecked
                          />
                          Schedule meeting for next week
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="checkbox"
                            type="checkbox"
                            defaultChecked
                          />
                          Project review
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                  </ul>
                </div>
                <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">
                  Events
                </h4>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary mr-2" />
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Creating component page build a js
                  </p>
                  <p className="text-gray mb-0">The total number of sessions</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary mr-2" />
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">
                    Meeting with Alisa
                  </p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              </div>
              {/* To do section tab ends */}
              <div
                className="tab-pane fade"
                id="chats-section"
                role="tabpanel"
                aria-labelledby="chats-section"
              >
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                    Friends
                  </p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">
                    See All
                  </small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile">
                      <img src="../../images/faces/face1.jpg" alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../../images/faces/face2.jpg" alt="image" />
                      <span className="offline" />
                    </div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">
                      4
                    </div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../../images/faces/face3.jpg" alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../../images/faces/face4.jpg" alt="image" />
                      <span className="offline" />
                    </div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../../images/faces/face5.jpg" alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile">
                      <img src="../../images/faces/face6.jpg" alt="image" />
                      <span className="online" />
                    </div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>
              {/* chat tab ends */}
            </div>
          </div>
          {/*card content*/}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      {/* <div>
                        {userDetail.map(item => (
                          <p key={item.id}>{JSON.stringify(item.username)}</p>
                        ))}
                      </div> */}
                      {/*table content*/}
                      <div className="datatable">
                        <div className="datatableTitle">
                          User Details
                          <div className="datatableList">
                            <div className="search">
                              <input type="text" placeholder="Search..." />
                              <SearchOutlinedIcon />
                            </div>
                            <Link to="/category" className="link">
                              Add New
                            </Link>
                          </div>
                        </div>
                        <DataGrid
                          onCellEditCommit={handleCommit}
                          rows={userDetail} //userDetail
                          columns={userColumns.concat(
                            actionColumn,
                            actionColumn2
                          )}
                          // rowSpacingType='border'
                          // editMode="cell"
                          // rowHeight={52}
                          pageSize={9}
                          rowsPerPageOptions={[9]}
                          // checkboxSelection
                        />
                        <Modal show={show}>
                          {/* <Modal.Header>
                            <Modal.Title>User Details</Modal.Title>
                          </Modal.Header> */}

                          <Modal.Body>
                            <div className="model-div">
                              <div className="model-div-img">
                                <img
                                  className="img-div"
                                  src={viewUserDetail.player_card_url}
                                />
                              </div>
                              <div className="model-div-userinfo">
                                <div className="model-div-name">
                                  <h3>{viewUserDetail.username}</h3>&nbsp;
                                  <p>
                                    <strong>({viewUserDetail.gender})</strong>
                                  </p>
                                </div>
                                <h6>{viewUserDetail.email_address}</h6>
                                <h6>{viewUserDetail.mobile_number}</h6>
                                <h6>
                                  {dayjs(viewUserDetail.birthday).format(
                                    "DD-MM-YYYY"
                                  )}
                                </h6>
                              </div>
                            </div>
                            <div className="model-div-close-btn">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={handleClose}
                              >
                                Close
                              </Button>
                            </div>
                          </Modal.Body>

                          {/* <Modal.Footer></Modal.Footer> */}
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Datatable;
