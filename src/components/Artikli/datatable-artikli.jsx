import React, { Component } from "react";
import { PropTypes } from 'prop-types';

class DataTableArtikli extends Component {

  render() {
    return (
      <TableArtikli>
        <Headings
          headings={this.props.headings}
          headClick={this.props.headClick}
        />
        <Rows
          items={this.props.items}
          rowEditClick={this.props.rowEditClick}
          rowDeleteClick={this.props.rowDeleteClick}
        />
      </TableArtikli>
    );
  }
}

DataTableArtikli.propTypes = {
    headings: PropTypes.array.isRequired,
    headClick: PropTypes.func,
    items: PropTypes.array,
    rowEditClick: PropTypes.func,
    rowDeleteClick: PropTypes.func
}

class TableArtikli extends Component {

  render() {
    return (
      <table className="table table-striped table-bordered table-hover table-responsive-sm table-sm">
        {this.props.children}
      </table>
    );
  }
}

class Heading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SortOrder: 0,
    };

    this.headClick.bind(this);
  }

  headClick(id) {
    const so = this.state.SortOrder === 0 ? 1 : 0;
    this.setState({ SortOrder: so });
    this.props.headClick(id);
  }

  render() {
    return (
      <th style={{ textAlign: "center" }}>
        {this.props.heading.id !== "" ? (
          <a
            href="#"
            onClick={() => {
              this.headClick(this.props.heading.id);
            }}
          >
            {this.props.heading.naziv}
            {this.state.SortOrder === 0 ? (
              <span className="fa fa-sort-down"></span>
            ) : (
              <span className="fa fa-sort-up"></span>
            )}
          </a>
        ) : (
          this.props.heading.naziv
        )}
      </th>
    );
  }
}

class Headings extends Component {
    
  render() {
    let headings = this.props.headings.map((name, i) => (
      <Heading heading={name} key={i} headClick={this.props.headClick} />
    ));
    return (
      <thead>
        <tr>{headings}</tr>
      </thead>
    );
  }
}

Headings.propTypes = {
    headings: PropTypes.array
}


class Row extends Component {
  handleChangeChk = () => {
    return false;
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.Artikal_ID}</td>
        <td>{this.props.item.Naziv}</td>
        <td>{this.props.item.Naziv1}</td>
        <td>{this.props.item.Edm}</td>
        <td>
          <input
            type="checkbox"
            checked={this.props.item.Aktiven}
            onChange={this.handleChangeChk}
          />
        </td>
        <td>{this.props.item.GrupaNaziv}</td>
        <td>
          <button
            onClick={() => this.props.rowEditClick(this.props.item.Artikal_ID)}
            className="btn btn-outline-dark btn-sm float-left"
            style={{ flex: 1, width: "45%" }}
            title="Промени ..."
            data-toggle="tooltip"
          >
            <i className="fa fa-edit" />
          </button>
          <button
            onClick={() =>
              this.props.rowDeleteClick(this.props.item.Artikal_ID)
            }
            className="btn btn-outline-danger btn-sm float-right"
            style={{ flex: 1, width: "45%" }}
            title="Бриши! ..."
            data-toggle="tooltip"
          >
            <i className="fa fa-eraser" />
          </button>
        </td>
      </tr>
    );
  }
}

Row.propTypes = {
    item: PropTypes.object
}

class Rows extends Component {
  
  render() {
    let rows = this.props.items.map((row, i) => (
      <Row
        item={row}
        key={i}
        rowEditClick={this.props.rowEditClick}
        rowDeleteClick={this.props.rowDeleteClick}
      />
    ));
    return <tbody>{rows}</tbody>;
  }
}

Rows.propTypes = {
    items: PropTypes.array.isRequired,
    rowEditClick: PropTypes.func,
    rowDeleteClick: PropTypes.func
}

export default DataTableArtikli;
