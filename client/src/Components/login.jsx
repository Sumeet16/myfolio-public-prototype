import React, { useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3080/signin", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successful");
      history.push(`/dashboard?id=${data._id}`);
    }
  }

  return <div>
    <h1 style={{ textAlign: 'center' }}>Login Page</h1>
    <div style={{ width: "100%" }}>
      <form method='POST'>
        <label>Enter your email here: </label>
        <input type="text" name="email" id="email" value={email}  onChange={(e) => {setemail(e.target.value)}} /><br /><br />
        <label>Enter your password here: </label>
        <input type="password" name="password" id="passwrod" value={password}  onChange={(e) => {setpassword(e.target.value)}}/><br /><br />
        <button type="submit" onClick={loginUser}>Login</button>
      </form><br />
      <label>No a user </label>
      <NavLink activeClassName="active_class" to="/login"> Registration Page </NavLink>
    </div>
  </div>;
};

export default Login;
