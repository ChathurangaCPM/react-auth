import React, { useState } from 'react'
import axios from "axios";



export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerSubmit = (e) => {
        e.preventDefault()
        console.log('email', email)
        console.log('pass', password);
        const configuration = {
            method: "post",
            url: "http://localhost:3015/auth/register",
            data: {
                email,
                password,
            },
        };

        axios(configuration)
            .then((result) => { console.log(result); })
            .catch((error) => { console.log(error); })
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handlerSubmit}>
                <input type="email" placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >Register</button>
            </form>
        </div>
    )
}
