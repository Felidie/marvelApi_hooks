// import AppHeader from "../appHeader/AppHeader";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoudary";
// import ComicsList from "../comicsList/ComicsList";

// import decoration from '../../resources/img/vision.png';
// import {useState } from "react";
import AppHeader from '../appHeader/AppHeader'
import MainPage from '../pages/MainPage'
import ComicsPage from '../pages/ComicsPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


const App = () => {

    return (
       <Router>
         <div className="app">
            <AppHeader/>
            <main>
                
                {/* <Switch>
                <Route exact path="/">
                    <ErrorBoundary><RandomChar/></ErrorBoundary>
                        <div className="char__content">
                    <ErrorBoundary><CharList onCharSelected= {onCharSelected}/></ErrorBoundary>
                    <ErrorBoundary><CharInfo charId={selectedChar}/></ErrorBoundary>
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                </Route>

                <Route exact path="/comics">
                    <ComicsList/>
                </Route>
                </Switch>
                */}

                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsPage/>}/>
                </Routes>

            </main>
        </div>
       </Router>
    )
}

export default App;