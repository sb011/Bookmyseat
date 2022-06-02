import { useEffect, useState } from "react";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore/lite";
import { db } from "../../../utils/firebaseConfig";

const AddShow = () => {
    const state = {
        startAt: Timestamp,
        startDate: Date,
        endDate: Date,
        movie: '',
        cinema: '',
        seatunoccupied: '',
        totalseat: ''
    }

    const [show, setShow] = useState(state);
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);


    useEffect(async () => {
        try {
            const res = await getDocs(collection(db, "cinemas"))
        
            console.log(res)
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
        } catch (error) {
            
        }
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setShow({...show, [name]: value})
    }

    const handleChangeCategoryCinema = async (e) => {
        const sh = cinemas.find((cinema) => e.target.value == cinema.name);
        const totalseat = sh.seatcol * sh.seatrow;
        setShow({...show, cinema: e.target.value, seatunoccupied: totalseat, totalseat: totalseat})
    }

    const handleChangeCategoryMovie = async (e) => {
        setShow({...show, movie: e.target.value})
    }

    const handleSubmit = async () => {
        try {
            // console.log(show)
            await addDoc(collection(db, "shows"), show);
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="movie">movie</label>
                <select value={show.movie} onChange={handleChangeCategoryMovie} id="movie">
                    <option value=""></option>
                    {
                        movies.map((movie, index) => (
                            <option key={index} value={movie.name}>{movie.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="cinema">cinema</label>
                <select value={show.cinema} onChange={handleChangeCategoryCinema} id="cinema">
                    <option value=""></option>
                    {
                        cinemas.map((cinema, index) => (
                            <option key={index} value={cinema.name}>{cinema.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="startAt">startAt</label>
                <input type="time" id="startAt" placeholder="startAt" name="startAt" value={show.startAt} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="startDate">startDate</label>
                <input type="date" id="startDate" placeholder="startDate" name="startDate" value={show.startDate} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="endDate">endDate</label>
                <input type="date" id="endDate" placeholder="endDate" name="endDate" value={show.endDate} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddShow;