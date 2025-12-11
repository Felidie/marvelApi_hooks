import './charFormSearch.scss';
import useMarvelService from '../../services/MarvelService';

import {useState} from 'react'
import {Link} from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup'


const CharFormSearch = () => {
    // const [searchRes, setSearchRes] = useState([]);
    // const [isFound, setIsFound] = useState(false);
    // const [isDisabled, setIsDisabled] = useState(false);
    // const navigate = useNavigate();
    const [char, setChar] = useState();
    const {loading, error, clearError, getCharByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharByName(name)
            .then(onCharLoaded)
            console.log(char)
    }

    const errorMsg = error ? <div lassName="char__search-critical-error"><ErrorMessage/></div> : null;
    
    const result = !char ? null : char.length > 0 ?   <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

//     const handleGoToCharacter = () => {
//         const char = searchRes[0];
//          console.log('Переход к персонажу:', char);
//         navigate('/character', {state: {char}})
//     }

//    async function request (charname) {
//         const response = await fetch(`https://marvel-server-zeta.vercel.app/characters?name=${charname}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`, {
//             method : 'GET',
//             body: null
//         })
//         if (!response.ok) {
//             throw new Error(`Could not fetch, status: ${response.status}`); // сели запрос не пришел, ошибка в консоль
//         }

//         const data = await response.json();
//         // if (data.length > 0) {
//         //     setSearchRes(data)
//         // }
//         // if (data.length  < 0) {
//         //     setIsFound(true);
//         // }
//         // console.log(searchRes)
//         // console.log(isFound)
//         console.log(data.data.results)
//         return data.data.results;
//     }

    
    return (
        <div className="char__search-form">
        <Formik initialValues={{charName: ''}}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                                  .required('This field is required')
                                 .min(2, 'Min 2 symbols')

                })}
                onSubmit = {({charName}) => {
                   updateChar(charName);
        }}>
            <Form className="char__search-form">
                <label className='char__search-label'>Or find a character by a name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                                id="charName" 
                                name='charName' 
                                type='text'
                                placeholder="Enter name"/>
                            
                            <button 
                                type='submit' 
                                className="button button__main"
                                disabled={loading}>
                                <div className="inner">find</div>
                            </button>
                    </div>
                <ErrorMessage className="char__search-error" name="charName" component="div"></ErrorMessage>
            </Form>
        </Formik>
        {result}
        {errorMsg}
        </div>
    )
}

export default CharFormSearch;