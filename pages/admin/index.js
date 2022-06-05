import { useEffect, useState } from "react"
import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from "../../utils/firebaseConfig";
import Link from 'next/link';
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import styles from '../../styles/home.module.scss';
import Image from "next/image"
import searchi from "../../public/search.svg";

import { getDoc, doc } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "next/router"

const ShowMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const auth = getAuth();

    useEffect(async () => {
        try {
            setLoading(true)
            onAuthStateChanged(auth, async (u) => {
                if(u){
                const us = await getDoc(doc(db, 'users', `${u.uid}`))
                const data = us.data()
                const last = Router.pathname.split("/")
                if(data.role == "user" && last[1] == "admin")
                    Router.push("/");
                }
            })
            const res = await getDocs(collection(db, "movies"))
            
            let d = []
            res.forEach((data) =>{
                d.push({...data.data(), uid: data.id})
            })
            setMovies(d)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await getDocs(collection(db, "movies"))
            
            let d = []
            res.forEach((data) =>{
                if(data.data().name.toLowerCase().includes(search.toLowerCase()))
                    d.push({...data.data(), uid: data.id})
            })
            setMovies(d)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return(
        <div className={styles.conatiner}>
            {
                loading && <Loading />
            }
            <div className={styles.cont_add}>
                <Link href="/admin/addmovies"><a className={styles.add}>Add Movie</a></Link>
                <form className={styles.search_cont} onSubmit={e => {handleSearch(e)}}>
                    <input className={styles.search} name="search" id="search" onChange={e => {setSearch(e.target.value)}} />
                    <button className={styles.btn_search}>
                        <Image src={searchi} alt="search" width={12} height={12} className={styles.search_icon} />
                    </button>
                </form>
            </div>
            {
                movies.length === 0
                ? <h1>No Movies</h1>
                : <div className={styles.movies}> 
                    {
                    movies.map((movie, index) => (
                        <div key={index} className={styles.movie}>
                            <Link href={`admin/${movie.uid}`}><a>
                            <div className={styles.poster}>
                                    <img src={movie.poster[0]} alt="poster" className={styles.pos}/>
                                </div>
                                <div className={styles.details}>
                                    <h1 id="name" name="name" className={styles.item}>{movie.name}</h1>
                                    <h1 id="rating" name="rating" className={styles.item2}>❤️ {movie.rating}/10</h1>
                                    <ul className={styles.ul}>
                                        { 
                                            movie.tag.map((tag, index) => (
                                                <li key={index} className={styles.li}>
                                                    <span>{tag}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                </a></Link>
                        </div>                  
                    ))
                }
                </div>
            }
        </div>
    )
}

export default ShowMovies;