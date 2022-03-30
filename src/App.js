/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard/dashboard";
import NewCategory from "./components/Category/addCategory";
import Home from "./components/Home";
import CategoryList from "./components/Category/CategoryList";
import NewSubCategory from "./components/Subcategory/addSubCategory";
import EditCategory from "./components/Category/editCategory";
import SubCategoryList from "./components/Subcategory/subCategoryList";
import EditSubCategory from "./components/Subcategory/editSubCategory";
import NewObjective from "./components/Objective/addObjective";
import ObjectiveList from "./components/Objective/objectiveList";
import AdminList from "./components/AdminList/adminList";
import UserList from "./components/UserList/Datatable";
// import AdminList from "./components/AdminList/Datatable";
import Login from "./components/Login/LoginForm";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/category" element={<NewCategory />}></Route>
          <Route path="/" element={ <Login />}></Route>
          <Route path="/all_category" element={<CategoryList />}></Route>
          <Route path=":id" element={<EditCategory />}></Route>
          <Route path="/sub_category" element={<NewSubCategory />}></Route>
          <Route path="/all__sub_category" element={<SubCategoryList />}></Route>
          <Route path="/edit_sub_category/:id" element={<EditSubCategory />}></Route>
          <Route path="/objective" element={<NewObjective />}></Route>
          <Route path="/objective_list" element={<ObjectiveList />}></Route>
          <Route path="/Admin_list" element={<AdminList />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
          {/* <Route path="/adminList" element={<AdminList />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
