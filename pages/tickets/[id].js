import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';

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
        <div>
            { loading && <Loading/> }
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
            <div>
                <label htmlFor="seat">seat</label>
                {
                    seats.map((seat, index) => (
                        <h5 key={index}>{seat.row} - {seat.col}</h5>
                    ))
                }
            </div>
            <div>
                <label htmlFor="user">user</label>
                <h1 id="user" name="user">{user}</h1>
            </div>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Ticket