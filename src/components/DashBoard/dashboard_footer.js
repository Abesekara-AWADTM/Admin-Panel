import React, { Component } from "react";
class DashboardFooter extends Component {
  render() {
    return (
      <div>
        <div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Copyright © 2022.from Fitbets. All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Fitbets - Admin
              </span>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
export default DashboardFooter;
