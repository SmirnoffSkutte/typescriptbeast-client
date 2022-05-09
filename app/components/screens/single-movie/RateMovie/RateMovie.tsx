import { useAuth } from '@/hooks/useAuth';
import { FC ,useState} from 'react';
import {FaStar} from 'react-icons/fa'
import { useRateMovie } from './useRateMovie';
import styles from './RateMovie.module.scss'
import AuthButton from '../AuthButton/AuthButton';

const RateMovie: FC<{ slug: string; _id: string }> = ({ slug, _id }) => {
	const { user } = useAuth()
	const {isSended, rating ,rateMovie} = useRateMovie(_id)
    const [ratingIn,setRatingIn]=useState(rating)

	return (
		<div className={styles.wrapper}>
			{/* <h3>Оцените фильм</h3> */}
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Спасибо за оценку</div>
					) : (
                        <div className={styles.starCont}>
                        {[...Array(5)].map((star,i)=>{
                            const ratingValue=i+1
                            return(
                                <label>
                                    <input type='radio'className={styles.radio} value={ratingValue} onClick={()=>{
                                    setRatingIn(ratingValue)
                                    rateMovie({value:ratingValue})
                                        }} 
                                    name='rating'/>
                                    <FaStar color={ratingValue <= rating ? '#ff9900' : "white" } className={styles.star} size={25}/>
                                </label>
                            )
                        })}
                
                    </div>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
