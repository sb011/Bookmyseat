import { useEffect, useState } from 'react';
import { addDoc, getDocs, getDoc, doc, collection, Timestamp, query, where } from 'firebase/firestore/lite';
import { db } from '../../../utils/firebaseConfig';
import { getAuth } from "firebase/auth";
import Seatting from '../../../components/seatting';
import moment from 'moment';
import Router from 'next/router';
import { toast } from "react-toastify";
import Loading from './../../../components/loading';
import styles from "../../../styles/adding.module.scss"

const BookTicket = (props) => {
    const state = {
        movie: '',
        cinema: '',
        location: '',
        bookingdate: '',
        time: Timestamp,
        seats: [],
        userId: ''
    }

    const auth = getAuth();
    const [cinemas, setCinemas] = useState([]);
    const [shows, setShows] = useState([]);
    const [ticket, setTicket] = useState(state);
    const [booked, setBooked] = useState([]);
    const [row, setRow] = useState();
    const [col, setCol] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDoc(doc(db, 'movies', `${props.id}`))
            setTicket({...ticket, movie: res.data().name, userId: auth.currentUser.uid})
    
            const res_cinema = await getDocs(collection(db, "cinemas"))
            let d = []
            res_cinema.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setCinemas(d)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleChangeCinema = (e) => {
        const cin = cinemas.find((cinema) => e.target.value == cinema.name);
        const loc = cin ? cin.location : ''
        setTicket({...ticket, cinema: e.target.value, location: loc, bookingdate: '', time: ''})
        if(cin){
            setRow(cin.seatrow)
            setCol(cin.seatcol)
        }
    }

    const handleInputDate = async (e) => {
        const { name, value } = e.target
        setTicket({...ticket, [name]: value, time: ''})
        
        try {
            setLoading(true)
            const q = query(collection(db, "shows"), where("cinema", "==", ticket.cinema), where("movie", "==", ticket.movie))
            const res = await getDocs(q);
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })

            if(d.length != 0){
                if(moment(e.target.value).isSameOrAfter(d[0].startDate) && moment(e.target.value).isSameOrBefore(d[0].endDate)){
                    setShows(d)
                }
                else{
                    setShows([])
                    return toast.info("There were no shows available at that Date.")
                }
            }
            else{
                setShows([])
                return toast.info("There were no shows available at that Date.")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    const handleChangeTime = async (e) => {
        setTicket({...ticket, time: e.target.value})
        try {
            setLoading(true)
            const q = query(collection(db, "tickets"), where("cinema", "==", ticket.cinema), where("movie", "==", ticket.movie), where("location", "==", ticket.location))
            const res = await getDocs(q);
            let d = []
            res.forEach((data) =>{
                if(moment(data.data().bookingdate).isSame(ticket.bookingdate) && data.data().time == e.target.value){
                    data.data().seats.map((s) => {
                        d.push(s)
                    })
                }
            })
            setBooked(d)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }
    
    const handleSubmit = async () => {
        try {
            setLoading(true)
            const res = await addDoc(collection(db, "tickets"), ticket)
            setLoading(false)
            toast.success("Congratulations, your movie tickets have been successfully reserved.")
            Router.push(`/tickets/${res.id}`)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    return (
        <div className={styles.contain}>
            <div className={styles.add_form}>
            {
                loading && <Loading />
            }
            <h1 className={styles.book_title}>Book Ticket</h1>
            <div className={styles.add_simple}>
                <div className={styles.add_main}>
                    <label className={styles.add_label} htmlFor="cinema">cinema</label>
                    <select className={styles.add_input} value={ticket.cinema} onChange={handleChangeCinema} id="cinema">
                        <option value=""></option>
                        {
                            cinemas.map((cinema, index) => (
                                <option key={index} value={cinema.name}>{cinema.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.add_main}>
                    <label className={styles.add_label} htmlFor="bookingdate">bookingdate</label>
                    <input className={styles.add_input} type="date" id="bookingdate" placeholder="bookingdate" name="bookingdate" value={ticket.bookingdate} onChange={handleInputDate} />
                </div>
                {
                    ticket.bookingdate && ticket.cinema &&
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="time">time</label>
                        <select className={styles.add_input} value={ticket.time} onChange={handleChangeTime} id="time">
                            <option value=""></option>
                            {
                                shows.map((show, index) => (
                                    <option key={index} value={show.startAt}>{show.startAt}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                </div>
                <div>
                {
                    ticket.bookingdate && ticket.cinema && ticket.time && <Seatting ticket={ticket} setTicket={setTicket} row={row} col={col} booked={booked} />
                }
                </div>
                <div className={styles.add_cont_button}>
                    <button className={styles.add_button} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default BookTicket;




// try {
//     const q = query(collection(db, "shows"), where("cinema", "==", ticket.cinema), where("movie", "==", ticket.movie))
//     const res = await getDocs(q);
//     let d = []
//     res.forEach((data) =>{
//         d.push({...data.data(), uid: data.id})
//     })

//     console.log(ticket)
//     const date = new Date(ticket.date)
//     // const start = new Date(d[0].startDate)
//     // const end = new Date(d[0].endDate)
//     console.log(date)
//     // if(date < end && date > start){
//         setShows(d)
//     // }
//     console.log(shows.length)
// } catch (error) {
    
// }