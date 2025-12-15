import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {
    const {request,clearError, process, setProcess} = useHttp(); //деструктуризируем переменные из нашего хука, обязательно вызывая его!!!
  
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;


    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); // map в данном случае создает новый массив, где в кач-ве колбэка применяется ф-я, которая будет на каждой итерации создавать объект под каждого персонажа
    }

    const getCharacter = async (id) => { // делаем ф-ю ассинхронной для того что бы дождаться ответа от сервера и вызвать ф-ю  _transformCharacter
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // записываем в переменную объект , который приходит из промиса
        return _transformCharacter(res.data.results[0]); // возвращаем работу метода(т.е новый объект)
    }

    const getComics = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => { // делаем ф-ю ассинхронной для того что бы дождаться ответа от сервера и вызвать ф-ю  _transformCharacter
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`); // записываем в переменную объект , который приходит из промиса
    return _transformComics(res.data.results[0]); // возвращаем работу метода(т.е новый объект)
    }

    const getCharByName = async (name) => { // делаем ф-ю ассинхронной для того что бы дождаться ответа от сервера и вызвать ф-ю  _transformCharacter
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`); // записываем в переменную объект , который приходит из промиса
    return res.data.results.map(_transformCharacter); // возвращаем работу метода(т.е новый объект)
    }

    const _transformCharacter = (char) => { // возвращает объует уже с нужными свой-ми, char это res -> data ->results[0]
            return {
                name: char.name,
                description: char.description? (char.description.length > 150 ? char.description.slice(0, 150) + '...' : char.description) : "There is no description",
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                id: char.id,
                // comics:
                // ? char.comics.items.slice(0, 10).map(item =>({
                //    name: item.name,
                //    link: item.resourceURI
                // }))
                // : [] // запрос по комиксах для настоящего апи марвел
                comics: char.comics.items,
                resourceURI: char.resourceURI
        }
    }

    const _transformComics = (item) => { // возвращает объует уже с нужными свой-ми, item это res -> data ->results[0]
            return {
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                price: item.prices[0].price + '$',
                description: item.description,
                pages: item.pageCount + ' pages.'
        }
    }

    return { 
            request,
            process, 
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getComics, 
            getComic, 
            setProcess,
            getCharByName} // возвращаем loading, request, error для дальнейщего исп-я
}

export default useMarvelService;