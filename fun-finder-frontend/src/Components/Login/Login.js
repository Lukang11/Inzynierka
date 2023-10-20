import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <div className="title">
                    <h2>Logowanie</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Adres Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="submit-btn">
                        <button type="submit">Zaloguj się</button>
                    </div>
                </form>
                <div className="signupText">
                    <p>Nie masz konta? <a href="/register">Zajerestruj Się!</a></p>
                </div>
            </div>

        </div>
    );
};

export default Login;