import { getDocs, collection, query, where } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { db } from "../../utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import Loading from './../../components/loading';
import styles from "../../styles/tickets.module.scss"

const ShowTickets = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(false)
    const auth = getAuth()

    useEffect(() => {
        try {
            setLoading(true)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                const q = query(collection(db, "tickets"), where("userId", "==", u.uid))
                const res = await getDocs(q)
                
                let d = []
                res.forEach((data) =>{
                    d.push({...data.data(), uid: data.id})
                })
                setTickets(d)
                }
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    return (
        <div className={styles.container}>
            {loading && <Loading />}
            {
                tickets.length === 0
                ? <h1>No Tickets</h1>
                : <div className={styles.main}>
                    <h1 className={styles.title}>Recent Tickets</h1>
                    <div className={styles.tickets}>
                        {
                        tickets.map((ticket, index) => (
                            <div key={index} className={styles.ticket}>
                                <h1 className={styles.movie} id="movie" name="movie">{ticket.movie}</h1>
                                <div className={styles.place}>
                                    <h1 className={styles.cinema} id="cinema" name="cinema">{ticket.cinema}</h1>
                                    <h1 className={styles.bullet}>•</h1>
                                    <h1 className={styles.location} id="location" name="location">{ticket.location}</h1>
                                </div>
                                <div className={styles.place}>
                                    <h1 className={styles.cinema} id="bookingdate" name="bookingdate">{ticket.bookingdate}</h1>
                                    <h1 className={styles.bullet}>•</h1>
                                    <h1 className={styles.location} id="time" name="time">{ticket.time}</h1>
                                </div>
                                <h1 className={styles.seat_title}>Seats:</h1>
                                <div className={styles.seats}>
                                    {
                                        ticket.seats.map((seat, index) => (
                                            <h5 key={index} className={styles.seat}>{seat.row}-{seat.col}</h5>
                                        ))
                                    }
                                </div>
                                <h1 className={styles.uid}>{ticket.uid}</h1>
                            </div>
                        ))
                        }
                    </div>   
                </div>
            }
            
        </div>
    )
}

export default ShowTickets;