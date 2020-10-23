import React from 'react';
import PropTypes from "prop-types";


class FlashMsg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      autoDisappear: this.props.autoDisappear,
      timeout: this.props.timeout
    };
    //console.log(props.autoDisappear)
    this.onClick = this.onClick.bind(this);
  }

  
  componentWillReceiveProps(nextProps) {

    this.setState({
      message: nextProps.message,
      autoDisappear: nextProps.autoDisappear,
      timeout: nextProps.timeout
    });
    //console.log(nextProps.autoDisappear)
    if (nextProps.autoDisappear) {
      window.setTimeout(() => {
        this.onClick();
      }, this.state.timeout);
    }
  }
  

  onClick(e) {
    if(this.state.message) {
      console.log(this.state.timeout);
      this.setState({
        message: null
      });

      if(this.props.onHide){
        this.props.onHide();
      }
    }
  }

  render() {
    if (this.state.message) {
      return (

        <div className="flash-container" id="flash-component">
          <div className="alert alert-primary" role="alert">
            <a className="close alert-close" onClick={this.onClick}>x</a>
            {this.state.message}
          </div>
        </div>

      );
    } else {
      return <span />;
    }
  }

}

FlashMsg.propTypes = {
  message: PropTypes.string
};

FlashMsg.defaultProps = {
  autoDisappear: true,
  timeout: 2500
};

export default FlashMsg;