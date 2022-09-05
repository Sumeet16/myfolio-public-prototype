import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useSetBodyColor from '../hooks/bodyColor';
import styles from '../cssModules/login.module.scss'

const Login = () => {
  
  useSetBodyColor({color: "#AAC6FC"})

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

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      <div className={styles.formAndIllsMainContainer}>
        <div className={styles.formContainer}>
          <form method='POST'>
            <div className={styles.inputsContainer}>
              <input placeholder='Email' type="text" name="email" id="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
              <input placeholder='Password' type="password" name="password" id="passwrod" value={password} onChange={(e) => { setpassword(e.target.value) }} />
            </div>
            <button className={styles.formSubmitBtn} type="submit" onClick={loginUser}>Login</button>
          </form>
          <p>Not a user? <NavLink activeClassName="active_class" to="/register">Register</NavLink></p>
        </div>
      </div>
    </>
  );
};

export default Login;
