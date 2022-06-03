import Link from 'next/link';
import { useState, useEffect } from 'react';
import vaild from '../utils/valid';
import { postData } from '../utils/fetchData';
import Router from "next/router";
import { toast } from 'react-toastify';
import Loading from '../components/loading';
import styles from '../styles/auth.module.scss'
import bg from "../public/bg1.jpg"
import Image from 'next/image'

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
                toast.success("Congratulations, your account has been successfully created.")
                Router.push("/login")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(res.err);
        }
    }

    return (
        <div className={styles.container}>
            {
                loading && <Loading />
            }
            <div className={styles.cont_bg}>
                <Image className={styles.backgorund} src={bg} alt="background"/>
            </div>
            <form onSubmit={handleSubmit} method="POST" className={styles.form2}>
                <h1 className={styles.title}>Register</h1>
                <div className={styles.main}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input className={styles.input} type="text" id="username" placeholder="Username" name="username" value={username} onChange={handleInputChange} autoFocus />
                </div>
                <div className={styles.main}>
                    <label htmlFor="email" className={styles.label}>Email address</label>
                    <input className={styles.input} type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleInputChange} />
                </div>
                <div className={styles.main}>
                    <label htmlFor="phone" className={styles.label}>Phone No.</label>
                    <input className={styles.input} type="number" id="phone" placeholder="Phone no." name="phone" value={phone} onChange={handleInputChange} />
                </div>
                <div className={styles.main}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input className={styles.input} type="password" id="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <div className={styles.main}>
                    <label htmlFor="c_password" className={styles.label}>Confirm Password</label>
                    <input className={styles.input} type="password" id="c_password" placeholder="Confirm Password" name="c_password" value={c_password} onChange={handleInputChange} />
                </div>
                <div className={styles.cont_button}>
                    <button type="submit" className={styles.button}>Register</button>
                </div>
                <p className={styles.login}>Already have an account? <Link href="/login"><a className={styles.link}>Login</a></Link></p>
            </form>
        </div>
    )
}

export default Register