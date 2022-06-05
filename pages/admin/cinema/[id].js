import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../../utils/firebaseConfig';
import Link from 'next/link';
import DeteleCinema from './../../../components/deleteCinema';
import { toast } from "react-toastify";
import Loading from '../../../components/loading';
import styles from "../../../styles/adding.module.scss";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "next/router"

const Cinema = (props) => {
    const [cinema, setCinema] = useState({});
    const [removeCinema, setRemoveCinema] = useState(false)
    const [loading, setLoading] = useState(false)

    const auth = getAuth()

    useEffect(() => {
        try {
            onAuthStateChanged(auth, async (u) => {
                if(u){
                const us = await getDoc(doc(db, 'users', `${u.uid}`))
                const data = us.data()
                const last = Router.pathname.split("/")
                if(data.role == "user" && last[1] == "admin")
                    Router.push("/");
                }
            })
        } catch (error) {
            return toast.error(error.message)
        }
    }, [])

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
    }, [])

    return (
        <div className={styles.contain}>
            <div className={styles.add_form}>
                {
                    loading && <Loading />
                }
                <div className={styles.add_simple}>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="name">name</label>
                        <h1 className={styles.add_label} id="name" name="name">{cinema.name}</h1>
                    </div>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="address">address</label>
                        <h1 className={styles.add_label} id="address" name="address" style={{overflowWrap: "break-word"}}>{cinema.address}</h1> 
                    </div>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="location">location</label>
                        <h1 className={styles.add_label} id="location" name="location">{cinema.location}</h1>
                    </div>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="rating">rating</label>
                        <h1 className={styles.add_label} id="rating" name="rating">{cinema.rating}</h1>
                    </div>
                </div>
                <div className={styles.add_simple}>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="seatrow">seatrow</label>
                        <h1 className={styles.add_label} id="seatrow" name="seatrow">{cinema.seatrow}</h1>
                    </div>
                    <div className={styles.add_main}>
                        <label className={styles.add_label} htmlFor="seatcol">seatcol</label>
                        <h1 className={styles.add_label} id="seatcol" name="seatcol">{cinema.seatcol}</h1>
                    </div>
                </div>
                <div className={styles.add_cont_button}>
                    <Link href={`/admin/cinema/updatecinema/${props.id}`}><a className={styles.add_button}>Update</a></Link>
                    <button className={styles.add_button1} onClick={() => setRemoveCinema(!removeCinema)}>Delete</button>
                    {
                        removeCinema &&
                        <DeteleCinema setRemoveCinema={setRemoveCinema} id={props.id} />
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Cinema