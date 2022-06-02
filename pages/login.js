import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../utils/firebaseConfig";
import { toast } from 'react-toastify';

const Register = () => {
    const state = {
        email: '',
        password: '',
    }

    const auth = getAuth(app);
    const [user, setUser] = useState(state)
    const [err, seterr] = useState('');
    const { email, password } = user

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Router.push("/")
        } catch (error) {
            return toast.error(error.message)
        }
        // const res = await postData('auth/login', user)  
    }

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <p>{err}</p>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link href="/register"><a>Register</a></Link></p>
            </form>
        </div>
    )
}

export default Register