import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import accountService from '../../services/account';

export default function Register() {
    const [successRegister, setSuccessRegister] = useState(false);
    const [alert, setAlert] = useState(false);
    const [userType, setUserType] = useState("user");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    async function executeRegistration() {
        try {
            if (password !== confPassword) {
                throw new Error("Passwords must match");
            }
            await accountService.registerUser({
                isModerator: userType === "moderator" ? true : false,
                userName,
                password,
                confPassword
            });
            setUserName("");
            setUserType("user");
            setPassword("");
            setConfPassword("");
            setSuccessRegister(true);
            setAlert(false);
        } catch (e) {
            console.log(e);
            setAlert(true);
        }
    }

    return (
        <div className="container">
            {successRegister &&
                <div className="alert alert-success">
                    Successfully registered. Please login now.
                </div>
            }
            {alert &&
                <div className="alert alert-danger">
                    Failed to register.
                </div>
            }
            <h1>Register</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="usertype" className="col-sm-2 col-form-label">
                        User Type </label>
                    <div onChange={(e) => setUserType(e.target.value)} className="col-sm-10">
                        <select id="usertype" className="form-control">
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="username" className="col-sm-2 col-form-label">
                        Username </label>
                    <div className="col-sm-10">
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="username" placeholder="whiterabbit69" />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="password" className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password"
                            placeholder="123qwe#$%" />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="verify-password" className="col-sm-2 col-form-label">
                        Verify Password </label>
                    <div className="col-sm-10">
                        <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" className="form-control" id="verify-password"
                            placeholder="123qwe#$%" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block" type="button" onClick={executeRegistration}>
                            Register
                        </button>
                        <div className="row">
                            <div className="col-6">
                                <Link className="float-left" to={{
                                    pathname: "/login",
                                }}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}