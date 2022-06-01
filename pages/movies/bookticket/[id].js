import { useEffect, useState } from 'react';
import { getDocs, getDoc, doc, collection, Timestamp, query, where } from 'firebase/firestore/lite';
import { db } from '../../../utils/firebaseConfig';
import { getAuth } from "firebase/auth";
import Seatting from '../../../components/seatting';

const BookTicket = (props) => {
    const state = {
        movie: '',
        cinema: '',
        location: '',
        date: Date,
        time: Timestamp,
        userId: ''
    }

    const auth = getAuth();
    const [cinemas, setCinemas] = useState([]);
    const [ticket, setTicket] = useState(state);

    useEffect(async () => {
        const res = await getDoc(doc(db, 'movies', `${props.id}`))
        setTicket({...ticket, movie: res.data().name, userId: auth.currentUser.uid})

        const res_cinema = await getDocs(collection(db, "cinemas"))
        let d = []
        res_cinema.forEach((data) =>{
            d.push({...data.data(), uid: data.id})
        })
        setCinemas(d)
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setTicket({...ticket, [name]: value})
    }

    const handleChangeCategory = async (e) => {
        const cin = cinemas.find((cinema) => e.target.value == cinema.name);
        setTicket({...ticket, cinema: e.target.value, location: cin.location})
    }
    
    const handleSubmit = async () => {
        try {
            console.log(ticket)
            // await addDoc(collection(db, "tickets"), ticket);
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Ticket</h1>
            <div>
                <label htmlFor="date">date</label>
                <input type="date" id="date" placeholder="date" name="date" value={ticket.date} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="time">time</label>
                <input type="time" id="time" placeholder="time" name="time" value={ticket.time} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="cinema">cinema</label>
                <select value={ticket.cinema} onChange={handleChangeCategory} id="cinema">
                    <option value=""></option>
                    {
                        cinemas.map((cinema, index) => (
                            <option key={index} value={cinema.name}>{cinema.name}</option>
                        ))
                    }
                </select>
            </div>
            <Seatting />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default BookTicket;