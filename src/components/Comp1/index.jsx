import React, { Component } from 'react';
import logo from './logo.svg';
import './Comp1.css';
import { PropTypes } from 'prop-types';
import Merac from './../Merac';
import FlashMsg from '../FlashMsg';
import TestList from '../test-list';
class Comp1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVal: 1,
      selectedVals: [],
      errors: [],
      options:[
        {
          val: 1,
          text: 'Еден'
        },
        {
          val: 2,
          text: 'Два'
        },
        {
          val: 3,
          text: 'Три'
        },
        {
          val: 4,
          text: 'Четири'
        }
      ],
      podatoci: {},
      message: ""
    };
    this.selectChange = this.selectChange.bind(this);
    this.selectChange2 = this.selectChange2.bind(this);
  }

  selectChange(e) {
    this.setState({selectedVal: e.target.value});
    //alert(e.target.value);
  }

  selectChange2(e) {
    this.setState({selectedVal: e});
    //alert(e);
  }

  validateForm() {
    this.setState({errors: []});
    let err = [];
    if(this.state.selectedVals.length === 0) {
      err.push('Мора да изберете барем еднa опција !');
    }
    if(this.state.selectedVal === 1) {
      err.push('Не смеете да го избирате "Еден" !');
    }

    this.setState({errors: err});
    return err.length === 0? true: false;
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    if(this.validateForm()) {
      let fd = {
        selectedVal: this.state.selectedVal,
        selectedVals: this.state.selectedVals
      };
      if(this.props.updateFormData) {
        this.props.updateFormData(fd);    
      }else{
        //alert(JSON.stringify(fd));
        this.setState({message: JSON.stringify(fd)});
      }
    }
  }

  handleSelectedOptions(e) {
    const val = e.target.value;
    let selectedVals = this.state.selectedVals;
    const index = selectedVals.indexOf(val);
    if(index === -1) {
      selectedVals.push(val);
    } else {
      selectedVals.splice(index,1);
    }
    this.setState({selectedVals: selectedVals});
  }

  _renderError() {
    if(this.state.errors.length > 0) {
      let err = this.state.errors.map(e => {
        return (
          <li>{e}</li>
        );
      });
      return (
        <div className="alert alert-danger">
          <ul>
            {err}
          </ul>
        </div>
      );
    }
  }
  
  podatociChange = (podatoci) => {  
    this.setState({
      podatoci,
      message: JSON.stringify(podatoci)
    });

  }

  messageHide = () => this.setState({message:''});

  render() {

    let errorMessage = this._renderError();
    let options = this.state.options.map(o => <option value={o.val} key={o.val}>{o.text}</option> );
    let chkBoxes = this.state.options.map(o => {
      return (
        <div className="checkbox" key={o.val}>
          <label>
            <input type="checkbox" value={o.val} onChange={this.handleSelectedOptions.bind(this)}/>
            {o.val} -- {o.text}
          </label>
        </div>
      );
    });

    return (
      <div className="Comp1">
        <header className="Comp1-header">
          <img src={logo} className="Comp1-logo" alt="logo" />
          <h1 className="Comp1-title">Welcome to React</h1>
        </header>
        <p className="Comp1-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {this.props.test}
        </p>
        {errorMessage}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p>
              <select className="form-control" value={this.state.selectedVal} onChange={this.selectChange}>
                {options}
              </select>
          </p>
          <MySelect options={this.state.options} selectedValue={this.state.selectedVal} onChage={this.selectChange2} />
          
          {chkBoxes}
          
          <input type="submit" className="btn btn-success" value="Ok" />
        </form>
        <Merac onChange={this.podatociChange}></Merac>
        <p>{JSON.stringify(this.state.podatoci)}</p>
        <FlashMsg message={this.state.message} onHide={this.messageHide} />
        <TestList />
      </div>
    );
  }
}

function MySelect({options, selectedValue, onChage}) {
  return (
    <select className="form-control" value={selectedValue} onChange={(e) => onChage(e.target.value)}>
      {options.map(o=><option value={o.val} key={o.val}>{o.text}</option>)}
    </select>
  );
}

MySelect.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.number,
  onChange: PropTypes.func
}

export default Comp1;
