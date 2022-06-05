import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import Link from 'next/link'
import { toast } from "react-toastify";
import Loading from "../../../components/loading";
import styles from "../../../styles/shows.module.scss"
import Image from "next/image"
import searchi from "../../../public/search.svg";

import { getDoc, doc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "next/router"

const Cinemas = () => {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("");

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
            const res = await getDocs(collection(db, "cinemas"))
        
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setCinemas(d)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await getDocs(collection(db, "cinemas"))
            
            let d = []
            res.forEach((data) =>{
                if(data.data().name.toLowerCase().includes(search.toLowerCase()))
                    d.push({...data.data(), uid: data.id})
            })
            setCinemas(d)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className={styles.main}>
            {
                loading && <Loading />
            }
            <div className={styles.cont_add}>
                <Link href="/admin/cinema/addcinema"><a className={styles.add}>Add Cinema</a></Link>
                <form className={styles.search_cont} onSubmit={e => {handleSearch(e)}}>
                    <input className={styles.search} name="search" id="search" onChange={e => {setSearch(e.target.value)}} />
                    <button className={styles.btn_search}>
                        <Image src={searchi} alt="search" width={12} height={12} className={styles.search_icon} />
                    </button>
                </form>
            </div>
            <div className={styles.details}>
                {
                    cinemas.length === 0
                    ? <h1>No Cinema</h1>
                    : <div className={styles.table}>
                        <div className={styles.header}>
                            <h1 className={styles.label1}>Name</h1>
                            <h1 className={styles.label1}>address</h1>
                            <h1 className={styles.label1}>location</h1>
                            <h1 className={styles.label1}>rating</h1>
                        </div>
                    {
                    cinemas.map((cinema, index) => (
                        <div key={index} className={styles.show}>
                            <h1 style={{color: "blue"}} className={styles.label} id="name" name="name"><Link href={`/admin/cinema/${cinema.uid}`}><a>{cinema.name}</a></Link></h1>
                            <h1 className={styles.label} id="address" name="address">{cinema.address.length > 20 ? cinema.address.slice(0, 20) + '...': cinema.address }</h1>
                            <h1 className={styles.label} id="location" name="location">{cinema.location}</h1>
                            <h1 className={styles.label} id="rating" name="rating">{cinema.rating}</h1>
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