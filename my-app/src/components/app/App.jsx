
import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../spinner/Loader';

const Page404 = lazy (() => import ('../pages/404'));
const MainPage = lazy (() => import ('../pages/MainPage'));
const ComicsPage = lazy (() => import ('../pages/ComicsPage'));
const SingleComicPage = lazy (() => import ('../pages/singleComicPage/singleComicPage.jsx'));
const SingleCharacterPage = lazy(() => import ('../pages/singleCharacterPage/SingleCharacterPage.jsx'));
const SinglePage = lazy(()=> import ('../pages/SinglePage.jsx'));


const App = () => {

    return (
       <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Loader/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path ="/comics/:id"
                                   element={<SinglePage Component={SingleComicPage} dataType="comic" />}>
                            </Route>
                            <Route path='/characters/:id'
                                   element={<SinglePage Component={SingleCharacterPage} dataType="character" />}>
                            </Route>
                            <Route path ="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
       </Router>
    )
}

export default App;