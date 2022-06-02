import styles from "../styles/loading.module.scss"

const Loading = () => {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <span className={styles.customcircle}></span>
                <span className={styles.customcircle}></span>
                <span className={styles.customcircle}></span>
                <h2 className={styles.tag}>loading...</h2>
            </div>
        </div>
    )
}

export default Loading