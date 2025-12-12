import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useMarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Loader from '../spinner/Loader';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, clearError, getComic, getCharacter} = useMarvelService();
    
    useEffect(() => {
        updateData();
    },[id])
   
    const updateData = () => {
        clearError()
        switch(dataType) {
            case 'comic' : {
                getComic(id).then(onDataLoaded);
                break;
            }
            case 'character': {
                getCharacter(id).then(onDataLoaded);
            }
        }
    }

    const onDataLoaded = (data) => { // записываем в стейт объект , который пришел из промиса и ф-и .getCharacters
        setData(data);
    }

    
    const errorMsg = error ? <Error/> : null
    const spinner = loading ? <Loader/> : null
    const content = !(loading || error || !data) ? <Component data ={data}/> : null

    return (
       <>
            <AppBanner/>
            {errorMsg}
            {spinner}
            {content}
       </>
    )
}

export default SinglePage;