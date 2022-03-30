/** @format */

import React, { Component } from "react";
import DashboardFooter from "./dashboard_footer";
// import {useHistory } from "react-router-dom";



class DashboardMenu extends Component {
  render() {

    return (
      <div>
        <div>
          <div id="right-sidebar" className="settings-panel">
          </div>

          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <i className="icon-grid menu-icon" />
                  <span className="menu-title">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic">
                  <i className="icon-layout menu-icon" />
                  <span className="menu-title">Category</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a className="nav-link" href="/category">
                        New Category
                      </a>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <a className="nav-link" href="/all_category">
                        Category List
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#form-elements"
                  aria-expanded="false"
                  aria-controls="form-elements">
                  <i className="icon-columns menu-icon" />
                  <span className="menu-title">Sub Category</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="form-elements">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/sub_category">
                        New Sub Category
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/all__sub_category">
                        Sub Category List
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#charts"
                  aria-expanded="false"
                  aria-controls="charts">
                  <i className="icon-bar-graph menu-icon" />
                  <span className="menu-title">Objectives</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="charts">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a className="nav-link" href="/objective">
                        New Objective
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/objective_list">
                        Objective List
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#tables"
                  aria-expanded="false"
                  aria-controls="tables">
                  <i className="icon-grid-2 menu-icon" />
                  <span className="menu-title">Admin List</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="tables">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        href="/Admin_list">
                        Admin list

                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#icons"
                  aria-expanded="false"
                  aria-controls="icons">
                  <i className="icon-head menu-icon" />
                  <span className="menu-title">User List</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="icons">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a className="nav-link" href="/userlist">
                        User list
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth">
                  <i className="icon-contract menu-icon" />
                  <span className="menu-title">Add Users</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a className="nav-link" href="pages/samples/login.html">
                        {" "}
                        Login{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        href="pages/samples/register.html">
                        {" "}
                        Register{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#error"
                  aria-expanded="false"
                  aria-controls="error">
                  <i className="icon-ban menu-icon" />
                  <span className="menu-title">Profile</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="error">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        href="pages/samples/error-404.html">
                        {" "}
                        404{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html">
                        {" "}
                        500{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
export default DashboardMenu;
