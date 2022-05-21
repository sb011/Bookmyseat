import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../utils/firebaseConfig';

const ProfileInfo = ({ setOnSetting }) => {
    const state = {
        username: '',
        email: '',
        phone: '',
    }
    const auth = getAuth()
    const [user, setUser] = useState(state)

    useEffect(() => {
        onAuthStateChanged(auth, async (u) => {
            if(u){
                const us = await getDoc(doc(db, 'users', `${u.uid}`))
                const data = us.data()
                setUser({...state, username: data.username, email: data.email, phone: data.phone})
            }
        })
    }, [])

    return (
        <div>
            <button onClick={() => setOnSetting(true)}>X</button>
            <div>
                <label htmlFor="username">Username</label>
                <h2>{user.username?user.username:"NULL"}</h2>
            </div>
            <div>
                <label htmlFor="email">email</label>
                <h2>{user.email?user.email:"NULL"}</h2>
            </div>
            <div>
                <label htmlFor="phone">phone</label>
                <h2>{user.phone?user.phone:"NULL"}</h2>
            </div>
        </div>
    )
}

export default ProfileInfo;