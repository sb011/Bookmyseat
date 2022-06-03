import { useEffect, useState } from 'react';
import ImageInput from '../../../components/imageInput';
import { upload } from '../../../components/uploadFiles';
import { getAuth } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../../../utils/firebaseConfig';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import Loading from '../../../components/loading';
import Router from 'next/router';

const UpdateMovies = (props) => {
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

    const router = useRouter()
    const [movie, setMovie] = useState(state)
    const [files, setFiles] = useState([])
    const [poster, setPoster] = useState([])
    const [active, setActive] = useState(movie.active)
    const [err, setErr] = useState('')
    const [isUploaded, setIsUploaded] = useState(false)
    const auth = getAuth()
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            setLoading(true)
            const res = await getDoc(doc(db, 'movies', `${props.id}`))
            setMovie(res.data())
            setFiles(res.data().images);
            setPoster(res.data().poster);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setMovie({...movie, [name]: value})
    }

    const addTag = event => {
        if(event.target.value != ""){
            setMovie({...movie, tag: [...movie.tag, event.target.value] })
            event.target.value = ""
        }
    }

    const removeTag = indexToRemove => {
        const t = movie.tag.filter((_, index) => index != indexToRemove)
        setMovie({...movie, tag: t})
    }

    const addDirector = event => {
        if(event.target.value != ""){
            setMovie({...movie, director: [...movie.director, event.target.value] })
            event.target.value = ""
        }
    }

    const removeDirector = indexToRemove => {
        const dir = movie.director.filter((_, index) => index != indexToRemove)
        setMovie({...movie, director: dir})
    }

    const addWriters = event => {
        if(event.target.value != ""){
            setMovie({...movie, writers: [...movie.writers, event.target.value] })
            event.target.value = ""
        }
    }

    const removeWriters = indexToRemove => {
        const writer = movie.writers.filter((_, index) => index != indexToRemove)
        setMovie({...movie, writers: writer})
    }

    const addStars = event => {
        if(event.target.value != ""){
            setMovie({...movie, stars: [...movie.stars, event.target.value] })
            event.target.value = ""
        }
    }

    const removeStars = indexToRemove => {
        const star = movie.stars.filter((_, index) => index != indexToRemove)
        setMovie({...movie, stars: star})
    }

    const handleChangeActive = () => {
        setActive(!active)
    }

    const handleUpload = async () => {
        try {
            setLoading(true)
            const res_images = await upload(`images/${auth.currentUser.uid}`, (files))
            const res_poster = await upload(`images/${auth.currentUser.uid}`, (poster))
            setMovie({...movie, poster: res_poster, images: res_images, active: active})
            setIsUploaded(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            return toast.error(error.message)
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await setDoc(doc(db, 'movies', `${props.id}`), movie)
            setIsUploaded(false)
            setLoading(false)
            toast.success("The movie has been successfully updated.")
            Router.push(`/admin/${props.id}`)
        } catch (error) {
            setLoading(false)
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
                <input type="text" id="name" placeholder="name" name="name" value={movie.name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="description">description</label>
                <input type="text" id="description" placeholder="description" name="description" value={movie.description} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="tag">tag</label>
                <ul>
                { 
                    movie.tag.map((tag, index) => (
                        <li key={index}>
                            <span>{tag}</span>
                            <h2 onClick={() => removeTag(index)}>X</h2>
                        </li>
                    ))
                }
                </ul>
                <input type="text" id="tag" placeholder="tag" name="tag" onKeyUp={e => (e.key == "Enter" ? addTag(e): null)}/>
                <small >Separate keywords with a comma, space bar, or enter key</small>
            </div>
            <div>
                <label htmlFor="director">director</label>
                <ul>
                    {
                        movie.director.map((director, index) => (
                            <li key={index}>
                                <span>{director}</span>
                                <h2 onClick={() => removeDirector(index)}>X</h2>
                            </li>
                        ))
                    }
                </ul>
                <input type="text" id="director" placeholder="director" name="director" onKeyUp={e => (e.key == "Enter" ? addDirector(e): null)} />
            </div>
            <div>
                <label htmlFor="writers">writers</label>
                <ul>
                    {
                        movie.writers.map((writers, index) => (
                            <li key={index}>
                                <span>{writers}</span>
                                <h2 onClick={() => removeWriters(index)}>X</h2>
                            </li>
                        ))
                    }
                </ul>
                <input type="text" id="writers" placeholder="writers" name="writers" onKeyUp={e => (e.key == "Enter" ? addWriters(e): null)} />
            </div>
            <div>
                <label htmlFor="stars">stars</label>
                <ul>
                    {
                        movie.stars.map((stars, index) => (
                            <li key={index}>
                                <span>{stars}</span>
                                <h2 onClick={() => removeStars(index)}>X</h2>
                            </li>
                        ))
                    }
                </ul>
                <input type="text" id="stars" placeholder="stars" name="stars" onKeyUp={e => (e.key == "Enter" ? addStars(e): null)}/>
            </div>
            <div>
                <label htmlFor="rating">rating</label>
                <input type="text" id="rating" placeholder="rating" name="rating" value={movie.rating} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="poster">poster</label>
                <ImageInput multiple files={poster} setFiles={setPoster} />
            </div>
            <div>
                <label htmlFor="image">image</label>
                <ImageInput multiple files={files} setFiles={setFiles} />
            </div>
            <div>
                <label htmlFor="trailer">trailer</label>
                <input type="text" id="trailer" placeholder="trailer" name="trailer" value={movie.trailer} onChange={handleInputChange} />
                <small>Add only code</small>
            </div>
            <div>
                <label htmlFor="duration">duration</label>
                <input type="text" id="duration" placeholder="duration" name="duration" value={movie.duration} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="release">release</label>
                <input type="date" id="release" placeholder="release" name="release" value={movie.release} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="limit">limit</label>
                <input type="text" id="limit" placeholder="limit" name="limit" value={movie.limit} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="active">active</label>
                <input type="checkbox" id="active" name="active" checked={active} onChange={handleChangeActive} />
            </div>
            {
                isUploaded 
                ? <button onClick={handleSubmit}>Submit</button>
                : <button onClick={handleUpload}>Upload</button>
            }
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default UpdateMovies;