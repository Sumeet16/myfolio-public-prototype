import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [user, setuser] = useState({
    name: "", email: "", password: "", domain: ""
  });

  console.log(user);

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, domain } = user;

    const res = await fetch("http://localhost:3080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password, domain
      })
    });
    const data = await res.json();

    if (data.status == 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Register Fail");
    } else {
      window.alert("Registration Done");
      console.log("Register Succesfull");

      history.push("/login");
    }
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Registration Page</h1>
      <div style={{ width: "100%" }}>
        <form method='POST'>
          <label>Enter your full name here: </label>
          <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} /><br /><br />
          <label>Enter your email here: </label>
          <input type="text" name="email" id="email" value={user.email} onChange={handleInputs} /><br /><br />
          <label>Enter your password here: </label>
          <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} /><br /><br />
          <label>Enter your domain name here: </label>
          <input type="text" name="domain" id="domain" value={user.domain} onChange={handleInputs} /><label> .localhost:3000</label><br /><br />
          <button type="submit" onClick={postData}>Register</button>
        </form><br />
        <label>Already a user </label>
        <NavLink activeClassName="active_class" to="/login"> Login Page </NavLink>
      </div>
    </>
  );
};

export default Register;
