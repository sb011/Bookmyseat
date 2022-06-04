import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import styles from "../../styles/tickets.module.scss"

const Ticket = (props) => { 
    const [ticket, setTicket] = useState({})
    const [seats, setSeats] = useState([])
    const [user, setUser] = useState()
    const auth = getAuth()
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDoc(doc(db, 'tickets', `${props.id}`))
            setTicket(res.data())
            setSeats(res.data().seats)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                    const us = await getDoc(doc(db, 'users', `${u.uid}`))
                    const data = us.data()
                    setUser(data.username)
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
            { loading && <Loading/> }
                <div className={styles.single_ticket}>
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
                            seats.map((seat, index) => (
                                <h5 className={styles.seat} key={index}>{seat.row} - {seat.col}</h5>
                            ))
                        }
                    </div>
                    <h1 className={styles.uid} id="user" name="user">{user}</h1>
                </div>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Ticket