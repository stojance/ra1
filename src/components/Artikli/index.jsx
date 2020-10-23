
import React, { Component } from 'react';
import { PageUp, PageDown } from '../PageUpDown';
import FlashMsg from '../FlashMsg';
import Config from './../../config';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import DataTableArtikli from './datatable-artikli';
import FormArtikli from './form-artikli';
import withAuth from './../auth/withAuth';
import MySpinner from './../MySpinner/MySpinner';

class Artikli extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            error: null,
            isLoaded: false,
            queryOptions: {
                CurrentPage: 0,
                Filter: '',
                PageSize: 0,
                Sort: '',
                SortField: '',
                SortOrder: 'ASC',
                TotalPages: 0
            },
            items: [],
            flash_msg: null,
            modal_open: false,
            selectedArtikal_ID: 0,
            formData: {}
        };

        // This binding is necessary to make `this` work in the callback
        this.handlePageDown = this.handlePageDown.bind(this);
        this.handlePageUp = this.handlePageUp.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleAddArtikalClick = this.handleAddArtikalClick.bind(this);
        this.handleEditArtikalClick = this.handleEditArtikalClick.bind(this);
        this.handleDeleteArtikalClick = this.handleDeleteArtikalClick.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {
        
        /*if(this.props.auth.loggedIn()===false){
            //console.log(':(');
            this.props.history.push('/Login');
            return;
        }*/ 
        
        this.fetchArtikli();
    }

    getArtikliUrl() {
        //console.log(this.state.queryOptions);
        if (this.state.queryOptions && this.state.queryOptions.TotalPages > 0) {
            return Config.artikliGet() + '?' + Config.objToQueryString(this.state.queryOptions);
        } else {
            return Config.artikliGet();
        }
    }

    handlePageUp() {
        let qo = this.state.queryOptions;
        if (qo.CurrentPage < qo.TotalPages) {
            qo.CurrentPage = qo.CurrentPage + 1;
        }

        this.setState({
            queryOptions: qo
        });

        this.fetchArtikli();
    }

    handlePageDown() {
        let qo = this.state.queryOptions;
        if (qo.CurrentPage > 1) {
            qo.CurrentPage = qo.CurrentPage - 1;
        }

        this.setState({
            queryOptions: qo
        });

        this.fetchArtikli();
    }

    handleHeadClick(h) {
        //alert(h);
        
        let qo = this.state.queryOptions;
        qo.SortField = h;
        console.log(qo);
        if(qo.SortOrder === 0){
            qo.SortOrder=1;
        } else {
            qo.SortOrder=0;
        }
        console.log(qo);
        this.setState({
            queryOptions: qo
        });

        this.fetchArtikli();
    }

    handleFilter(e) {
        let qo = this.state.queryOptions;
        qo.Filter = e.target.value;
        this.setState({
            queryOptions: qo
        });
        this.fetchArtikli();
    }

    showMessage(msg) {
        this.setState({
            flash_msg: msg
        });
        setTimeout(()=>this.hideMessage(),4000);
    }

    hideMessage() {
        this.setState({
            flash_msg: null
        });
    }

    handleAddArtikalClick(e) {
        this.setState({formData: {}});
        this.setState({
            selectedArtikal_ID: 0,
            modal_open: true
        });
        //this.showMessage("Hello :)");
        /*let goto = {
            pathname: '/Test',
            search: '?query=abc',
            state: { Artikal_ID: 0 }
        };
        this.props.history.push(goto);*/
    }

    handleEditArtikalClick(id) {
        console.log(id);
        this.setState({formData: {}});
        this.setState({
            selectedArtikal_ID: id,
            modal_open: true
        });
        /*let goto = {
            pathname: '/Test',
            search: '?query=abc',
            state: { Artikal_ID: id }
        };
        this.props.history.push(goto);*/
    }

    handleDeleteArtikalClick(id) {
        //console.log(id);
        if(window.confirm('Сигурно ?')===false) return;
        this.setState({isLoaded: true, formData: {}});
        let data = {
            id: id
        };
        fetch(Config.deleteArtikal(),
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept':'application/json; charset=utf-8'
            },
            body: Config.objToQueryString(data)
        })
        .then((res) => { return res.json(); })
        .then((data) => { 
            //alert( JSON.stringify( data ) ); 
            this.fetchArtikli();
            this.showMessage("Успечно бришење на артикалот со ID: "+ id);
        })
        .catch((err) => {
            this.setState({isLoaded: true});
            alert(err);
        });
    }

    
    fetchArtikli() {
        this.setState({isLoaded: false});
        fetch(this.getArtikliUrl())
            .then(res => {
                //console.log(this.getArtikliUrl());
                //console.log(res.json());
                return res.json();
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
                (error) => {
                    this.setState({
                        isLoaded: true,
                        queryOptions: {},
                        items: [],
                        error
                    });
                }
            );
    }

    openModal() {
        //this.setState({modal_open: true});
        this.showMessage("1234");
    }

    closeModal() {
        this.fetchArtikli();
        this.setState({modal_open: false});
    }

    handleFormData(formData) {
        let new_form_data = Object.assign({}, this.state.formData, formData);
        this.setState({formData: new_form_data, modal_open: false});
        
    }

    handleArtikalFormData(formData) {
        let new_form_data = Object.assign({}, this.state.formData, formData);
        this.setState({formData: new_form_data, modal_open: false});
        this.showMessage(JSON.stringify(formData));
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const modal_style = {
            closeButton: {
                cursor: 'pointer'
            },
            modal: {
                //background: '#b2dbbf',
                maxWidth: '1024px',
                width: '100%'
            }
        };
        const listHeadings = [
            {
                id:'Artikal_ID',
                naziv: 'АртикалID'
            },
            {
                id:'Naziv',
                naziv: 'Назив'
            },
            {
                id:'Naziv1',
                naziv: 'Скратен назив'
            },
            {
                id:'Edm',
                naziv: 'Едм'
            },
            {
                id:'Aktiven',
                naziv: 'Активен'
            },
            {
                id:'GrupaNaziv',
                naziv: 'Група'
            },
            {
                id:'',
                naziv: 'Акција'
            }
        ];
        //["АртикалID", "Назив", "Скратен назив", "Едм", "Активен", "Група", "Акција"]
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div className="container">
                    <span className="display-4">Артикли</span>
                    {/*<button onClick={(e) => { this.props.history.push('/Comp1'); }}>назад</button>*/}
                    {!isLoaded && <MySpinner />}
                    <FlashMsg message={this.state.flash_msg} onHide={this.hideMessage} />
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.handleAddArtikalClick}
                                className="btn btn-outline-primary btn-sm"
                                style={{ flex: 1 }}
                                title="Креирај нов ..." data-toggle="tooltip"
                            >
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <div className="col-md-11">

                            <input type="text" placeholder="барај..."
                                value={this.state.queryOptions.Filter}
                                onChange={this.handleFilter}
                                className="form-control form-control-sm" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <DataTableArtikli
                                headings = {listHeadings}
                                headClick = {this.handleHeadClick.bind(this)}
                                items = {items} 
                                rowEditClick = {this.handleEditArtikalClick} 
                                rowDeleteClick = {this.handleDeleteArtikalClick}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <PageDown handleClick={this.handlePageDown}
                                isDisabled={this.state.queryOptions.CurrentPage === 1} 
                            />
                        </div>
                        <div className="col-md-6">
                            <PageUp handleClick={this.handlePageUp}
                                isDisabled={this.state.queryOptions.CurrentPage === this.state.queryOptions.TotalPages} 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <Modal open={this.state.modal_open} onClose={this.closeModal.bind(this)} center styles={modal_style}>
                            <FormArtikli 
                                Artikal_ID={this.state.selectedArtikal_ID} 
                                updateFormData={this.handleArtikalFormData.bind(this)} 
                                showMessage={this.showMessage}
                            />
                        </Modal>
                    </div>    
                </div>
            );
        }
    }
}


export default withAuth(Artikli, false, true);
