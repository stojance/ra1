class RestoranApiCalls {
    constructor() {
        this.root = 'http://192.168.222.73/';
        this.appName = 'eRestoran/';
    }

    rootApi = () => `${this.root}${this.appName}api/`;

    getKorisnik = (sifra) => `${this.rootApi()}maticni/getkorisnik/${sifra}`;
    postKorisnikBySifra = () => `${this.rootApi()}maticni/korisnikBySifra`;

    getArtikalOpis = (artikaID,zaGrupa=0) => `${this.rootApi()}maticni/getartikalopis/${artikaID}?zaGrupa=${zaGrupa}`;

    objToQueryString = (obj) => {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }
}

export default new RestoranApiCalls();