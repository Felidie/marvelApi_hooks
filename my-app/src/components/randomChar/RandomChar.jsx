import './randomChar.scss';
import { useState, useEffect } from 'react';
import errorImg from './../../resources/img/no-image.jpg'
import mjolnir from './../../resources/img/mjolnir.png'
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService(); //создаем новый экщемпляр марвел сервиса, где лежат все методы для обращения к апи

    useEffect(() => {
       updateChar(); 
    }, [])

    const onCharLoaded = (char) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setChar(char);
    }

    const updateChar = () => {// создаем новую ф-ю для обновления стейта
        clearError(); // если была ошибка, ставим еке в null
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); Для оригинально апи марвел
        const id = Math.floor(Math.random() * 21);
        getCharacter(id) // метод с получение одного персножа с рандомный айди
                     .then(onCharLoaded)
                     .then(()=>setProcess('confirmed')) // обрабатываем промис, колююеком передеаем ф-ю, которая записывает в стейт объект с персонажем char(char из 
        //аргумента onCharLoaded подставляется как (res=>) ранее в промисе)
    }
        
    return (
        <div className="randomchar">
            {setContent(process, AfterLoading, char)}
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

const AfterLoading = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} onError={(e) => e.target.src = errorImg}
                />
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

