import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Error from './../error/Error'
import errorImg from './../../resources/img/no-image.jpg'
import { useState, useEffect, useCallback} from 'react';
import Loader from '../spinner/Loader';
import propTypes from 'prop-types'

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setItemLoading] = useState(false); // свой-во для управлния активностью кнопки
    const [charEnded, setCharEnded] = useState(false);
    const [activeId, setActiveId] =  useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [pageUp, setPageUp] = useState(false);
    
    const {error, getAllCharacters} = useMarvelService(); // создаем новый объект класса

    useEffect(() => {
        console.log('Первый рендер и загрузка персонажей')
        onRequest(); //первый вызов в агрументе Null значит в начале в .getAllCharacters(offset), offset будет значение по дефолту offset = this._baseOffset
    },[])

    useEffect(() =>{
        window.addEventListener('scroll', onHandleScroll)

        return () => {
            window.removeEventListener('scroll', onHandleScroll)
        }
    }, [newItemLoading])

    const onRequest = (offset) => {
        

        // initial ?  setItemLoading(true) :  setItemLoading(false);
        if (newItemLoading || charEnded) return;
        setItemLoading(true);
        getAllCharacters(offset)
                        .then(onCharListLoaded)
                        console.log('Подгружаем персонажей')
        
    }

    const onCharListLoaded = (newCharList) => { // передаем как-то новый объект, кот-й пришел с сервера
        let ended = false; // индикатор, если персонажи еще есть в бд то фолс
        if (newCharList.length < 9) { // если в новом объекте с сервера меньше 9 персов, значит они заканчиваются в бд
            ended = true; // и индикатор теперь тру, а значит в инлайн стилях скрываем кнопку "load more"
        }

        setCharList(charList =>[...charList,...newCharList]);
        setOffset(offset => offset + 9);
        setItemLoading(newItemLoading => false);
        setCharEnded(charEnded => ended)

        console.log('Меняем стейт')
        console.log(offset)

        

    }

    // const onLoadByScroll = useCallback(() => {
    //     // let offset = offset
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const currentScroll = window.scrollY + document.documentElement.clientHeight;

    //     if (newItemLoading || charEnded) return;
                
    //     if (currentScroll >= scrollHeight - 1) {
    //         onRequest(offset);
    //     }
    // }, [newItemLoading, charEnded, onRequest, offset])

    const onSetActiveId = (id) => {
        setActiveId(id);
    }

    const onSetHoveredId = (id) => {
        setHoveredId(id)
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
        const items = itemsList.map((item, index) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
            } 
            return (
                <li className={item.id === activeId ? "char__item char__item_selected char__item_selected_colored" : item.id === hoveredId ? "char__item char__item_selected char__item_selected" : "char__item"}
                    tabIndex={0}
                    key ={`${item.id}-${index}`}
                    onClick={() => props.onCharSelected(item.id)}
                    onFocus={()=> onSetActiveId(item.id)}
                    onMouseEnter={()=> onSetHoveredId(item.id)}>
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} onError={(e) => e.target.src = errorImg}/>
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
    const spinner = newItemLoading ? <Loader/> : null

    return (
            <div className="char__list">
                    {errorMsg}
                    {spinner}
                    {items}
                <button className="button button__main button__long"
                        onClick={() => onRequest(offset)}
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