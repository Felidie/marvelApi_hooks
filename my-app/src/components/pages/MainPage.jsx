import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoudary";
import decoration from '../../resources/img/vision.png';

import {useState, lazy, Suspense } from "react";

const CharInfo = lazy(()=> import('../charInfo/CharInfo'));

const MainPage = () => {

           const [selectedChar, setChar] = useState(null);
            
            const onCharSelected = (id) => {
                setChar(id)
            }
        
    return (
        <>
            <Suspense>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected= {onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </Suspense>
        </>
    )
}

export default MainPage;