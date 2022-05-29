import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import Router from "next/router"

const DeteleCinema = ({ setRemoveCinema, id }) => {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "cinemas", id));
            console.log("done")
            Router.push("/admin/cinema")
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Delete Movie</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setRemoveCinema(false)}>Cancel</button>
        </div>
    )
}

export default DeteleCinema;