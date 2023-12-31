import React, { SyntheticEvent, useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const id = 0;
    const navigate = useNavigate();


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
           
        console.log(name,password)
       
       const userId =  await fetch("http://localhost:5282/api/User/Save", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                Username:name,
                password
            })  
        })
        
        const IdData = await userId.json(); // Yanıtı JSON olarak çözümle
            
        if (IdData.isSuccess) {
            // Başarılı giriş
            navigate("/login")
            toast.success('Başariyla Hesap Oluşturdunuz..', {
                position: 'top-center', // Bildirimin pozisyonunu ayarlayabilirsiniz
                autoClose: 3000, // Bildirimin otomatik kapanma süresini belirleyebilirsiniz (ms cinsinden)
              });
        } else {
             toast.error(IdData.message,{
                position: 'top-center', // Bildirimin pozisyonunu ayarlayabilirsiniz
                autoClose: 3000, // Bildirimin otomatik kapanma süresini belirleyebilirsiniz (ms cinsinden)
             });
        }
    }

    return (
        <form onSubmit={submit} >
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>


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

export default Register;