import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { useEffect, useState } from "react"
import userImg from '../assets/Images/user-img.jpg';

function MyButton() {
    function handleClick() {
        alert("Button clicked");
    }
    return <button onClick={handleClick}>I'm a button</button>;
}

const Home = () => {

    const [usersProfile, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/usersProfile")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    function Profile() {
        return (
            <img src={userImg} alt="Katherine Johnson" />
        );
    }

    // ------Count-on-Click-------

    const [count, setCount] = useState(0);
    return (
        <>
            <div className="main_layout">
                <div className="App">
                    Button Return
                    <MyButton />
                </div>
                <Profile />
                <div className="count mt-3">
                    <button onClick={() => setCount(count + 1)}>click me</button>
                    console.log();
                </div>
                <h2>Rendering User lists By Api</h2>
                <div className="user">
                    {usersProfile.length === 0 ? (
                        <p className="text-center text-danger">No users found</p>
                    ) : (

                        <div className="row m-0 g-3">
                            {usersProfile.map((user) => (
                                <div key={user.id} className="col-md-4">
                                    <div className="card">
                                        <div className="card-body d-flex">
                                            <p className="user-img">
                                                <img src={user.imgUrl} alt={user.name} width="100" height="100" />
                                            </p>
                                            <div className="user-info">
                                                <h4 className="card-title">{user.name}</h4>
                                                <p className="card-text">{user.email}</p>
                                                <p className="card-text">{user.age}</p>
                                                <p className="card-text">{user.occupation}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to="/login">Go to Login</Link>
                </div>
            </div>
        </>
    );
}

export default Home;