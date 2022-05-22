
const UpdateMovies = () => {
    return (
        <div>
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
                <label htmlFor="image">image</label>
                <ImageInput multiple files={files} setFiles={setFiles} />
            </div>
            <div>
                <label htmlFor="trailer">trailer</label>
                <input type="text" id="trailer" placeholder="trailer" name="trailer" value={movie.trailer} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="duration">duration</label>
                <input type="text" id="duration" placeholder="duration" name="duration" value={movie.duration} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="date">date</label>
                <input type="date" id="date" placeholder="date" name="date" value={movie.date} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="limit">limit</label>
                <input type="text" id="limit" placeholder="limit" name="limit" value={movie.limit} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UpdateMovies;