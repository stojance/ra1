import axios from "axios";

export default class AuthServiceJson {
  _endpoint = "http://localhost:3000/users/";
  login = async (sifra) => {
    const response = await axios.get(this._endpoint);
    console.log('login',response);
    if (response.data) {
      const usr =  response.data.find((usr) => usr.password === sifra);
      console.log('usr',usr)
      this.setProfile(usr);  
      return usr;
    }
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const profile = this.getProfile();
    return !!profile;
  };

  setProfile = (profile) => {
    // Saves profile data to localStorage
    console.log('JSON.stringify(profile)',JSON.stringify(profile));
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  getProfile = () => {
    // Retrieves the profile data from localStorage
    if(!localStorage.getItem("profile")){
      return null;
    }

    const strProfile = localStorage.getItem("profile");
    console.log('strProfile',strProfile);

    const usr = JSON.parse(localStorage.getItem("profile"))
    console.log('Profile', usr);

    return usr;
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("profile");
  };

  _checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

  _fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json; charset=utf-8",
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  };

  _objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join("&");
  };
}
