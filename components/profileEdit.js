import React, { useState, useEffect } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateEmail } from 'firebase/auth';
import { toast } from "react-toastify";
import Loading from './loading';
import styles from "../styles/profile.module.scss"
import Image from "next/image"
import bg from "../public/profilebg.jpg"

const ProfileEdit = ({setOnSetting}) => {
    const state = {
        username: '',
        email: '',
        phone: '',
        role: ''
    }
    const [user, setUser] = useState(state)
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    useEffect(async () => {
        try {
            setLoading(true)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                    const us = await getDoc(doc(db, 'users', `${u.uid}`))
                    const data = us.data()
                    setUser({...state, username: data.username, email: data.email, phone: data.phone, role: data.role})
                }
            })   
            setLoading(false) 
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            setLoading(true)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                    await setDoc(doc(db, "users", `${u.uid}`), user)
                    // updateEmail(u, email)
                    // auth.currentUser.reload()
                    const credential = EmailAuthProvider.credential(
                        u.email,
                        password
                    );
                    reauthenticateWithCredential(u, credential).then(async () => {
                        await updateEmail(u, user.email)
                    })
                }
            })
            setLoading(false)
            toast.success("The profile has been updated successfully.")
        }
        catch(error){
            setLoading(false)
            return toast.error(error.message)
        }
    }

    return (
        <div className={styles.prof_container}>
            {
                loading && <Loading />
            }
            {
            user.role === "admin"
            ?<div className={styles.cont_bg} style={{top: "16%"}}>
                <Image className={styles.backgorund}  src={bg} alt="background"/>
            </div>
            :<div className={styles.cont_bg}>
                <Image className={styles.backgorund}  src={bg} alt="background"/>
            </div>
            }
            <form onSubmit={handleSubmit} className={styles.prof_simple1}>
                <h1 className={styles.title}>Edit Profile</h1>
                <div className={styles.prof_main}>
                    <label className={styles.prof_label} htmlFor="username">Username</label>
                    <input className={styles.input} type="text" id="username" placeholder="Username" name="username" value={user.username} onChange={handleInputChange} autoFocus />
                </div>
                <div className={styles.prof_main}>
                    <label className={styles.prof_label} htmlFor="email">Email address</label>
                    <input className={styles.input} type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange} />
                </div>
                <div className={styles.prof_main}>
                    <label className={styles.prof_label} htmlFor="phone">Phone No.</label>
                    <input className={styles.input} type="number" id="phone" placeholder="Phone no." name="phone" value={user.phone} onChange={handleInputChange} />
                </div>
                <div className={styles.prof_main}>
                    <label className={styles.prof_label} htmlFor="password">Password</label>
                    <input className={styles.input} type="password" id="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <small className={styles.small}>For security purpose</small>
                </div>
                <div className={styles.update_btn}>
                    <button className={styles.prof_button}>Update</button>
                    <button className={styles.prof_button} onClick={() => setOnSetting(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit;