import { useState } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";

const AddCinema = () => {
    const state = {
        name: '',
        address: '',
        location: '',
        rating: '',
    }

    const [cinema, setCinema] = useState(state);

    const handleInputChange = e => {
        const { name, value } = e.target
        setCinema({...cinema, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, "cinemas"), cinema);
        } catch (error) {
            
        }
    }

    return (
        <div>
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
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddCinema;