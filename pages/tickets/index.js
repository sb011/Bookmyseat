import { getDocs, collection, query, where } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { db } from "../../utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ShowTickets = () => {
    const [tickets, setTickets] = useState([])
    const auth = getAuth()
    useEffect(() => {
        try {
            onAuthStateChanged(auth, async (u) => {
                const q = query(collection(db, "tickets"), where("userId", "==", u.uid))
                const res = await getDocs(q)
                
                let d = []
                res.forEach((data) =>{
                    d.push({...data.data(), uid: data.id})
                })
                setTickets(d)
            })
        } catch (error) {
            
        }
    }, [])

    return (
        <div>
            {
                tickets.length === 0
                ? <h1>No Tickets</h1>
                : tickets.map((ticket, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor="movie">movie</label>
                            <h1 id="movie" name="movie">{ticket.movie}</h1>
                        </div>
                        <div>
                            <label htmlFor="cinema">cinema</label>
                            <h1 id="cinema" name="cinema">{ticket.cinema}</h1>
                        </div>
                        <div>
                            <label htmlFor="location">location</label>
                            <h1 id="location" name="location">{ticket.location}</h1>
                        </div>
                        <div>
                            <label htmlFor="bookingdate">bookingdate</label>
                            <h1 id="bookingdate" name="bookingdate">{ticket.bookingdate}</h1>
                        </div>
                        <div>
                            <label htmlFor="time">time</label>
                            <h1 id="time" name="time">{ticket.time}</h1>
                        </div>
                    </div>
                ))
            }
            
        </div>
    )
}

export default ShowTickets;