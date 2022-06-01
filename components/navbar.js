import Link from "next/link"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import { useState, useEffect } from "react";

const Navbar = () => {
    const state = {
        username: '',
        email: '',
        phone: '',
        role: ''
    }
    const auth = getAuth();
    
    const [user, setUser] = useState(state)

    useEffect(() => {
        onAuthStateChanged(auth, async (u) => {
            if(u){
                const us = await getDoc(doc(db, 'users', `${u.uid}`))
                const data = us.data()
                setUser({...state, username: data.username, email: data.email, phone: data.phone, role: data.role})
            }
        })
    }, [])

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            
        }
    }
    return(
        <>
            {
                auth.currentUser &&
                <>
                    {
                        user.role == "admin" && 
                        <ul>
                            <li><Link href="/admin"><a>Movies</a></Link></li>
                            <li><Link href="/admin/cinema"><a>Cinemas</a></Link></li>
                            <li><Link href="/admin/showtime"><a>ShowTime</a></Link></li>
                        </ul>
                    }
                    <ul>
                        {
                            user.role == "admin" && <li><Link href="/admin"><a>Admin</a></Link></li>
                        }
                        <li><Link href="/"><a>Home</a></Link></li>
                        <li><Link href="/profile"><a>Profile</a></Link></li>
                        <li><button onClick={handleLogout}>logout</button></li>
                    </ul>
                </>
            }
        </>
    )
}

export default Navbar;