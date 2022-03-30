import { Component } from "react";

import Dashboard from "./DashBoard/dashboard";
import DashboardMenu from "./DashBoard/dashboard_menu";

class Home extends Component {
  render() {
    return (
      <div className="container-scroller">
        <Dashboard />
        <div className="container-fluid page-body-wrapper">
          <DashboardMenu />
        </div>
      </div>
    );
  }
}
export default Home;
