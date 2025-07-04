import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Error from './../error/Error'
import { Component } from 'react';
import Loader from '../spinner/Loader';
import propTypes from 'prop-types'

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: null,
        newItemLoading: false, // свой-во для управлния активностью кнопки
        charEnded: false,
        activeId: null,
        hoveredId: null,
        pageUp: false
    }

    marvelService = new MarvelService(); // создаем новый объект класса

    componentDidMount = () => { // первая загрзка и начало жизенного цикла
        this.onRequest(); //первый вызов в агрументе Null значит в начале в .getAllCharacters(offset), offset будет значение по дефолту offset = this._baseOffset
        window.addEventListener('scroll', this.onLoadByScroll)
        window.addEventListener('scroll', this.onHandleScroll)
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onLoadByScroll)
        window.removeEventListener('scroll', this.onHandleScroll)
    }

    onRequest = (offset) => {
        this.onCharListLoading(); // перед загрузкой нового контента, активируем ф-ю, что бы кнопка уже не нажималась
        this.marvelService 
        .getAllCharacters(offset) // метод по получению данных с сервера, в кот-м уже объект
        .then(this.onCharListLoaded) //помещаем новый объект в стейт
        .catch(this.onError)
    }

    onCharListLoaded = (newCharList) => { // передаем как-то новый объект, кот-й пришел с сервера
        let ended = false; // индикатор, если персонажи еще есть в бд то фолс
        if (newCharList.length < 9) { // если в новом объекте с сервера меньше 9 персов, значит они заканчиваются в бд
            ended = true; // и индикатор теперь тру, а значит в инлайн стилях скрываем кнопку "load more"
        }

        this.setState(({charList, offset}) => ({ // меняем стейт, запуская колюэк ф-ю, что бы данные менялись синхронно
            charList: [...charList,...newCharList], // развоарачиваем старый объект(при певом запуске пустой, длальше хранит предыд стейт) и добавдяем новый объект
            loading: false,
            offset: offset + 9, // меняем офсет на 9, что бы песонажи кажлый раз двигались на 9 позиций
            newItemLoading: false, // когда все персы прорузились, меняем на фолз, что бы кнопка была снова активна
            charEnded: ended // вычисляем закончились ли персножи или нет
        }))

    }

    onLoadByScroll = () => {
        let offset = this.state.offset
        let scrollHeight = document.documentElement.scrollHeight;

        if(window.scrollY + document.documentElement.clientHeight >= scrollHeight) {
            this.onRequest(offset)
        }
    }



    onCharListLoading = () => { // при загрузке, меняем на тру(когда загружается disabld = true и кнопка не активна)
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onSetActiveId = (id) => {
        this.setState({
            activeId: id
        })
    }

    onSetHoveredId = (id) => {
        this.setState({
            hoveredId: id
        })
    }

    onHandleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            this.setState({ pageUp: true });
        } else {
            this.setState({ pageUp: false });
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    renderItems = (itemsList) => {
        const items = itemsList.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
            } 
            return (
                <li className={item.id === this.state.activeId ? "char__item char__item_selected char__item_selected_colored" : item.id === this.state.hoveredId ? "char__item char__item_selected char__item_selected" : "char__item"}
                    tabIndex={0}
                    key ={item.id}
                    onClick={() => {
                                    this.props.onCharSelected(item.id);
                    }}
                    onFocus={()=> this.onSetActiveId(item.id)}
                    onMouseEnter={()=> this.onSetHoveredId(item.id)}
                    >
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
    
    render () {
        const {loading, charList, error, offset, newItemLoading, charEnded, pageUp} = this.state;
        const items = this.renderItems(charList)

        const errorMsg = error ? <Error/> : null
        const spinner = loading ? <Loader/> : null
        const content = !(loading || error) ? items : null

        return (
                <div className="char__list">
                        {errorMsg}
                        {spinner}
                        {content}
                    <button className="button button__main button__long"
                            onClick={() => this.onRequest(offset)}
                            disabled={newItemLoading}
                            style ={{'display': charEnded ? 'none' : 'block'}}>
                        <div className="inner">
                            load more</div>
                    </button>
                    <div
                        className={`scroll-to-top ${pageUp ? 'show' : ''}`}
                        onClick={this.scrollToTop}>
                    </div>
                </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;