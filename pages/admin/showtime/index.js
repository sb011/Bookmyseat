import { useEffect, useState } from "react"
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import Router from 'next/router';
import Link from "next/link"
import { toast } from "react-toastify";
import Loading from "../../../components/loading";
import styles from "../../../styles/shows.module.scss"

import { getDoc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Cinemas = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false)

    const auth = getAuth()

    useEffect(() => {
        try {
            onAuthStateChanged(auth, async (u) => {
                if(u){
                const us = await getDoc(doc(db, 'users', `${u.uid}`))
                const data = us.data()
                const last = Router.pathname.split("/")
                if(data.role == "user" && last[1] == "admin")
                    Router.push("/");
                }
            })
        } catch (error) {
            return toast.error(error.message)
        }
    }, [])

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDocs(collection(db, "shows"))
        
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setShows(d)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleDelete = async (uid) => {
        try {
            setLoading(true)
            await deleteDoc(doc(db, "shows", uid));
            setLoading(false)
            toast.success("The show has been successfully removed.")
            Router.reload()
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    return (
        <div className={styles.main}>
            {
                loading && <Loading />
            }
            <Link href="/admin/showtime/addshow"><a className={styles.btn}>AddShow</a></Link>
            <div className={styles.details}>
            {
                shows.length === 0
                ? <h1>No Shows</h1>
                : <div className={styles.table}>
                    <div className={styles.header}>
                        <h1 className={styles.label1}>movie</h1>
                        <h1 className={styles.label1}>cinema</h1>
                        <h1 className={styles.label1}>totalseat</h1>
                        <h1 className={styles.label1}>startAt</h1>
                        <h1 className={styles.label1}>startDate</h1>
                        <h1 className={styles.label1}>endDate</h1>
                        <h1 className={styles.label1}>endDate</h1>
                        <h1 className={styles.label1}>Update</h1>
                        <h1 className={styles.label1}>Delete</h1>
                    </div>
                    {
                        shows.map((show, index) => (
                            <div key={index} className={styles.show}>
                                <h1 className={styles.label} id="movie" name="movie">{show.movie}</h1>
                                <h1 className={styles.label} id="cinema" name="cinema">{show.cinema}</h1>
                                <h1 className={styles.label} id="totalseat" name="totalseat">{show.totalseat}</h1>
                                <h1 className={styles.label} id="startAt" name="startAt">{show.startAt}</h1>
                                <h1 className={styles.label} id="startDate" name="startDate">{show.startDate}</h1>
                                <h1 className={styles.label} id="endDate" name="endDate">{show.endDate}</h1>
                                <h1 className={styles.label} id="endDate" name="endDate">{show.endDate}</h1>
                                <div className={styles.label}>
                                    <Link href={`/admin/showtime/updateshow/${show.uid}`}><a className={styles.link}>Update</a></Link>
                                </div>
                                <div className={styles.label}>
                                    <button className={styles.button} onClick={() => handleDelete(show.uid)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            </div>
        </div>
    )
}

export default Cinemas