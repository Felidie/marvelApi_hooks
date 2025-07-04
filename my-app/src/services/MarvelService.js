class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    _baseOffset = 0;

    getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetcjh ${url}, status: ${res.status}`);
        }

        return await res.json();
        }

        getAllCharacters = async(offset = this._baseOffset) => {
            const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
            return res.data.results.map(this._transformCharacter); // map в данном случае создает новый массив, где в кач-ве колбэка применяется ф-я, которая будет на каждой итерации создавать объект под каждого персонажа
        }

        getCharacter = async (id) => { // делаем ф-ю ассинхронной для того что бы дождаться ответа от сервера и вызвать ф-ю  _transformCharacter
            const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`); // записываем в переменную объект , который приходит из промиса
            return this._transformCharacter(res.data.results[0]); // возвращаем работу метода(т.е новый объект)
        }

        _transformCharacter = (char) => { // возвращает объует уже с нужными свой-ми, char это res -> data ->results[0]
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
                    comics: char.comics.items
            }
        }
}

export default MarvelService;