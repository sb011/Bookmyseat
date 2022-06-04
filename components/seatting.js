import styles from "../styles/seatting.module.scss"

const Seatting = ({ ticket, setTicket, row, col, booked }) => {
    // const [cinemas, setCinemas] = useState([]);
    const r = parseInt(row)
    const c = parseInt(col)

    const onSelect = (e, index, cindex ) => {
        const s = {
            row: index,
            col: cindex
        }
        const data = [...ticket.seats, s];
        setTicket({...ticket, seats: data})
    }

    const unSelect = (e, index, cindex) => {
        const tick = [...ticket.seats]
        const ans = tick.filter((se) => (se.row != index || se.col != cindex))
        setTicket({...ticket, seats: ans})
    }

    const isOccupied = (index, cindex) => {
        const ans = booked.find((book) => book.row == index && book.col == cindex)
        if(ans)
            return true;
        return false;
    }

    const isSelected = (index, cindex) => {
        const ans = ticket.seats.find((book) => book.row == index && book.col == cindex)
        if(ans)
            return true;
        return false;
    }
    
    return (
        <div className={styles.body}>
            <div className={styles.indi}>
                <div className={styles.indi_spe}>
                    <div className={styles.seat}></div>
                    <label className={styles.indi_title}>N/A</label>
                </div>
                <div className={styles.indi_spe}>
                    <div className={styles.selected}></div>
                    <label className={styles.indi_title}>Selected</label>
                </div>
                <div className={styles.indi_spe}>
                    <div className={styles.occupied}></div>
                    <label className={styles.indi_title}>Occuiped</label>
                </div>
            </div>
            <div className={styles.cont_screen}>
                <div className={styles.screen}></div>
            </div>
            <div className={styles.hall}>
            {
                [...Array(r)].map((r, index) => ( 
                    <div key={index} className={styles.row}>
                        {
                            [...Array(c)].map((c, cindex) => (
                                <>
                                    {
                                        isOccupied(index, cindex)
                                        ? <div className={styles.occupied}>{index}-{cindex}</div> 
                                        : isSelected(index, cindex)
                                            ? <div className={styles.selected} onClick={(e) => unSelect(e, index, cindex)}>{index}-{cindex}</div> 
                                            : <div className={styles.seat} onClick={(e) => onSelect(e, index, cindex)}>{index}-{cindex}</div> 
                                    }
                                </>
                            ))
                        }
                    </div>
                ))
            } 
            </div>
        </div>
    )
}

export default Seatting