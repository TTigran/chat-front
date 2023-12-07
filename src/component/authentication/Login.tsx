import React from 'react';
import './index.css'

export const Login = ({username, password, handleUsernameChange, handlePasswordChange, onLogin}: any) => {

    return (
        <div className="parent-cont">
            <div>
                <h1>Welcome our Chat Platform</h1>
            </div>
            <div className="container">
                <label htmlFor="uname">
                    <b>Username</b>
                </label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name="uname"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <label htmlFor="psw">
                    <b>Password</b>
                </label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <button onClick={onLogin} type="submit">Login</button>
                <label>
                    <input type="checkbox" name="remember"/> Remember me
                </label>
            </div>

        </div>
    )
}