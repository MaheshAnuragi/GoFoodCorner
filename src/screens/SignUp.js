import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../componenets/Navbar';

export default function SignUp() {
    let navigate = useNavigate();

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        if (json.success) {
            navigate("/loginuser")
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
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                            </div>

                            <div className="m-3">
                                <label htmlFor="geolocation" className="form-label">Address</label>
                                <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                            </div>

                            <button type="submit" className="m-3 btn btn-success">Submit</button>
                            <Link to="/loginuser" className='m-3 btn btn-danger'>Already an User</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
