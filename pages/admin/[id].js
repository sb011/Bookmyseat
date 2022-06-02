import { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';
import Link from 'next/link';
import DeleteMovie from '../../components/deleteMovie';
import { toast } from "react-toastify";

const Movie = (props) => {
    const state = {
        name: '',
        tag: [],
        description: '',
        director: [],
        writers: [],
        stars: [],
        rating: '',
        poster: [],
        images: [],
        trailer: '',
        duration: '',
        release: Date,
        limit: '',
        active: Boolean
    }
    // const router = useRouter()
    // const { id } = router.query;
    const [movie, setMovie] = useState(state);
    const [removeMovie, setRemoveMovie] = useState(false);

    useEffect(async () => {
        try {
            const res = await getDoc(doc(db, 'movies', `${props.id}`))
            setMovie(res.data())
        } catch (error) {
            return toast.error(error.message)
        }
        // console.log(res.data())
    }, [])

    return (
        <div>
            <div>
                <label htmlFor="name">name</label>
                <h1 id="name">{movie.name}</h1>
            </div>
            <div>
                <label htmlFor="description">description</label>
                <h1 id="description">{movie.description}</h1>
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
            <div>
                <label htmlFor="director">director</label>
                <ul>
                    {
                        movie.director.map((director, index) => (
                            <li key={index}>
                                <span>{director}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <label htmlFor="writers">writers</label>
                <ul>
                    {
                        movie.writers.map((writers, index) => (
                            <li key={index}>
                                <span>{writers}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <label htmlFor="stars">stars</label>
                <ul>
                    {
                        movie.stars.map((stars, index) => (
                            <li key={index}>
                                <span>{stars}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <label htmlFor="rating">rating</label>
                <h1 id="rating">{movie.rating}</h1>
            </div>
            <div>
                <label htmlFor="poster">poster</label>
                <img src={movie.poster[0]} alt="poster" id="poster" style={{width: "100px"}}/>
            </div>
            <div>
                <label htmlFor="image">image</label>
                {
                    movie.images.map((image, index) => (
                        <img src={image} key={index} id="image" alt="images" style={{width: "100px"}}/>
                    ))
                }
            </div>
            <div>
                <label htmlFor="trailer">trailer</label>
                {/* <video src={movie.trailer} autoPlay /> */}
                <iframe 
                    src={`https://www.youtube.com/embed/${movie.trailer}`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                />
            </div>
            <div>
                <label htmlFor="duration">duration</label>
                <h1 id="duration">{movie.duration}</h1>
            </div>
            <div>
                <label htmlFor="release">release</label>
                <h1 id="release">{movie.release}</h1>
            </div>
            <div>
                <label htmlFor="limit">limit</label>
                <h1 id="limit">{movie.limit}</h1>
            </div>
            <div>
                <label htmlFor="active">active</label>
                {
                    movie.active
                    ? <h1 id="active">Movie is active</h1>
                    : <h1 id="active">Movie is not active</h1>
                }
            </div>
            <Link href={`/admin/updatemovie/${props.id}`}><a>Update</a></Link>
            <button onClick={() => setRemoveMovie(true)}>Delete Movie</button>
            {
                removeMovie &&
                <DeleteMovie setRemoveMovie={setRemoveMovie} id={props.id} />
            }
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Movie