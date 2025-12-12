import '../singleCharacterPage/singleCharacterPage.scss'
import { useNavigate } from 'react-router-dom'

const SingleCharacterPage = ({data}) => {
    
    const {name, description, thumbnail} = data;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }


    return (
        <div className="single-comic">
            <img className="single-comic__char-img" src={thumbnail} alt={name}/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
            <div onClick ={goBack} className="single-comic__back">Back</div>
        </div>
    )
}

export default SingleCharacterPage;