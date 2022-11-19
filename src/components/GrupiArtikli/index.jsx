import React from "react";
import { Treebeard } from "react-treebeard";
import FlashMsg from "../FlashMsg";
import Config from "./../../config";
import spinner from "./../../ajax-loader.gif";

class GrupiArtikli extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,
      selectedNode: null,
      grupiArtikli: {},
      flashMsg: null,
      selectedGrupa: null,
    };
  }

  componentDidMount() {
    this.fetchGrupiArtikli();
  }

  fetchGrupiArtikli = () => {
    this.setState({ isLoaded: false });
    fetch(Config.getTreeGrupiArtikli())
      .then((res) => {
        //console.log(res);
        //console.log(res.json());
        return res.json();
      })
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            selectedNode: result,
            grupiArtikli: result,
          });
          //console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            grupiArtikli: {},
            error,
          });
        }
      );
  };

  fetchEditGrupaVM = (grupa_id) => {
    this.setState({ isLoaded: false });
    fetch(Config.getEditGrupaVM(grupa_id))
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            selectedGrupa: result,
          });
          console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            grupiArtikli: {},
            error,
          });
        }
      );
  };

  showMessage = (msg) => {
    this.setState({
      flashMsg: msg,
    });
    setTimeout(() => this.hideMessage(), 2000);
  };

  hideMessage = () => {
    this.setState({
      flashMsg: null,
    });
  };

  onToggle = (node, toggled) => {
    if (this.state.selectedNode) {
      let selNode = this.state.selectedNode;
      selNode.active = false;
      //if(selNode.id > 12) selNode.toggled = false;
      this.setState({ selectedNode: selNode });
      //console.log(selNode);
    }
    node.active = true;
    //if(node.children){ node.toggled = toggled; }
    this.setState({ selectedNode: node });
    //console.log(this.state.selectedNode);

    this.fetchEditGrupaVM(node.id);
  };

  selectGrupaChange = (e) => {
    let newSelectedGrupa = Object.assign({}, this.state.selectedGrupa, {
      tatko_ID: e.target.value,
    });

    this.setState({ selectedGrupa: newSelectedGrupa });
  };

  nazivGrupaChange = (e) => {
    let newSelectedGrupa = Object.assign({}, this.state.selectedGrupa, {
      naziv: e.target.value,
    });

    this.setState({ selectedGrupa: newSelectedGrupa });
    console.log(newSelectedGrupa);
  };

  saveClick = (e) => {
    //alert(JSON.stringify(this.state.selectedGrupa));
    const grupa = this.state.selectedGrupa;
    if (!grupa) return;
    if (!grupa.naziv) return;
    //if(window.confirm('Сигурно ?')===false) return;
    this.setState({ isLoaded: false });
    let data = {
      Grupa_ID: grupa.grupa_ID,
      Naziv: grupa.naziv,
      Tatko_ID: grupa.tatko_ID,
    };
    fetch(Config.saveGrupaArtikal(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json; charset=utf-8",
      },
      body: Config.objToQueryString(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert( JSON.stringify( data ) );
        this.setState({
          isLoaded: true,
          selectedNode: data,
          grupiArtikli: data,
        });
        this.showMessage("Успешна промена.");
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        alert(err);
      });
  };

  addClick = (e) => {
    const naziv = prompt("Назив на групата ?", "");
    if (!naziv) return;

    const grupa = this.state.selectedGrupa;
    if (!grupa) return;
    //if(window.confirm('Сигурно ?')===false) return;
    this.setState({ isLoaded: false });
    let data = {
      Grupa_ID: 0,
      Naziv: naziv,
      Tatko_ID: grupa.grupa_ID,
    };
    //alert(JSON.stringify(data));
    fetch(Config.saveGrupaArtikal(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json; charset=utf-8",
      },
      body: Config.objToQueryString(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert( JSON.stringify( data ) );
        this.setState({
          isLoaded: true,
          selectedNode: data,
          grupiArtikli: data,
        });
        this.showMessage("Успешна додавање на нова група.");
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        alert(err);
      });
  };

  deleteClick = (e) => {
    //alert(JSON.stringify(this.state.selectedGrupa));
    const grupa = this.state.selectedGrupa;
    if (!grupa) return;
    if (grupa.grupa_ID === 0) return;
    if (window.confirm("СЛЕДУВА БРИШЕЊЕ !!! Дали сте сигурни ?") === false)
      return;
    this.setState({ isLoaded: false });
    let data = {
      Grupa_ID: grupa.grupa_ID,
    };
    fetch(Config.deleteGrupaArtikal(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json; charset=utf-8",
      },
      body: Config.objToQueryString(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert( JSON.stringify( data ) );
        this.setState({
          isLoaded: true,
          selectedNode: null,
          selectedGrupa: null,
          grupiArtikli: data,
        });
        this.showMessage("Успешно бришење.");
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        alert(err);
      });
  };

  render() {
    const { error, isLoaded, grupiArtikli, selectedGrupa } = this.state;
    let optionsGrupi = null;
    if (selectedGrupa) {
      optionsGrupi = selectedGrupa.listGrupi.map((o) => {
        return (
          <option value={o.grupa_ID} key={o.grupa_ID}>
            {o.naziv}
          </option>
        );
      });
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="container">
          <span className="display-4">
            Групи Артикли
            {isLoaded ? null : <img src={spinner} alt="Loading..." />}
          </span>
          {/*<button onClick={(e) => { this.props.history.push('/Comp1'); }}>назад</button>*/}

          <FlashMsg message={this.state.flashMsg} onHide={this.hideMessage} />

          <div className="row">
            <div className="col-sm-6">
              <Treebeard data={grupiArtikli} onToggle={this.onToggle} />
            </div>
            <div className="col-sm-6">
              {selectedGrupa ? (
                <div className="row">
                  <div className="col-xs-3">
                    <label className="control-label">
                      Група ID ({selectedGrupa.grupa_ID})
                    </label>
                  </div>
                  <div className="col-xs-7">
                    <input
                      className="form-control form-control-sm"
                      value={this.state.selectedGrupa.naziv}
                      onChange={this.nazivGrupaChange}
                      readOnly={selectedGrupa.tatko_ID === 0}
                    />
                  </div>
                  <div className="col-xs-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={this.addClick}
                    >
                      Додади
                    </button>
                  </div>
                </div>
              ) : null}
              {selectedGrupa && selectedGrupa.tatko_ID > 0 ? (
                <div className="row">
                  <label className="control-label col-md-3">Татко</label>
                  <select
                    className="form-control form-control-sm col-md-9"
                    value={this.state.selectedGrupa.tatko_ID}
                    onChange={this.selectGrupaChange}
                  >
                    {optionsGrupi}
                  </select>
                </div>
              ) : null}
              {selectedGrupa && selectedGrupa.tatko_ID > 0 ? (
                <div className="row">
                  <div className="col-md-3" />
                  <button
                    className="btn btn-sm btn-success col-md-3"
                    style={{ width: "100%" }}
                    onClick={this.saveClick}
                  >
                    Сними
                  </button>
                  <div className="col-md-3" />
                  <button
                    className="btn btn-sm btn-danger col-md-3"
                    style={{ width: "100%" }}
                    onClick={this.deleteClick}
                  >
                    Бриши!
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default GrupiArtikli;
