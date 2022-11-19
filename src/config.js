
class Config {

    constructor () {
        this.root = 'http://192.168.222.73/';
        this.appName = 'eRestoran/';
    }

    rootApi () {
        return this.root + this.appName + 'api/';
    }

    artikliGet () {
        return this.rootApi() + 'Artikli';
    }

    artikliGetBy () {
        return this.rootApi() + 'Artikli/GetBy/';
    }

    getArtikalById (id) {
        return this.rootApi() + 'Artikli/GetArtikalById?artikal_id='+id;
    }

    saveArtikal () {
        return this.rootApi() + 'Artikli/Save';
    }

    deleteArtikal () {
        return this.rootApi() + 'Artikli/Delete';
    }

    saveArtikalOpis () {
        return this.rootApi() + 'Artikli/SaveOpis';
    }

    saveArtikalOpis2 () {
        return this.rootApi() + 'Artikli/SaveOpis2';
    }

    deleteArtikalOpis () {
        return this.rootApi() + 'Artikli/DeleteOpis';
    }

    getTreeGrupiArtikli () {
        return this.rootApi() + 'GrupiArtikli/GetTree';
    }

    getEditGrupaVM (grupa_id) {
        return this.rootApi() + 'GrupiArtikli/GetEditModel/' + grupa_id;
    }

    saveGrupaArtikal () {
        return this.rootApi() + 'GrupiArtikli/Save';
    }

    deleteGrupaArtikal () {
        return this.rootApi() + 'GrupiArtikli/Delete';
    }

    getKorisnikBySifra() {
        return this.rootApi() + 'Korisnici/GetBySifra';
    }

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

}

export default new Config();
    