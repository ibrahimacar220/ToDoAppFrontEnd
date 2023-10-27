import React, { useEffect, SyntheticEvent, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";


const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5282/api/Auth", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    Username: name,
                    password
                })
            });
    
            if (response.ok) {
                const Id = await fetch(`http://localhost:5282/api/User/GetId?userName=${name}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                const data = await response.text();
                const UserId = await Id.text();
                localStorage.setItem("jwtToken", data);
                localStorage.setItem("UserId", UserId);
                navigate("/");
            } else {
                // Giriş başarısız, hata mesajı gösterebilirsiniz.
            }
        } catch (error) {
            console.error("Giriş sırasında bir hata oluştu: ", error);
        }
        
        const Id = await fetch(`http://localhost:5282/api/User/GetId?userName=${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
    }
    return (

        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>


            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                onChange={e => setName(e.target.value)}
            />


            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
};

export default Login;