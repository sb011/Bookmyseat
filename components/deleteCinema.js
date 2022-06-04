import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebaseConfig";
import Router from "next/router"
import { toast } from "react-toastify";
import Loading from "./loading";
import { useState } from "react";
import styles from "../styles/delete.module.scss"


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
        <div className={styles.del_main}>
            {
                loading && <Loading />
            }
            <div className={styles.del_form}>
                <h1 className={styles.del_title}>Are you sure you want to Delete this Cinema?</h1>
                <div className={styles.del_buttons}>
                    <button className={styles.del_del} onClick={handleDelete}>Delete</button>
                    <button className={styles.del_can} onClick={() => setRemoveCinema(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeteleCinema;