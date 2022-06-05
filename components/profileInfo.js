import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../utils/firebaseConfig';
import { toast } from "react-toastify";
import Loading from './loading';
import styles from "../styles/profile.module.scss"
import Image from "next/image"
import bg from "../public/profilebg.jpg"

const ProfileInfo = ({ setOnSetting }) => {
    const state = {
        username: '',
        email: '',
        phone: '',
        role: ''
    }
    const auth = getAuth()
    const [user, setUser] = useState(state)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
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
            <div className={styles.prof_simple}>
                <h1 className={styles.title}>Profile</h1>
                <div className={styles.prof_main}>
                    <label className={styles.prof_label} htmlFor="username">Username</label>
                    <h2 id="username" className={styles.value}>{user.username?user.username:"NULL"}</h2>
                </div>
                <div className={styles.prof_main}>
                    <label htmlFor="email" className={styles.prof_label}>email</label>
                    <h2 id="email" className={styles.value}>{user.email?user.email:"NULL"}</h2>
                </div>
                <div className={styles.prof_main}>
                    <label htmlFor="phone" className={styles.prof_label}>phone</label>
                    <h2 id="phone" className={styles.value}>{user.phone?user.phone:"NULL"}</h2>
                </div>
                <button className={styles.prof_button} onClick={() => setOnSetting(true)}>Edit Profile</button>
            </div>
        </div>
    )
}

export default ProfileInfo;