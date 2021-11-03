
export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResourse(url){
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, receive ${res.status}`);
        
        }
        return await res.json();
    }
    getAllCharacters = async (page = 5) => {
        const res = await this.getResourse(`/characters?page=${page}&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCaracter = async (id) =>{
        const character = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () =>{
        const res = await this.getResourse(`/houses`);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) =>{
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house);
    }
    getAllBooks = async () =>{
        const res = await this.getResourse(`/books`);
        return res.map(this._transformBook);
    }
    getBook = async (id) =>{
        const book = await this.getResourse(`/books/${id}`);
        return this._transformBook(book);
    }
    isSet(data){
        if (data){
            return data;
        } else {
            return 'no data';
        }
    }
    _extractId = (item) =>{
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
    _transformCharacter =(char) =>{
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }
    _transformHouse = (house) =>{
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapon: this.isSet(house.ancestralWeapon)
        }
    }
    _transformBook = (book) =>{
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }


}