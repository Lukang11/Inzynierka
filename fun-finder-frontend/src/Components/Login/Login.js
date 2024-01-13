import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { serialize } from 'cookie';
import { useAuth } from '../../Utils/AuthProvider';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import loginImg from "./Images/login-img.png";

const Login = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/");
        }
      }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7000/users/login', {
                email,
                password,
            });

            await login(response.data.user);

            document.cookie = serialize('accessToken', response.data.accessToken, { path: '/', maxAge: 3600 });
            
            navigate("/profile");
        } catch (error) {
            console.error('Błąd logowania:', error.message);

            if (error.response && error.response.status === 401) {
                setError('Nieprawidłowy adres email lub hasło');
            } else {
                setError('Wystąpił błąd logowania. Spróbuj ponownie później.');
            }
        }
    };

    const handleLoginSuccess = async (credentialResponse) => {
        try {
          const decodedToken = jwtDecode(credentialResponse.credential);
      
          if (!decodedToken) {
            console.error('Failed to decode JWT token.');
            return;
          }
      
          const adaptedUser = {
            email: decodedToken.email,
            given_name: decodedToken.given_name,
            family_name: decodedToken.family_name,
          };
      
          document.cookie = serialize('accessToken', credentialResponse.credential, { path: '/', maxAge: 3600 });
      
          const response = await axios.post('http://localhost:7000/users/register-google', adaptedUser);
      
          if (response.status === 201) {
            await login(response.data.user);
            navigate("/profile");
          } else {
            console.error('Failed to register user:', response.statusText);
          }
        } catch (error) {
          console.error('Error decoding JWT token or registering user:', error);
        }
      };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="login-container">
            <div className="img-container">
                <img className="mobile-only-image-login" src={loginImg} />
                <div className="welcomeText-container-login">
                    <h1>Zaloguj</h1>
                    <p>Sprawdź co nowego znajdziesz w swojej okolicy</p>
                </div>
            </div>
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
                    <div className="login-error-message">{error}</div>
                    <div className="submit-btn">
                        <button type="submit">Zaloguj się</button>
                    </div>
                    <div className="google-login-button-container-login">
                        <GoogleLogin
                            buttonText="Zaloguj się z Google"
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginError}
                            render={renderProps => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="google-login-button"
                                >
                                    Zaloguj się z Google
                                </button>
                            )}
                        />
                    </div>
                </form>
                <div className="signupText">
                    <p>Nie masz konta? <Link to="/register">Zarejestruj Się!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
