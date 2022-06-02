import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import Link from 'next/link'
import { toast } from "react-toastify";

const Cinemas = () => {
    const [cinemas, setCinemas] = useState([]);

    useEffect(async () => {
        try {
            const res = await getDocs(collection(db, "cinemas"))
        
            console.log(res)
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setCinemas(d)
            console.log(d)
        } catch (error) {
            return toast.error(error.message)
        }
    }, [])

    return (
        <div>
            <Link href="/admin/cinema/addcinema"><a>Add Cinema</a></Link>
            {
                cinemas.length === 0
                ? <h1>No Cinema</h1>
                : cinemas.map((cinema, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor="name">name</label>
                            <h1 id="name" name="name"><Link href={`/admin/cinema/${cinema.uid}`}><a>{cinema.name}</a></Link></h1>
                        </div>
                        <div>
                            <label htmlFor="address">address</label>
                            <h1 id="address" name="address">{cinema.address}</h1>
                        </div>
                        <div>
                            <label htmlFor="location">location</label>
                            <h1 id="location" name="location">{cinema.location}</h1>
                        </div>
                        <div>
                            <label htmlFor="rating">rating</label>
                            <h1 id="rating" name="rating">{cinema.rating}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Cinemas