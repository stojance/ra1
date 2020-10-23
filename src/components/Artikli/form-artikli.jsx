import React, { Component } from "react";
import Config from "./../../config";
import spinner from "./../../ajax-loader.gif";
import OpisiArtikli from "./opisi-artikli";

class FormArtikli extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Artikal_ID: props.Artikal_ID,
      artikal: this.getPrazenArtikal(),

      errors: [],
      isLoaded: false,
    };

    this.saveArtikalOpis = this.saveArtikalOpis.bind(this);
    this.deleteArtikalOpis = this.deleteArtikalOpis.bind(this);
  }

  componentDidMount() {
    //alert(this.getArtikalUrl());
    this.fetchArtikal(this.state.Artikal_ID);
  }

  getArtikalUrl(id) {
    return Config.getArtikalById(id);
  }

  getPrazenArtikal() {
    return {
      Artikal_ID: 0,
      Naziv: "",
      Naziv1: "",
      Edm: "",
      Aktiven: true,
      Cena: 0.0,
      Danok_ID: 1,
      Grupa_ID: 0,

      ListGrupi: [],
      ListDanoci: [],
      ListOpisi: [],
    };
  }

  fetchArtikal(id) {
    //if(this.state.Artikal_ID===0) return;
    this.setState({ isLoaded: false });
    //console.log(id);
    //console.log(this.getArtikalUrl(id));
    fetch(this.getArtikalUrl(id))
      .then((res) => {
        //console.log(this.getArtikliUrl());
        //console.log(res.json());
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            errors: [],
            artikal: result,
          });
          console.log(":)");
          console.log(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            artikal: this.getPrazenArtikal(),
            errors: [error],
          });
        }
      );
  }

  _saveArtikalOpis(opis) {
    let opisData = {
      artikal_id: this.state.Artikal_ID,
      opis: opis,
    };

    console.log(JSON.stringify(opisData));
    fetch(Config.saveArtikalOpis2(), {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(opisData), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(JSON.stringify(data));
        let new_art = Object.assign({}, this.state.artikal, {
          ListOpisi: data,
        });
        this.setState({ artikal: new_art });
      })
      .catch((err) => {
        alert(err);
      });
  }

  saveArtikalOpis(opis) {
    this.setState({ isLoaded: false });
    let opisData = {
      artikal_id: this.state.Artikal_ID,
      opis: opis,
    };

    let myHeaders = new Headers();
    //myHeaders.append('Content-Type', 'application/json');
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(opisData);

    fetch(Config.saveArtikalOpis(), {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, same-origin, *omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: Config.objToQueryString(opisData), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert( JSON.stringify( data ) );
        let new_art = Object.assign({}, this.state.artikal, {
          ListOpisi: data,
        });
        this.setState({
          isLoaded: true,
          artikal: new_art,
        });
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        alert(err);
      });
  }

  deleteArtikalOpis(opis) {
    this.setState({ isLoaded: false });
    let opisData = {
      Artikal_ID: this.state.Artikal_ID,
      Opis: opis,
    };

    fetch(Config.deleteArtikalOpis(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json; charset=utf-8",
      },
      body: Config.objToQueryString(opisData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert( JSON.stringify( data ) );
        let new_art = Object.assign({}, this.state.artikal, {
          ListOpisi: data,
        });
        this.setState({
          isLoaded: true,
          artikal: new_art,
        });
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        alert(err);
      });
  }

  handleChange(event, attribute) {
    var newState = this.state.artikal;
    newState[attribute] = event.target.value;
    this.setState({ artikal: newState });
    //console.log(this.state.artikal);
  }

  handleCheckBox(event, attribute) {
    var newState = this.state.artikal;
    console.log(newState[attribute]);
    newState[attribute] = !newState[attribute];
    console.log(newState[attribute]);
    this.setState({ artikal: newState });
    //console.log(this.state.artikal);
  }

  handleSifraChange(e) {
    let id = 0;
    if (e.target.value) {
      id = e.target.value;
    }
    if (id < 0) return false;
    this.setState({ Artikal_ID: id });
    this.fetchArtikal(id);
  }

  selectGrupaChange(e) {
    //alert(e.target.value);
    let newArtikal = Object.assign({}, this.state.artikal, {
      Grupa_ID: e.target.value,
    });

    this.setState({ artikal: newArtikal });
  }

  selectDanokChange(e) {
    //alert(e.target.value);
    let newArtikal = Object.assign({}, this.state.artikal, {
      Danok_ID: e.target.value,
    });

    this.setState({ artikal: newArtikal });
  }

  handleOpisAdd(opis) {
    //alert(opis);
    this.saveArtikalOpis(opis);
  }

  handleOpisDelete(opis) {
    //alert(opis);
    this.deleteArtikalOpis(opis);
  }

  _validateForm() {
    this.setState({ errors: [] });
    let err = [];
    if (this.state.artikal.Naziv.length === 0) {
      err.push('Мора да изберете "Назив" !');
    }
    if (this.state.artikal.Naziv1.length === 0) {
      err.push('Мора да изберете "Скратен назив" !');
    }
    if (this.state.artikal.Edm.length === 0) {
      err.push('Мора да изберете "Едм" !');
    }
    if (this.state.artikal.Cena.length === 0) {
      err.push('Мора да изберете "Цена" !');
    }
    if (this.state.artikal.Cena < 0) {
      err.push("Цената мора да е > 0 !");
    }
    if (this.state.artikal.Grupa_ID === 0) {
      err.push('Мора да изберете "Група" !');
    }
    if (this.state.artikal.Danok_ID === 0) {
      err.push('Мора да изберете "Данок" !');
    }
    this.setState({ errors: err });
    return err.length === 0 ? true : false;
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    if (this._validateForm()) {
      let formData = Object.assign({}, this.state.artikal);
      //this.props.updateFormData(fd);
      //alert(JSON.stringify(formData));
      //return;
      this.setState({ isLoaded: false });

      fetch(Config.saveArtikal(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Accept: "application/json; charset=utf-8",
        },
        body: Config.objToQueryString(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //alert( JSON.stringify( data ) );
          let new_art = Object.assign({}, this.state.artikal, data);
          this.setState({
            isLoaded: true,
            Artikal_ID: new_art.Artikal_ID,
            artikal: new_art,
          });
          if (this.props.showMessage) {
            this.props.showMessage(
              "Успешно снимање на '" + this.state.artikal.Naziv + "'"
            );
          }
        })
        .catch((err) => {
          this.setState({ isLoaded: true });
          alert(err);
        });
    }
  }

  _renderError() {
    if (this.state.errors.length > 0) {
      let err = this.state.errors.map((e, i) => {
        return <li key={i}>{e}</li>;
      });
      return (
        <div className="alert alert-danger">
          <ul>{err}</ul>
        </div>
      );
    }
  }

  render() {
    const { Artikal_ID } = this.state;
    let errorMessage = this._renderError();
    let optionsGrupi = this.state.artikal.ListGrupi.map((o) => {
      return (
        <option value={o.Grupa_ID} key={o.Grupa_ID}>
          {o.Naziv}
        </option>
      );
    });
    let optionsDanoci = this.state.artikal.ListDanoci.map((o) => {
      return (
        <option value={o.Danok_ID} key={o.Danok_ID}>
          {o.Naziv}
        </option>
      );
    });
    return (
      <div>
        <h3>
          Артикал{" "}
          {this.state.isLoaded ? null : <img src={spinner} alt="Loading..." />}
        </h3>
        <hr />
        {errorMessage}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-horizontal">
            <div className="form-group row">
              <label className="control-label col-md-2">Шифра</label>
              <input
                className="form-control form-control-sm col-md-10"
                type="number"
                placeholder="Шифра ..."
                value={Artikal_ID}
                onChange={(event) => this.handleSifraChange(event)}
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Назив</label>
              <input
                className="form-control form-control-sm col-md-10"
                type="text"
                placeholder="Назив ..."
                value={this.state.artikal.Naziv}
                onChange={(event) => this.handleChange(event, "Naziv")}
              />
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Скратен назив</label>
              <input
                className="form-control form-control-sm col-md-10"
                type="text"
                placeholder="Скратен назив ..."
                value={this.state.artikal.Naziv1}
                onChange={(event) => this.handleChange(event, "Naziv1")}
              />
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Едм</label>
              <input
                className="form-control form-control-sm col-md-10"
                type="text"
                placeholder="Единечна мера ..."
                value={this.state.artikal.Edm}
                onChange={(event) => this.handleChange(event, "Edm")}
              />
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Група</label>
              <select
                className="form-control form-control-sm col-md-10"
                value={this.state.artikal.Grupa_ID}
                onChange={this.selectGrupaChange.bind(this)}
              >
                {optionsGrupi}
              </select>
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2" htmlFor="Aktiven">
                Активен
              </label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="Aktiven"
                  checked={this.state.artikal.Aktiven}
                  onChange={(event) => this.handleCheckBox(event, "Aktiven")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Данок</label>
              <select
                className="form-control form-control-sm col-md-10"
                value={this.state.artikal.Danok_ID}
                onChange={this.selectDanokChange.bind(this)}
              >
                {optionsDanoci}
              </select>
            </div>
            <div className="form-group row">
              <label className="control-label col-md-2">Цена</label>
              <input
                className="form-control form-control-sm col-md-10"
                type="number"
                placeholder="Цена ..."
                value={this.state.artikal.Cena}
                onChange={(event) => this.handleChange(event, "Cena")}
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </div>
            <div className="form-group row">
              <div className="col-md-2" />

              <button
                type="submit"
                ref="submit"
                className="btn btn-sm btn-success col-md-10"
              >
                Сними
              </button>
            </div>
          </div>
        </form>
        <hr />
        <OpisiArtikli
          Artikal_ID={this.state.artikal.Artikal_ID}
          ListOpisi={this.state.artikal.ListOpisi}
          handleOpisAdd={this.handleOpisAdd.bind(this)}
          handleOpisDelete={this.handleOpisDelete.bind(this)}
        />
        {/*<pre>
                    {JSON.stringify(this.state)}
                </pre>*/}
      </div>
    );
  }
}

export default FormArtikli;
