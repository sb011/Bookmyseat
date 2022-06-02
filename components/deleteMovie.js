import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import Router from "next/router"
import { toast } from "react-toastify";
import Loading from "./loading";

const DeleteMovie = ({ setRemoveMovie, id }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteDoc(doc(db, "movies", id));
            setLoading(false)
            toast.success("The movie has been deleted successfully.")
            Router.push("/admin")
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
            <h1>Delete Movie</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setRemoveMovie(false)}>Cancel</button>
        </div>
    )
}

export default DeleteMovie;