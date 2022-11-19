import React, { Component } from "react";

class OpisiArtikli extends Component {
  constructor(props) {
    super(props);
    //console.log('Opisi>');
    //console.log(props.ListOpisi);
    this.state = {
      opis: "",
      ListOpisi: props.ListOpisi,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      opis: "",
      ListOpisi: nextProps.ListOpisi,
    });
  }

  handleOpisChange(e) {
    //alert(e.target.value);
    if (e.target.value.length > 50) return false;
    this.setState({ opis: e.target.value });
    return true;
  }

  handleOpisAdd(e) {
    if (this.state.opis.length === 0) return;
    //alert(this.state.opis);
    this.props.handleOpisAdd(this.state.opis);
  }

  handleOpisDelete(val) {
    //alert(val);
    if (window.confirm("Сигутрно ?") === false) return;
    this.props.handleOpisDelete(val);
  }

  render() {
    let opisi = this.state.ListOpisi.map((o, i) => {
      return (
        <tr key={i}>
          <td>{o.Opis}</td>
          <td center="true">
            <button
              className="btn btn-outline-danger"
              onClick={(event) => {
                this.handleOpisDelete(o.Opis);
              }}
              title="Бриши опис..."
              data-toggle="tooltip"
            >
              <i className="fa fa-minus" />
            </button>
          </td>
        </tr>
      );
    });
    if (this.props.Artikal_ID === 0) {
      return <span />;
    }
    if (this.state.ListOpisi.length > 0) {
      return (
        <div>
          <h4>Описи</h4>
          <div style={{ maxHeight: 150, overflow: "auto" }}>
            <table className="table table-bordered table-hover table-responsive-sm table-sm">
              <tbody>
                <tr>
                  <td style={{ width: "95%" }}>
                    <input
                      type="text"
                      required={true}
                      className="form-control form-control-sm"
                      value={this.state.opis}
                      onChange={(event) => this.handleOpisChange(event)}
                      placeholder="опис..."
                    />
                  </td>
                  <td style={{ width: "5%" }}>
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.handleOpisAdd.bind(this)}
                      title="Додади опис..."
                      data-toggle="tooltip"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </td>
                </tr>
                {opisi}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Описи</h4>
          <table className="table table-bordered table-hover table-responsive-sm table-sm">
            <tbody>
              <tr>
                <td style={{ width: "95%" }}>
                  <input
                    type="text"
                    required={true}
                    className="form-control form-control-sm"
                    value={this.state.opis}
                    onChange={(event) => this.handleOpisChange(event)}
                    placeholder="опис..."
                  />
                </td>
                <td style={{ width: "5%" }}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={this.handleOpisAdd.bind(this)}
                    title="Додади опис..."
                    data-toggle="tooltip"
                  >
                    <i className="fa fa-plus" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default OpisiArtikli;
