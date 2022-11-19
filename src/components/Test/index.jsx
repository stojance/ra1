import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Config from './../../config';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            queryOptions: {
                CurrentPage: 0,
                Filter: '',
                PageSize: 0,
                Sort: '',
                SortField: '',
                SortOrder: '',
                TotalPages: 0
            },
            items: []
        };

        // This binding is necessary to make `this` work in the callback
        this.handlePageDown = this.handlePageDown.bind(this);
        this.handlePageUp = this.handlePageUp.bind(this);
    }

    

    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        console.log(queryParams.get('query'));
        const state = this.props.location.state;
        console.log(state);

        this.fetchArtikli();
    }

    getArtikliUrl = () => {
        //console.log(this.state.queryOptions);
        if(this.state.queryOptions && this.state.queryOptions.TotalPages > 0){
            return Config.artikliGet() + '?' + Config.objToQueryString(this.state.queryOptions);
        } else {
            return Config.artikliGet();     
        }
    }

    handlePageUp() {
        let qo = this.state.queryOptions;
        if(qo.CurrentPage < qo.TotalPages) {
            qo.CurrentPage = qo.CurrentPage + 1;
        }
        
        this.setState({
            queryOptions: qo
        });

        this.fetchArtikli();
    }

    handlePageDown() {
        let qo = this.state.queryOptions;
        if(qo.CurrentPage > 1) {
            qo.CurrentPage = qo.CurrentPage - 1;
        }
        
        this.setState({
            queryOptions: qo
        });

        this.fetchArtikli();
    }

    fetchArtikli = () => {
        fetch(this.getArtikliUrl())
            .then(res =>{
               //console.log(this.getArtikliUrl());
                //console.log(res.json());
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        queryOptions: result.QueryOptions,
                        items: result.Results
                    });
                    //console.log(this.state);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        queryOptions: {},
                        items: [],
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner />;
        } else {
            return (
                <div>
                <ul>
                    {items.map( item => 
                        <li key={item.Artikal_ID}>
                            {item.Naziv} {item.Edm}
                        </li>
                    )}
                </ul>
                <button onClick={this.handlePageDown} className="btn btn-primary" disabled={this.state.queryOptions.CurrentPage === 1}>
                    <i className="fa fa-angle-double-left" />
                </button>
                <button onClick={this.handlePageUp} className="btn btn-primary" disabled={this.state.queryOptions.CurrentPage === this.state.queryOptions.TotalPages}>
                    <i className="fa fa-angle-double-right" />
                </button>
                </div>
            );
        }
    }
}

export default Test;
