import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componenets/Navbar'

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
        <div>
        <Navbar/>
          <div className='container'>
            <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>

              <div className="m-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
              </div>

              <button type="submit" className="m-3 btn btn-success">Login</button>
              <Link to="/createuser" className='m-3 btn btn-danger'>Create an Account</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
