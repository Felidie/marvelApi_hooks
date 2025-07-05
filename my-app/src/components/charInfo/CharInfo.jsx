import './charInfo.scss';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';

import Loader from '../spinner/Loader';
import Error from '../error/Error'
import Skeleton from './../skeleton/Skeleton'
import propTypes from 'prop-types'
import errorImg from './../../resources/img/no-image.jpg'

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState(false)



    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    },[props.charId])
   
    // componentDidMount() {
    //     this.updateChar();

    // }

    // componentDidUpdate (prevProps) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }

        onCharLoading();
        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setChar(char)
        setLoading(false)
        console.log(char)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }
     
    const skeleton = char || loading || err ? null : <Skeleton/>
    const errorMsg = err ? <Error/> : null
    const spinner = loading ? <Loader/> : null
    const content = !(loading || err || !char) ? <View char ={char}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMsg}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

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
                   return (
                    <li className="char__comics-item" key={i}>
                        {/* <a href={item.link} target="_blank" rel="noreferrer">
                            {item.name}
                        </a> */} 
                        {/* для оригинального марвел апи */}
                        {item}
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

