import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";
import { toast } from "react-toastify";
import Loading from "../../../components/loading";
import Router from 'next/router';
import styles from "../../../styles/adding.module.scss";

import { getDoc, doc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

    const handleInputChange = e => {
        const { name, value } = e.target
        setCinema({...cinema, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await addDoc(collection(db, "cinemas"), cinema);
            setLoading(false)
            toast.success("The cinema has been added successfully.")
            Router.push("/admin/cinema")
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
            <div className={styles.add_simple}>
                <div className={styles.add_main}>
                    <label htmlFor="name" className={styles.add_label}>name</label>
                    <input className={styles.add_input} type="text" id="name" placeholder="name" name="name" value={cinema.name} onChange={handleInputChange} />
                </div>
                <div className={styles.add_main}>
                    <label htmlFor="address" className={styles.add_label}>address</label>
                    <input className={styles.add_input} type="text" id="address" placeholder="address" name="address" value={cinema.address} onChange={handleInputChange} />
                </div>
                <div className={styles.add_main}>
                    <label htmlFor="location" className={styles.add_label}>location</label>
                    <input className={styles.add_input} type="text" id="location" placeholder="location" name="location" value={cinema.location} onChange={handleInputChange} />
                </div>
                <div className={styles.add_main}>
                    <label htmlFor="rating" className={styles.add_label}>rating</label>
                    <input className={styles.add_input} type="text" id="rating" placeholder="rating" name="rating" value={cinema.rating} onChange={handleInputChange} />
                </div>
            </div>
            <div className={styles.add_simple}>
                <div className={styles.add_main}>
                    <label htmlFor="seatrow" className={styles.add_label}>seatrow</label>
                    <input className={styles.add_input} type="number" id="seatrow" placeholder="seatrow" name="seatrow" value={cinema.seatrow} onChange={handleInputChange} />
                </div>
                <div className={styles.add_main}>
                    <label htmlFor="seatcol" className={styles.add_label}>seatcol</label>
                    <input className={styles.add_input} type="number" id="seatcol" placeholder="seatcol" name="seatcol" value={cinema.seatcol} onChange={handleInputChange} />
                </div>
            </div>
            <div className={styles.add_cont_button}>
                <button className={styles.add_button} onClick={handleSubmit}>Submit</button>
            </div>
            </div>
        </div>
    )
}

export default AddCinema;