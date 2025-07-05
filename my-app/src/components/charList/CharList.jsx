import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Error from './../error/Error'
import { useState, useEffect, useCallback, useRef } from 'react';
import Loader from '../spinner/Loader';
import propTypes from 'prop-types'

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setItemLoading] = useState(false); // свой-во для управлния активностью кнопки
    const [charEnded, setCharEnded] = useState(false);
    const [activeId, setActiveId] =  useState(null);
    const [hoveredId, sethHoveredId] = useState(null);
    const [pageUp, setPageUp] = useState(false);
    
    const marvelService = new MarvelService(); // создаем новый объект класса

    useEffect(() => {
        onRequest(); //первый вызов в агрументе Null значит в начале в .getAllCharacters(offset), offset будет значение по дефолту offset = this._baseOffset
    },[])

    useEffect(() =>{
        window.addEventListener('scroll', onLoadByScroll)
        window.addEventListener('scroll', onHandleScroll)

        return () => {
            window.removeEventListener('scroll', onLoadByScroll)
            window.removeEventListener('scroll', onHandleScroll)
        }
    }, [offset])

    const onRequest = useCallback(() => {
        // if (newItemLoading || charEnded) return;

         onCharListLoading();
         marvelService.getAllCharacters(offset)
                        .then(onCharListLoaded)
                        .catch(onError);
    },[offset,charEnded,newItemLoading,charList])

    const onCharListLoaded = (newCharList) => { // передаем как-то новый объект, кот-й пришел с сервера
        let ended = false; // индикатор, если персонажи еще есть в бд то фолс
        if (newCharList.length < 9) { // если в новом объекте с сервера меньше 9 персов, значит они заканчиваются в бд
            ended = true; // и индикатор теперь тру, а значит в инлайн стилях скрываем кнопку "load more"
        }

        setCharList(charList =>[...charList,...newCharList]);
        setLoading(false);
        setOffset(offset => offset + 9);
        setItemLoading(newItemLoading => false);
        setCharEnded(charEnded => ended)
    }


//     useEffect(() => {
//   console.log('offset увеличен:', offset);
// }, [offset]);

    const onLoadByScroll = () => {
        // let offset = offset
        let scrollHeight = document.documentElement.scrollHeight;

        if(window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
            onRequest(offset);
        }
    }

    // const onLoadByScroll = useCallback(() => { // способ отслеживания офсета с помощью рефов
    //      let scrollHeight = document.documentElement.scrollHeight;
        

    //     if(window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
    //         onRequest(offsetScroll);
    //     }
    // })

    // const offsetScroll = useRef(offset);

    // useEffect (() => {
    //     offsetScroll.current = offset
    // }, [offset])



    const onCharListLoading = () => { // при загрузке, меняем на тру(когда загружается disabld = true и кнопка не активна)
        setItemLoading(true)
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onSetActiveId = (id) => {
        setActiveId(id);
    }

    const onSetHoveredId = (id) => {
        sethHoveredId(id)
    }

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

    const renderItems = (itemsList) => {
        const items = itemsList.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
            } 
            return (
                <li className={item.id === activeId ? "char__item char__item_selected char__item_selected_colored" : item.id === hoveredId ? "char__item char__item_selected char__item_selected" : "char__item"}
                    tabIndex={0}
                    key ={item.id}
                    onClick={() => props.onCharSelected(item.id)}
                    onFocus={()=> onSetActiveId(item.id)}
                    onMouseEnter={()=> onSetHoveredId(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)

    const errorMsg = error ? <Error/> : null
    const spinner = loading ? <Loader/> : null
    const content = !(loading || error) ? items : null

    return (
            <div className="char__list">
                    {errorMsg}
                    {spinner}
                    {content}
                <button className="button button__main button__long"
                        onClick={onRequest}
                        disabled={newItemLoading}
                        style ={{'display': charEnded ? 'none' : 'block'}}>
                    <div className="inner">
                        load more</div>
                </button>
                <div
                    className={`scroll-to-top ${pageUp ? 'show' : ''}`}
                    onClick={scrollToTop}>
                </div>
            </div>
    )
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;