import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from "../styles/showmovie.module.scss"

const Carousels = ({images}) => {
    return (
        <div  className={styles.main_car}>
            <Carousel>
                {
                    images.map((img, index) => (
                        <div key={index} className={styles.car_cont_img}>
                            <img src={img} alt="pics" className={styles.car_img}/>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Carousels