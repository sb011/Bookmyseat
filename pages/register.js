import Link from 'next/link';
import { useState, useEffect } from 'react';
import vaild from '../utils/valid';
import { postData } from '../utils/fetchData';
import Router from "next/router";
import { toast } from 'react-toastify';
import Loading from '../components/loading';

const Register = () => {
    const state = {
        username: '',
        email: '',
        phone: '',
        password: '',
        c_password: ''
    }

    const [user, setUser] = useState(state)
    const { username, email, phone, password, c_password } = user
    const [loading, setLoading] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const err = vaild(username, email, phone, password, c_password)
            if(err)
                return toast.error(err);
                
            const res = await postData('auth/register', user)  
            if(res.err)
                return toast.error(res.err);
            else{
                Router.push("/login")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(res.err);
        }
    }

    return (
        <div>
            {
                loading && <Loading />
            }
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleInputChange} />
                    <small id="emailHelp">We'll never share your email with anyone else.</small>
                </div>
                <div>
                    <label htmlFor="phone">Phone No.</label>
                    <input type="number" id="phone" placeholder="Phone no." name="phone" value={phone} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="c_password">Confirm Password</label>
                    <input type="password" id="c_password" placeholder="Confirm Password" name="c_password" value={c_password} onChange={handleInputChange} />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link href="/login"><a>Login</a></Link></p>
            </form>
        </div>
    )
}

export default Register