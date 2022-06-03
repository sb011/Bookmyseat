import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../utils/firebaseConfig";
import { toast } from 'react-toastify';
import Loading from '../components/loading';
import styles from "../styles/auth.module.scss";
import Image from 'next/image';
import bg from "../public/bg2.jpg"

const Register = () => {
    const state = {
        email: '',
        password: '',
    }

    const auth = getAuth(app);
    const [user, setUser] = useState(state)
    const { email, password } = user
    const [loading, setLoading] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            toast.success("You are successfully logged in.")
            Router.push("/")
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
        // const res = await postData('auth/login', user)  
    }

    return (
        <div className={styles.container}>
            {
                loading && <Loading />
            }
            <div className={styles.cont_bg}>
                <Image className={styles.backgorund} src={bg} alt="background"/>
            </div>
            <form onSubmit={handleSubmit} method="POST" className={styles.form}>
                <h1 className={styles.title}>Login</h1>
                <div className={styles.main}>
                    <label htmlFor="email" className={styles.label}>Email address</label>
                    <input className={styles.input} type="email" id="email" placeholder="Email address" aria-describedby="emailHelp" name="email" value={email} onChange={handleInputChange} autoFocus />
                </div>
                <div className={styles.main}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input className={styles.input} type="password" id="password" placeholder="password" name="password" value={password} onChange={handleInputChange} />
                </div>
                <div className={styles.cont_button}>
                    <button type="submit" className={styles.button}>Login</button>
                </div>
                <p className={styles.login}>Don't have an account? <Link href="/register"><a className={styles.link}>Register</a></Link></p>
            </form>
        </div>
    )
}

export default Register