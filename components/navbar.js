import Link from "next/link"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "./loading";
import styles from "../styles/navbar.module.scss"
import logo from "../public/logo.jpeg"
import Image from "next/image";

const Navbar = () => {
    const state = {
        username: '',
        email: '',
        phone: '',
        role: ''
    }
    const auth = getAuth();
    
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

    const handleLogout = async () => {
        try {
            setLoading(true)
            await signOut(auth);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }
    return(
        <div className={styles.container}>
            {
                loading && <Loading />
            }
            {
                auth.currentUser &&
                <>
                    {
                        user.role == "admin" && 
                        <ul className={styles.adminul}>
                            <li className={styles.adminli}><Link href="/admin"><a>Movies</a></Link></li>
                            <li className={styles.adminli}><Link href="/admin/cinema"><a>Cinemas</a></Link></li>
                            <li className={styles.adminli}><Link href="/admin/showtime"><a>ShowTime</a></Link></li>
                        </ul>
                    }
                    <ul className={styles.ul}>
                        <Link href="/"><a>
                        <div className={styles.cont_logo}>
                            <Image src={logo} alt="logo" className={styles.logo} />
                        </div>
                        </a></Link>
                        <div className={styles.item}>
                        <li className={styles.li}><Link href="/"><a>Home</a></Link></li>
                        <li className={styles.li}><Link href="/tickets"><a>Tickets</a></Link></li>
                        <li className={styles.li}><Link href="/profile"><a>Profile</a></Link></li>
                        <li className={styles.li}><a onClick={handleLogout}>logout</a></li>
                        </div>
                    </ul>
                </>
            }
        </div>
    )
}

export default Navbar;