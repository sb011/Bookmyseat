import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import Router from "next/router"
import { toast } from "react-toastify";

const DeleteMovie = ({ setRemoveMovie, id }) => {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "movies", id));
            console.log("done")
            Router.push("/admin")
        } catch (error) {
            return toast.error(error.message)
        }
    }

    return (
        <div>
            <h1>Delete Movie</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setRemoveMovie(false)}>Cancel</button>
        </div>
    )
}

export default DeleteMovie;