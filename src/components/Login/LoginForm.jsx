import { Link } from "react-router-dom";

import "../Login/style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function LoginForm(props) {
  const [admin_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [device_token] = useState("12345678");
  const [error, setError] = useState("");

  function loginPost(e) {
    e.preventDefault();
    const loginData = {
      admin_name,
      password,
      device_token,
    }; 

    axios
      .post(
        `http://ec2-35-83-63-15.us-west-2.compute.amazonaws.com:8000/adminnew/login`,
        loginData
      )
      .then((response) => {
        localStorage.setItem('token',JSON.stringify(response.data.token));
        console.log(response);
        const status = response.status;
        console.log(status);
        console.log(response.data.token);
        console.log(response.data.success);
        if (response.status == 200 && response.data.success) {
          window.location = "/home";
        } else {
          console.log("Invalid username or password");
          setError("Invalid username or password");
        }

      })
      .catch((err) => { 
        if(!err.data.success){
          console.log("Invalid username or password");
          setError("Invalid username or password");
        }       
          setError("Server error");
          console.log("Server error");
      });
  }

  // handlePasswordChange(e){
  //   this.setState({password: e.target.value});
  // };

  // handleUsernameChange(e){
  //   this.setState({password: e.target.value});
  // };
  return (
    <div>
      <img className="wave" src="../assets/imges/wave.png" />
      <div className="containerss">
        <div className="img">
          <img src="./../../assets/img/admin_cover.svg" />
        </div>
        <div className="login-content">
          <div className="formc">
            <form onSubmit={loginPost}>
              <img src="./../../assets/img/avatar.svg" />
              <h2 className="title">Fitbets</h2>
              {error && <p className="error"> {error} </p>}
              {/* {error != "" ? <div className="error">{error}</div> : "asdas"} */}

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">                  
                  <input required
                    type="text"
                    value={admin_name}
                    onChange={(e) => setName(e.target.value)}

                    // onChange={this.handleUsernameChange.bind(this)}
                  />
                  <label>Username</label>
                </div>
              </div>


              <div className="input-div pass">
                <div className="i">
                  <FontAwesomeIcon icon={faLock} />
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  
                  <input required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    // onChange={this.handlePasswordChange.bind(this)}
                  />
                  
                  <label>Password</label>
                </div>
              </div>

              

              <a href="#">Forgot Password?</a>
              <input type="submit" className="btn" value="Login" />
            </form>
          </div>
        </div>
      </div>
      <script type="text/javascript" src=""></script>
    </div>
  );
}

const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});
