import './charInfo.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';


import propTypes from 'prop-types'
import errorImg from './../../resources/img/no-image.jpg'

const CharInfo = (props) => {

    const [char, setChar] = useState(false)


    const {process, getCharacter, clearError, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    },[props.charId])

   
    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }

        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
    }

    const onCharLoaded = (char) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

    const View = ({data}) => {
        const {name, thumbnail, description, homepage, wiki, comics, resourceURI} = data;
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'contain'};
        }

    // const getComicId = (uri) => uri.split('/').pop();


    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt="abyss"
            onError={(e) => e.target.src = errorImg}
            style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {
                comics.map((item, i) => {
                //    const comicId = getComicId(item.resourceURI);
                   return (
                    <li className="char__comics-item" key={i}>
                        {/* <Link to={`/comics/${comicId}`} rel="noreferrer"> */}
                            {item}
                       {/* </Link> */}
                    </li>
                   )
                })
            }
        </ul>
        </>
    )
}


CharInfo.propTypes = {
    charId: propTypes.number
}


export default CharInfo;

