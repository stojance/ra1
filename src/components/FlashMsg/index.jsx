import React from 'react';
import PropTypes from "prop-types";


class FlashMsg extends React.Component {
  timeout = 4000;

  componentWillReceiveProps(nextProps) {
    if(nextProps.message === '' ||  nextProps.message === this.props.message){
      return;
    }
    clearTimeout(this.varTiemOut);
    if (nextProps.autoDisappear) {
      this.varTiemOut = window.setTimeout(() => {
        this.onClick();
      }, this.props.timeout || this.timeout);
    }
  }
  
  componentWillUnmount()  {
    clearTimeout(this.varTiemOut);
  }

  onClick = (e) => {
      if(this.props.onHide) {
        this.props.onHide();
      }
  }

  render() {
    const myStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 99999
    };
    
    return (
      this.props.message &&
        <div className="flash-container" id="flash-component" style={myStyle}>
          <div className="alert alert-primary" role="alert">
            <a className="close alert-close" onClick={this.onClick}>X</a>
            <hr style={{marginTop:25}} />
            <div className="text-center">
              <span className="display-4">
                {this.props.message}
              </span>
            </div>
          </div>
        </div>
    );
  }
}

FlashMsg.propTypes = {
  autoDisappear: PropTypes.bool,
  timeout: PropTypes.number,
  onHide: PropTypes.func
};

FlashMsg.defaultProps = {
  autoDisappear: true,
  timeout: 4000
};

export default FlashMsg;