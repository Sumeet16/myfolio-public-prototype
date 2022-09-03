import React, { useState } from 'react';
import Login from './Components/login';
import Register from './Components/register';
import Dashboard from './Components/Dashboard';
import portfoilo from './Components/portfoilo';
import { Route, NavLink } from 'react-router-dom';
import HomePage from './Components/HomePage';

const App = () => {
    const arr = [];
    const [name, setname] = useState("");
    const findDomain = async () => {
        const host = window.location.host; // gets the full domain of the app
        const array = (host
            .split(".")
            .slice(0, host.includes("localhost") ? -1 : -2));
        arr.push(array)
        // console.log(arr[0]);
        if (arr[0].length !== 0) {
            const subDomain = arr[0];
            const res = await fetch("http://localhost:3080/domain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subDomain
                })
            })

            const data = await res.json();
            setname(data.userResult.name);
            // console.log(data);
            // return data;
        }
        console.log("New update 3");
    }

    findDomain()


    return (
        <>
            {
                arr[0].length === 0 ? (
                    <>
                        <div className="navbar">
                            <div className="logo">myfolio</div>
                            <div className="links">
                                <NavLink activeClassName="active_class" to="/login">
                                    <button className='navLoginBtn'>Login</button>
                                </NavLink>
                                <NavLink activeClassName="active_class" to="/register">
                                    <button className='navRegBtn'>Register</button>
                                </NavLink>
                            </div>
                        </div>

                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/portfoilo" component={portfoilo} />
                    </>
                ) : (name ? (<>
                    <h1 className="name">{name}</h1>
                    <p className="about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium necessitatibus totam praesentium voluptate soluta possimus rerum accusamus quod? Amet voluptatem temporibus tenetur, fugiat corrupti praesentium aperiam debitis? Quaerat</p>
                    <p className="anything">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore eaque deserunt excepturi cum sint placeat ducimus, magnam modi fugiat quas exercitationem adipisci dolorem nesciunt similique ullam hic maxime! Repellat, deserunt.</p>
                </>
                ) : (
                    <h1>Not Found</h1>
                )
                )
            }
        </>
    )
}

export default App;