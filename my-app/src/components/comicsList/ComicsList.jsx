import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Loader from '../spinner/Loader';
import { useEffect, useState  } from 'react';
import { Link} from 'react-router-dom';


const ComicsList = () => {

    const [list, setComicList] = useState([]);
    const [offset, setOffset] = useState(18);
    const [newItemLoading, setItemLoading] = useState(false);
    const [listEnded, setListEnded] = useState(false);
    const [pageUp, setPageUp] = useState(false);
    // const [activeId, setActiveId] =  useState(null);

    const {error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest();
        console.log('Первый рендер и загрузка комиксов')
    }, [])

    
    const onRequest = (offset) => {
        if (newItemLoading || listEnded) return;
        setItemLoading(true);
        getComics(offset)
                .then(onComicsListLoaded)
                console.log('Запрос')
    }

    

    const onComicsListLoaded = (data) => {
        let ended = false; // индикатор, если персонажи еще есть в бд то фолс
        if (data.length < 8) { // если в новом объекте с сервера меньше 9 персов, значит они заканчиваются в бд
            ended = true; // и индикатор теперь тру, а значит в инлайн стилях скрываем кнопку "load more"
        }

        setComicList(prev => [...prev, ...data]);
        setOffset(offset => offset + 8);
        setItemLoading(newItemLoading => false);
        setListEnded(listEnded => ended)
        console.log('Подгружаем новый комиксы')
    }


    
    // const onLoadByScroll = useCallback(() => {
    //     // let offset = offset
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const currentScroll = window.scrollY + document.documentElement.clientHeight;

    //     if (newItemLoading || listEnded) return;
                
    //     if (currentScroll >= scrollHeight - 1) {
    //         onRequest(offset);
    //     }
    // }, [newItemLoading, listEnded, onRequest, offset])


    const onHandleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            setPageUp(true);
        } else {
            setPageUp(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

        useEffect(() =>{
        window.addEventListener('scroll', onHandleScroll)

        return () => {
            window.removeEventListener('scroll', onHandleScroll)
        }
    }, []);

    
    const renderComics = (comics) => {
        const items = comics.map((item, index) => {

        return (
            <li className="comics__item"
                key={`${item.id}-${index}`}>
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
            
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading || listEnded}>
            
                <div className="inner">load more</div>
            </button>

            <div
                className={`scroll-to-top ${pageUp ? 'show' : ''}`}
                onClick={scrollToTop}>
            </div>
        </div>
    )
}

export default ComicsList;