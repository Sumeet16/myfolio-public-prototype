import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useSetBodyColor from '../hooks/bodyColor';
import styles from '../cssModules/register.module.scss'

const Register = () => {

  useSetBodyColor({color: "#FFFFFF"})

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
    <main className={styles.mainReg}>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      <div className={styles.formAndIllsMainContainer}>
        <div className={styles.formContainer}>
          <form method='POST'>
            <div className={styles.inputsContainer}>
              <input placeholder='Your Full Name' type="text" name="name" id="name" value={user.name} onChange={handleInputs} />
              <input placeholder='Email' type="text" name="email" id="email" value={user.email} onChange={handleInputs} />
              <input placeholder='Password' type="password" name="password" id="password" value={user.password} onChange={handleInputs} />
              <div className={styles.domainInputContainer}>
                <input placeholder='Enter a domain' type="text" name="domain" id="domain" value={user.domain} onChange={handleInputs} />
                <p>.localhost:3000</p>
              </div>
            </div>
            <button className={styles.formSubmitBtn} type="submit" onClick={postData}>Register</button>
          </form>
          <p>Already have an account? <NavLink activeClassName="active_class" to="/login">Login</NavLink></p>
        </div>
        <div className={styles.illsContainer}>
          <img height={'auto'} width={'100%'} src="/regillustration.png" alt="" />
        </div>
      </div>
    </main>
  );
};

export default Register;
