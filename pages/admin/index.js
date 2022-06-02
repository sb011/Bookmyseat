import { useEffect, useState } from "react"
import { getDocs, collection, doc } from 'firebase/firestore/lite';
import { db } from "../../utils/firebaseConfig";
import Link from 'next/link';
import { toast } from "react-toastify";
import Loading from "../../components/loading";

const ShowMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
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

    return(
        <div>
            {
                loading && <Loading />
            }
            <div>
                <Link href="/admin/addmovies"><a>Add Movie</a></Link>
            </div>
            {
                movies.length === 0
                ? <h1>No Movies</h1>
                : movies.map((movie, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor="name">name</label>
                            <h1 id="name" name="name"><Link href={`/admin/${movie.uid}`}><a>{movie.name}</a></Link></h1>
                        </div>
                        <div>
                            <label htmlFor="poster">poster</label>
                            <img src={movie.poster[0]} alt="poster" style={{width: "100px"}}/>
                        </div>
                        <div>
                            <label htmlFor="release">release</label>
                            <h1 id="release" name="release">{movie.release}</h1>
                        </div>
                        <div>
                            <label htmlFor="tag">tag</label>
                            <ul>
                                { 
                                    movie.tag.map((tag, index) => (
                                        <li key={index}>
                                            <span>{tag}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div> 
                    </div>                  
                ))
            }
        </div>
    )
}

export default ShowMovies;