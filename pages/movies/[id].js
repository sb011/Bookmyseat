import { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import styles from "../../styles/showmovie.module.scss"
import Carousels from '../../components/carousel';

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
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDoc(doc(db, 'movies', `${props.id}`))
            setMovie(res.data())
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    return (
        <div className={styles.container}>
            {
                loading && <Loading />
            }
            <div className={styles.main_cont}>
                <div className={styles.poster_cont}>
                    <img className={styles.poster} src={movie.images[0]} alt="poster" id="poster"/>
                </div>
                <div className={styles.details}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            <h1 id="name">{movie.name}</h1>
                            <h1 id="limit" className={styles.limit}>{movie.limit}+</h1>
                        </div>
                        <div className={styles.desc}>
                            <h1 id="description">{movie.description}</h1>
                        </div>
                        <div className={styles.tag}>
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
                        <div className={styles.main}>
                            <label htmlFor="director" className={styles.label}>director:</label>
                            <ul className={styles.ul}>
                                {
                                    movie.director.map((director, index) => (
                                        <li key={index} className={styles.li}>
                                            <span>{director}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={styles.main}>
                            <label htmlFor="writers" className={styles.label}>writers:</label>
                            <ul className={styles.ul}>
                                {
                                    movie.writers.map((writers, index) => (
                                        <li key={index} className={styles.li}>
                                            <span>{writers}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={styles.rating}>
                            <h1 id="rating">❤️ {movie.rating}/10</h1>
                        </div>
                        <div className={styles.duration}>
                            <h1 id="duration" className={styles.dur}>{movie.duration}</h1>
                        </div>
                        <div className={styles.release}>
                            <label htmlFor="release" className={styles.label}>release</label>
                            <h1 id="release">{movie.release}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Link href={`/movies/bookticket/${props.id}`}><a className={styles.book}>Book Ticket</a></Link>
                </div>
            </div>
            <div className={styles.about}>
                <h2>About Movie:</h2>
                <div className={styles.main}>
                    <label htmlFor="stars" className={styles.label}>stars:</label>
                    <ul className={styles.ul}>
                        {
                            movie.stars.map((stars, index) => (
                                <li key={index} className={styles.li}>
                                    <span>{stars}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.gall_main}>
                    <label htmlFor="trailer" className={styles.gall_label}>trailer</label>
                    <iframe 
                        className={styles.tariler}
                        src={`https://www.youtube.com/embed/${movie.trailer}`}
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title='video'
                    />
                </div>
                <div className={styles.gall_main}>
                    <label htmlFor="image" className={styles.gall_label}>Images</label>
                    <div className={styles.car}>
                        <Carousels images={movie.images}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default Movie