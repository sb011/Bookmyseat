import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import Router from "next/router"
import { toast } from "react-toastify";
import Loading from "./loading";

const DeteleCinema = ({ setRemoveCinema, id }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteDoc(doc(db, "cinemas", id));
            setLoading(false)
            toast.success("The cinema has been deleted successfully.")
            Router.push("/admin/cinema")
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
            <button onClick={() => setRemoveCinema(false)}>Cancel</button>
        </div>
    )
}

export default DeteleCinema;