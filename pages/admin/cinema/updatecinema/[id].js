import { useEffect, useState } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore/lite";
import { db } from '../../../../utils/firebaseConfig'

const UpdateCinema = (props) => {
    const [cinema, setCinema] = useState({});

    useEffect(async () => {
        try {
            const res = await getDoc(doc(db, 'cinemas', `${props.id}`))
            setCinema(res.data())
        } catch (error) {
            console.log(error.message)
        }
    }, []);

    const handleInputChange = e => {
        const { name, value } = e.target
        setCinema({...cinema, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            await setDoc(doc(db, 'cinemas', `${props.id}`), cinema)
        } catch (error) {
            setErr(error.message)
            console.log(error.message)
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
            <div>
                <label htmlFor="seatrow">seatrow</label>
                <input type="text" id="seatrow" placeholder="seatrow" name="seatrow" value={cinema.seatrow} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="seatcol">seatcol</label>
                <input type="text" id="seatcol" placeholder="seatcol" name="seatcol" value={cinema.seatcol} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default UpdateCinema;