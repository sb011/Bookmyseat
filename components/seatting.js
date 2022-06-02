import styles from "../styles/seatting.module.scss"

const Seatting = ({ ticket, setTicket, row, col, booked }) => {
    // const [cinemas, setCinemas] = useState([]);
    const r = parseInt(row)
    const c = parseInt(col)

    const onSelect = (e, index, cindex ) => {
        // if(e.target.classList.contains('seatting_seat__SoSn7') && !e.target.classList.contains('seatting_occupied__gaM_S')){
        //     e.target.classList.remove('seatting_seat__SoSn7')
        //     e.target.classList.add('seatting_selected__UZ7k8')
            const s = {
                row: index,
                col: cindex
            }
            const data = [...ticket.seats, s];
            setTicket({...ticket, seats: data})
        // }
    }

    const unSelect = (e, index, cindex) => {
        // if(e.target.classList.contains('seatting_selected__UZ7k8') && !e.target.classList.contains('seatting_occupied__gaM_S')){
        //     e.target.classList.remove('seatting_selected__UZ7k8')
        //     e.target.classList.add('seatting_seat__SoSn7')
            const tick = [...ticket.seats]
            const ans = tick.filter((se) => (se.row != index || se.col != cindex))
            setTicket({...ticket, seats: ans})
        // }
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
            <div className={styles.hall}>
            {
                [...Array(r)].map((r, index) => ( 
                    <div key={index} className={styles.row}>
                        <h5>Row {index}</h5>
                        {
                            [...Array(c)].map((c, cindex) => (
                                <>
                                    {
                                        isOccupied(index, cindex)
                                        ? <div className={styles.occupied}></div> 
                                        : isSelected(index, cindex)
                                            ? <div className={styles.selected} onClick={(e) => unSelect(e, index, cindex)}></div> 
                                            : <div className={styles.seat} onClick={(e) => onSelect(e, index, cindex)}></div> 
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