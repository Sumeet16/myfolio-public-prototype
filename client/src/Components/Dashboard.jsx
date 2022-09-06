import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const [userData, setuserData] = useState({});
    const domainName = userData.domain;

    const callDashboard = async (e) => {
        try {
            const res = await fetch('http://localhost:3080/dashboard', {
                method: "GET",
                credentials: 'include',
                headers: {
                    // Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setuserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
            history.push("/login");
        }
    }

    useEffect(() => {
        callDashboard();
    }, []);

    return (
        <>
            <form method='GET'>
                <a href={window.location.protocol +
                    "//" +
                    domainName +
                    "." +
                    window.location.host} target="_blank" rel='noreferrer'><h1>{userData.domain}.myfolio.fun</h1></a>
                {/* <label htmlFor="">Enter about yourself: </label>
                <input type="text" name="about" id="about" /><br /><br />
                <label htmlFor="">Enter anything here: </label>
                <input type="text" name="anything" id="anything" /><br /><br />
                <button type="submit">Update</button> */}
            </form>
        </>
    );
};

export default Dashboard;
