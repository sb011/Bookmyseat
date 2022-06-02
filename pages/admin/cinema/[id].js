import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../../utils/firebaseConfig';
import Link from 'next/link';
import DeteleCinema from './../../../components/deleteCinema';

const Cinema = (props) => {
    const [cinema, setCinema] = useState({});
    const [removeCinema, setRemoveCinema] = useState(false)

    useEffect(async () => {
        try {
            const res = await getDoc(doc(db, 'cinemas', `${props.id}`))
            setCinema(res.data())
        } catch (error) {
            
        }
        // console.log(cinema, res.exists())
    }, [])

    return (
        <div>
            <div>
                <label htmlFor="name">name</label>
                <h1 id="name" name="name">{cinema.name}</h1>
            </div>
            <div>
                <label htmlFor="address">address</label>
                <h1 id="address" name="address">{cinema.address}</h1>
            </div>
            <div>
                <label htmlFor="location">location</label>
                <h1 id="location" name="location">{cinema.location}</h1>
            </div>
            <div>
                <label htmlFor="rating">rating</label>
                <h1 id="rating" name="rating">{cinema.rating}</h1>
            </div>
            <div>
                <label htmlFor="seatrow">seatrow</label>
                <h1 id="seatrow" name="seatrow">{cinema.seatrow}</h1>
            </div>
            <div>
                <label htmlFor="seatcol">seatcol</label>
                <h1 id="seatcol" name="seatcol">{cinema.seatcol}</h1>
            </div>
            <Link href={`/admin/cinema/updatecinema/${props.id}`}><a>Update</a></Link>
            <button onClick={() => setRemoveCinema(true)}>Delete Movie</button>
            {
                removeCinema &&
                <DeteleCinema setRemoveCinema={setRemoveCinema} id={props.id} />
            }
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Cinema