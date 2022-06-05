import { useEffect, useState } from "react";
import { addDoc, setDoc, doc, collection, Timestamp, getDocs, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../utils/firebaseConfig";
import { toast } from "react-toastify";
import Loading from "../../../../components/loading";
import Router from 'next/router';
import styles from "../../../../styles/adding.module.scss"

import { getAuth, onAuthStateChanged } from "firebase/auth";

const UpdateShow = (props) => {
    const state = {
        startAt: Timestamp,
        startDate: Date,
        endDate: Date,
        movie: '',
        cinema: '',
        totalseat: ''
    }

    const [show, setShow] = useState(state);
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
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
            const res_show = await getDoc(doc(db, "shows", `${props.id}`))
            setShow(res_show.data())
            const res = await getDocs(collection(db, "cinemas"))
        
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setCinemas(d)

            const res_movies = await getDocs(collection(db, "movies"))
        
            let d_movie = []
            res_movies.forEach((data) =>{
                d_movie.push({...data.data(), uid: data.id})
            })
            setMovies(d_movie)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setShow({...show, [name]: value})
    }

    const handleChangeCategoryCinema = async (e) => {
        const sh = cinemas.find((cinema) => e.target.value == cinema.name);
        const totalseat = sh.seatcol * sh.seatrow;
        setShow({...show, cinema: e.target.value, totalseat: totalseat})
    }

    const handleChangeCategoryMovie = async (e) => {
        setShow({...show, movie: e.target.value})
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            console.log(show)
            await setDoc(doc(db, "shows", `${props.id}`), show);
            setLoading(false)
            toast.success("The show has been successfully updated.")
            Router.push("/admin/showtime")
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
                        <label htmlFor="movie" className={styles.add_label}>movie</label>
                        <select className={styles.add_input} value={show.movie} onChange={handleChangeCategoryMovie} id="movie">
                            <option value=""></option>
                            {
                                movies.map((movie, index) => (
                                    <option key={index} value={movie.name}>{movie.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.add_main}>
                        <label htmlFor="cinema" className={styles.add_label}>cinema</label>
                        <select className={styles.add_input} value={show.cinema} onChange={handleChangeCategoryCinema} id="cinema">
                            <option value=""></option>
                            {
                                cinemas.map((cinema, index) => (
                                    <option key={index} value={cinema.name}>{cinema.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={styles.add_simple}>
                    <div className={styles.add_main}>
                        <label htmlFor="startAt" className={styles.add_label}>startAt</label>
                        <input className={styles.add_input} type="time" id="startAt" placeholder="startAt" name="startAt" value={show.startAt} onChange={handleInputChange} />
                    </div>
                    <div className={styles.add_main}>
                        <label htmlFor="startDate" className={styles.add_label}>startDate</label>
                        <input className={styles.add_input} type="date" id="startDate" placeholder="startDate" name="startDate" value={show.startDate} onChange={handleInputChange} />
                    </div>
                    <div className={styles.add_main}>
                        <label htmlFor="endDate" className={styles.add_label}>endDate</label>
                        <input className={styles.add_input} type="date" id="endDate" placeholder="endDate" name="endDate" value={show.endDate} onChange={handleInputChange} />
                    </div>
                </div>
                <div className={styles.add_cont_button}>
                    <button className={styles.add_button} onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default UpdateShow;