import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

import './singleComicPage.scss';
import Loader from '../spinner/Loader';
import useMarvelService from '../../services/MarvelService';
import AppBanner from './../appBanner/AppBanner'

const SingleComicPage = () => {
    const {comicId} = useParams(); // вытаскиваем ключ comicId из хука
    const [comic, setComic] = useState(null);
    const {loading, error, clearError, getComic} = useMarvelService();

    
    useEffect(() => {
        updateComic();
    },[comicId])
   
    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
            
    }

    const onComicLoaded = (comic) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setComic(comic)
    }


    const View = ({comic}) => {
        const {title, thumbnail, price, description, pages, lang} = comic;

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
            <Link to ="/comics" className="single-comic__back">Back to all</Link>
        </div>
        )
    }

    const errorMsg = error ? <Error/> : null
    const spinner = loading ? <Loader/> : null
    const content = !(loading || error || !comic) ? <View comic ={comic}/> : null

    return (
       <>
            <AppBanner/>
            {errorMsg}
            {spinner}
            {content}
       </>
    )
}

export default SingleComicPage;