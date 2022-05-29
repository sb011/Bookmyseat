import { useEffect } from 'react';

const BookTicket = (props) => {
    const [movie, setMovie] = useState(state);

    useEffect(() => {
        const res = await getDoc(doc(db, 'movies', `${props.id}`))
        setMovie(res.data())
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setMovie({...user, [name]: value})
    }

    return (
        <div>
            <h1>Ticket</h1>
            {/* <div>
                <label htmlFor="date">date</label>
                <input type="text" id="date" placeholder="date" name="date" value={date} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" name="username" value={username} onChange={handleInputChange} />
            </div> */}
        </div>
    )
}

export async function getServerSideProps ({params: {id}}) {
    return { props: { id } };
}

export default BookTicket;