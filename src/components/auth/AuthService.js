
import Config from './../../config';
export default class AuthService {
    constructor(domain) {
      
      this.login = this.login.bind(this);
      this.loggedIn = this.loggedIn.bind(this);
      this.getProfile = this.getProfile.bind(this);
    }
  
    login(sifra) {
      return this._fetch(Config.getKorisnikBySifra(), {
        method: 'POST',
        body: Config.objToQueryString({
          sifra
        })
      }).then(res => {
        console.log('login res:');
        console.log(res);
        this.setProfile(res);        
      });
    }

    loggedIn() {
      // Checks if there is a saved token and it's still valid
      const profile = this.getProfile();
      return !!profile;
    }
  
    setProfile(profile){
      // Saves profile data to localStorage
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  
    getProfile(){
      // Retrieves the profile data from localStorage
      return localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;
    }
  
  
    logout(){
      // Clear user token and profile data from localStorage
      localStorage.removeItem('profile');
    }
    
    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  
    _fetch(url, options){
      // performs api calls sending the required authentication headers
      const headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept':'application/json; charset=utf-8'
      };
  
      return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json());
    }

  }
  