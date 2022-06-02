import { useState } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import { toast } from "react-toastify";
import Loading from "../../../components/loading";

const AddCinema = () => {
    const state = {
        name: '',
        address: '',
        location: '',
        rating: '',
        seatrow: '',
        seatcol: ''
    }

    const [cinema, setCinema] = useState(state);
    const [loading, setLoading] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setCinema({...cinema, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await addDoc(collection(db, "cinemas"), cinema);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    return (
        <div>
            {
                loading && <Loading />
            }
            <div>
                <label htmlFor="name">name</label>
                <input type="text" id="name" placeholder="name" name="name" value={cinema.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="address">address</label>
                <input type="text" id="address" placeholder="address" name="address" value={cinema.address} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="location">location</label>
                <input type="text" id="location" placeholder="location" name="location" value={cinema.location} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="rating">rating</label>
                <input type="text" id="rating" placeholder="rating" name="rating" value={cinema.rating} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="seatrow">seatrow</label>
                <input type="number" id="seatrow" placeholder="seatrow" name="seatrow" value={cinema.seatrow} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="seatcol">seatcol</label>
                <input type="number" id="seatcol" placeholder="seatcol" name="seatcol" value={cinema.seatcol} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddCinema;