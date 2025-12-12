import { useNavigate } from 'react-router-dom'
import '../singleComicPage/singleComicPage.scss';

const SingleComicPage = ({data}) => {
    const {thumbnail, title, description, pages, lang, price} = data;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pages}</p>
                    <p className="single-comic__descr">{lang}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
            <div onClick ={goBack} className="single-comic__back">Back</div>
        </div>
    )
}

export default SingleComicPage;