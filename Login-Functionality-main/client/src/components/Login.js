import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let action = useDispatch();
  let onLogin = async () => {
    let sendData = new FormData();
    sendData.append("email", emailInputRef.current.value);
    sendData.append("password", passwordInputRef.current.value);

    let requestOptions = {
      method: "POST",
      body: sendData,
    };

    let jsonData = await fetch("http://localhost:4567/Login", requestOptions);

    let jsoData = await jsonData.json();

    if (jsoData.status == "Success") {
      action({ type: "login", data: jsoData.data });
      navigate("/dashboard");
    } else {
      alert(jsoData.msg);
    }

    console.log(jsoData);
  };

  return (
    <div>
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <div className="div">
        <Link to="/signup" className="link">
          Signup
        </Link>
        <h2>Don't you have the account? </h2>
      </div>
    </div>
  );
}

export default Login;
