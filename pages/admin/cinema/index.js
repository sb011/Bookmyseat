import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import Link from 'next/link'
import { toast } from "react-toastify";
import Loading from "../../../components/loading";
import styles from "../../../styles/shows.module.scss"

const Cinemas = () => {
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(false)

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

    return (
        <div className={styles.main}>
            {
                loading && <Loading />
            }
            <Link href="/admin/cinema/addcinema"><a className={styles.btn}>Add Cinema</a></Link>
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