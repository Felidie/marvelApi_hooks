import { useParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import '../singleCharacterPage/singleCharacterPage.scss'
import useMarvelService from '../../../services/MarvelService'
import AppBanner from '../../appBanner/AppBanner'
import Error from '../../error/Error';
import Loader from '../../spinner/Loader';

const SingleCharacterPage = () => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService();
    const navigate = useNavigate();
    const goBack =() => navigate(-1);

    useEffect(() => {
        updateChar();
    },[charId])
    
    const updateChar = () => {
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            
    }

    const onCharLoaded = (char) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setChar(char)
    }

     const View = ({char}) => {
        const {thumbnail, description,name} = char;
    
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

    const errorMsg = error ? <Error/> : null
    const spinner = loading ? <Loader/> : null
    const content = !(loading || error || !char) ? <View char ={char}/> : null

    return (
       <>
            <AppBanner/>
            {errorMsg}
            {spinner}
            {content}
       </>
    )
    
        
}

export default SingleCharacterPage