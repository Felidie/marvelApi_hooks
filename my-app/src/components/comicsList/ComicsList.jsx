import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Loader from '../spinner/Loader';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';


const ComicsList = () => {

    const [list, setComicList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setItemLoading] = useState(false);
    const [listEnded, setListEnded] = useState(false);
    // const [activeId, setActiveId] =  useState(null);

    const {error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = useCallback(() => {
        setItemLoading(true);
        getComics(offset)
                .then(onComicsListLoaded)
    },[offset, list, listEnded, newItemLoading])

    const onComicsListLoaded = (data) => {
        let ended = false; // индикатор, если персонажи еще есть в бд то фолс
        if (data.length < 9) { // если в новом объекте с сервера меньше 9 персов, значит они заканчиваются в бд
            ended = true; // и индикатор теперь тру, а значит в инлайн стилях скрываем кнопку "load more"
        }

        setComicList(prev => [...prev, ...data]);
        setOffset(offset => offset + 9);
        setItemLoading(newItemLoading => false);
        setListEnded(listEnded => ended)
    }

    console.log('Render!')

    // const onSetActiveId = (id) => {
    //     setActiveId(id);
    // }

    const renderComics = (comics) => {
        const items = comics.map(item => {

        return (
            <li className="comics__item"
                key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className={"comics__item-img"}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
            </li>
        )
        })
        return (
            <ul className="comics__grid">
               {items}
            </ul>
        )
    }

    const items = renderComics(list);
   
    const errorMsg = error ? <Error/> : null
    const spinner = newItemLoading ? <Loader/> : null

    return (
        <div className="comics__list">

            {errorMsg}
            {spinner}
            {items}
           
            <button className="button button__main button__long">
                <div className="inner"
                     onClick={()=> onRequest(offset)}
                >load more</div>
            </button>
        </div>
    )
}

export default ComicsList;