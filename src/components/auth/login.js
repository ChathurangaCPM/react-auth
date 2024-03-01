import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
const LOGIN_URL = '/auth/login';

export default function Login() {
    const { auth, setAuth, persist, setPersist, onLogin } = useAuth();
    

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from.pathName || "/authPage";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                email: email,
                password: pwd
            }
            const response = await axios.post(LOGIN_URL, data);

            console.log(response);
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            // localStorage.setItem('refreshToken', refreshToken);

            onLogin(response?.data);

            setAuth({ 
                user: response?.data.user,
                accessToken,
                refreshToken,
            });

            setEmail('');
            setPwd('');

            navigate(from, { replace: true });
        } catch (err) {
            console.log('err ===', err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])


    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}
