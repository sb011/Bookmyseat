import { useEffect, useState } from "react";
import { getDoc, setDoc, doc } from "firebase/firestore/lite";
import { db } from '../../../../utils/firebaseConfig'
import { toast } from "react-toastify";
import Loading from "../../../../components/loading";
import Router from 'next/router';

const UpdateCinema = (props) => {
    const [cinema, setCinema] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDoc(doc(db, 'cinemas', `${props.id}`))
            setCinema(res.data())
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, []);

    const handleInputChange = e => {
        const { name, value } = e.target
        setCinema({...cinema, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await setDoc(doc(db, 'cinemas', `${props.id}`), cinema)
            setLoading(false)
            toast.success("The cinema has been updated successfully.")
            Router.push(`/admin/cinema/${props.id}`)
        } catch (error) {
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