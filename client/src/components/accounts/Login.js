import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import accountService from '../../services/account';

export default function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

    async function executeSignIn() {
        try {
            const user = await accountService.login({
                userName,
                password
            });
            // Need to save user in cookies here
            setSuccessLogin(true);
        } catch (e) {
            console.log(e);
            setFailed(true);
        }
    }

    if (successLogin) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <div className="container">
            <h1>Login</h1>
            {failed &&
                <div className="alert alert-danger">
                    Failed to login.
                </div>
            }
            <form>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input value={userName} onChange={e => setUserName(e.target.value)} className="form-control" id="username" placeholder="Alice" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password"
                            placeholder="123qwe#$%" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button type="button" onClick={executeSignIn} className="btn btn-primary btn-block">
                            Sign in
                        </button>
                        <div className="row">
                            <div className="col-6">
                                <span className="float-left">Forgot Password?</span>
                            </div>
                            <div className="col-6">
                                <Link className="float-right" to={{
                                    pathname: "/register",
                                }}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}