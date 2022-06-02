import { useEffect, useState } from "react"
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import Router from 'next/router';
import Link from "next/link"

const Cinemas = () => {
    const [shows, setShows] = useState([]);

    useEffect(async () => {
        try {
            const res = await getDocs(collection(db, "shows"))
        
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setShows(d)
        } catch (error) {
            
        }
    }, [])

    const handleDelete = async (uid) => {
        try {
            console.log(uid)
            await deleteDoc(doc(db, "shows", uid));
            Router.push("/admin/showtime")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <Link href="/admin/showtime/addshow"><a>AddShow</a></Link>
            {
                shows.length === 0
                ? <h1>No Shows</h1>
                : shows.map((show, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor="movie">movie</label>
                            <h1 id="movie" name="movie">{show.movie}</h1>
                        </div>
                        <div>
                            <label htmlFor="cinema">cinema</label>
                            <h1 id="cinema" name="cinema">{show.cinema}</h1>
                        </div>
                        <div>
                            <label htmlFor="seatunoccupied">seatunoccupied</label>
                            <h1 id="seatunoccupied" name="seatunoccupied">{show.seatunoccupied}</h1>
                        </div>
                        <div>
                            <label htmlFor="totalseat">totalseat</label>
                            <h1 id="totalseat" name="totalseat">{show.totalseat}</h1>
                        </div>
                        <div>
                            <label htmlFor="startAt">startAt</label>
                            <h1 id="startAt" name="startAt">{show.startAt}</h1>
                        </div>
                        <div>
                            <label htmlFor="startDate">startDate</label>
                            <h1 id="startDate" name="startDate">{show.startDate}</h1>
                        </div>
                        <div>
                            <label htmlFor="endDate">endDate</label>
                            <h1 id="endDate" name="endDate">{show.endDate}</h1>
                        </div>
                        <div>
                            <label htmlFor="endDate">endDate</label>
                            <h1 id="endDate" name="endDate">{show.endDate}</h1>
                        </div>
                        <button onClick={() => handleDelete(show.uid)}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Cinemas