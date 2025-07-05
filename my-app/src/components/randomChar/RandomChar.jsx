import './randomChar.scss';
import { useState, useEffect } from 'react';
import mjolnir from './../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService';
import Loader from '../spinner/Loader';
import Error from '../error/Error'

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    const marvelService = new MarvelService(); //создаем новый экщемпляр марвел сервиса, где лежат все методы для обращения к апи

    useEffect(() => {
       updateChar(); 
    }, [])

    const onCharLoaded = (char) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setChar(char);
        setLoading(false);
        setErr(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const updateChar = () => {// создаем новую ф-ю для обновления стейта
        onCharLoading();
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); Для оригинально апи марвел
        const id = Math.floor(Math.random() * (20 - 0) + 0)
        marvelService.getCharacter(id) // метод с получение одного персножа с рандомный айди
                     .then(onCharLoaded) // обрабатываем промис, колююеком передеаем ф-ю, которая записывает в стейт объект с персонажем char(char из 
        //аргумента onCharLoaded подставляется как (res=>) ранее в промисе)
                     .catch(onError)
    }

    const onError = () => {
        console.log('Ошибка')
        setLoading(false);
        setErr(true)
    }
        
    const spinner = loading ? <Loader/> : null;
    const errorMsg = err ? <Error/> : null;
    const content = !(loading || err) ? <AfterLoading char={char}/> : null;
    
    return (
        <div className="randomchar">
            {spinner}
            {errorMsg}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button  className="button button__main"
                            onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const AfterLoading = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{description ? description : 'Нет описания'}</p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
}

export default RandomChar;

