import React, { useState, useEffect } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { updateEmail } from 'firebase/auth';
import { toast } from "react-toastify";
import Loading from './loading';

const ProfileEdit = ({setOnSetting}) => {
    const state = {
        username: '',
        email: '',
        phone: ''
    }
    const [user, setUser] = useState(state)
    const [password, setPassword] = useState();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false)

    const auth = getAuth();
    useEffect(async () => {
        try {
            setLoading(true)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                    const us = await getDoc(doc(db, 'users', `${u.uid}`))
                    const data = us.data()
                    setUser({...state, username: data.username, email: data.email, phone: data.phone})
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
        <div>
            {
                loading && <Loading />
            }
            <button onClick={() => setOnSetting(false)}>X</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" name="username" value={user.username} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={user.email} onChange={handleInputChange} />
                    <small id="emailHelp">We'll never share your email with anyone else.</small>
                </div>
                <div>
                    <label htmlFor="phone">Phone No.</label>
                    <input type="number" id="phone" placeholder="Phone no." name="phone" value={user.phone} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <p>{err}</p>
                <button>Update</button>
            </form>
        </div>
    )
}

export default ProfileEdit;