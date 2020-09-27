import React, { Component } from 'react';
// import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { getRoleList } from '../../api/ApiService';


//Open console and perform an action on page


class ChargeSheet extends Component {
    constructor(props) {
        super(props);
        // console.log("HISTORY:-", props.location.state.data)
       this.state = {
            userList: null,
            isAddVisibleEnquiry: false,
            isAddVisibleImputation: false,
            isAddVisibleDocuments: false,
            isAddVisibleWitness: false,
            //     data: props.location.state.data
        }

        this.gridOptionsVisibleEnquiry = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                { headerName: "ID", field: "id", sortable: true, filter: true },
                { headerName: "Name", field: "name", sortable: true, filter: true },
                { headerName: "Description", field: "description", sortable: true, filter: true }],
            rowData: null,
            floatingFilter: true,
            pagination: true,
            paginationPageSize: 10
        }

        this.gridOptionsVisibleImputation = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                { headerName: "ID", field: "id", sortable: true, filter: true },
                { headerName: "Name", field: "name", sortable: true, filter: true },
                { headerName: "Description", field: "description", sortable: true, filter: true }],
            rowData: null,
            floatingFilter: true,
            pagination: true,
            paginationPageSize: 10
        }

        this.gridOptionsVisibleDocuments = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                { headerName: "ID", field: "id", sortable: true, filter: true },
                { headerName: "Name", field: "name", sortable: true, filter: true },
                { headerName: "Description", field: "description", sortable: true, filter: true }],
            rowData: null,
            floatingFilter: true,
            pagination: true,
            paginationPageSize: 10
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmitChargeSheet = (e) => {
        e.preventDefault();
        // console.log("stateInfo", this.state);

        // let form_data = new FormData();
        // form_data.append('evidence_image', this.state.image, this.state.image.name);
        // form_data.append('evidence_name', this.state.name);
        // form_data.append('case_no', this.state.data.case_no);
        // form_data.append('evidence_desc', this.state.imagedesc);
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        // console.log("Info", form_data);
        // return
        // let url = 'https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/ChargeSheet/';
        // axios.post(url, form_data, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => console.log(err))
    };

    componentDidMount() {
        this.callRoleListApi()

        // axios.get(`https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/GetAllEvidence/1`)
        // .then(res => {
        //     console.log("GetEvidence", JSON.stringify(res))
        //     this.setState({ getEvidenceList: res.data.data })
        // })
    }

    callRoleListApi(){
        getRoleList().then(res=>{
            console.log("Testing Mode",JSON.stringify(res))
            this.setState({roleList:res.data})
        })
    }

    renderVisibleEnquiry() {
        return (
            <Modal show={this.state.isAddVisibleEnquiry} onHide={() => { this.setState({ isAddVisibleEnquiry: false }) }} dialogClassName="modal-90w custom" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmitRole} >
                        <div className="inner">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Name of Charged Officer </span>
                                    <input type="text"
                                        id="charged_officer" name="charged_officer" className="form-control" onChange={this.handleChange} required />
                                </div>
                                <div className="col-md-6">
                                <span className="title required">Working Place of Imputation</span>
                                    <input type="text"
                                        id="place_working" name="place_working" className="form-control" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Designation at Imputation </span>
                                    <input type="text"
                                        id="designation" name="designation" className="form-control" onChange={this.handleChange} required />
                                </div>
                                <div className="col-md-6">
                                <span className="title required">Officer Treasury Code</span>
                                    <input type="text"
                                        id="officer_treasury_code" name="officer_treasury_code" className="form-control" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Email </span>
                                    <input type="text"
                                        id="email" name="email" className="form-control" onChange={this.handleChange} required />
                                </div>
                                <div className="col-md-6">
                                <span className="title required">Phone Number </span>
                                    <input type="text"
                                        id="phone" name="phone" className="form-control" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Previous Charges if Any </span>
                                    <textarea name="previous_charges" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Attachment If Any </span>
                                    <textarea name="attachment_desc1" className="form-control"></textarea>
                                    <label className="custom-file-upload">
                                        <input type="file"
                                            id="charged_officer_case_attachment" name="charged_officer_case_attachment" className="form-control" onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <a href="#" className="btn btn-sm btn-dark float-right mt10 ml10">Clear</a>
                                    <a href="#" className="btn btn-sm btn-dark float-right mt10">Add to List</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    {<div className="ag-theme-balham mt20" style={{ height: 200, width: '100%' }}>
                                        <AgGridReact
                                            animateRows={true}
                                            rowSelection="multiple"
                                            //columnDefs={this.state.columnDefs}
                                            gridOptions={this.gridOptionsVisibleEnquiry}
                                            rowData={this.state.roleList}>
                                        </AgGridReact>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleEnquiry: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleEnquiry: false }) }}>
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <form className="mb60"
                        onSubmit={this.handleSubmitChargeSheet} >

                        <div className="inner customAccordion">

                        {this.renderVisibleEnquiry()}

                        <h5>Charge Sheet</h5>

                            <Accordion>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Cases Pending for Issue of Charge Memo
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div>
                                                    {<div className="ag-theme-balham mt20" style={{ height: 200, width: '100%' }}>
                                                        <AgGridReact
                                                            animateRows={true}
                                                            rowSelection="multiple"
                                                            //columnDefs={this.state.columnDefs}
                                                            gridOptions={this.gridOptionsVisibleEnquiry}
                                                            rowData={this.state.roleList}>
                                                        </AgGridReact>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Cases Returned for further Clarification
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div>
                                                    {<div className="ag-theme-balham mt20" style={{ height: 200, width: '100%' }}>
                                                        <AgGridReact
                                                            animateRows={true}
                                                            rowSelection="multiple"
                                                            //columnDefs={this.state.columnDefs}
                                                            gridOptions={this.gridOptionsVisibleEnquiry}
                                                            rowData={this.state.roleList}>
                                                        </AgGridReact>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        Cases Rejected for Various Reasons
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div>
                                                    {<div className="ag-theme-balham mt20" style={{ height: 200, width: '100%' }}>
                                                        <AgGridReact
                                                            animateRows={true}
                                                            rowSelection="multiple"
                                                            //columnDefs={this.state.columnDefs}
                                                            gridOptions={this.gridOptionsVisibleEnquiry}
                                                            rowData={this.state.roleList}>
                                                        </AgGridReact>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log("Redux State:", JSON.stringify(state))
    return {
        userDataReducer: state.userDataReducer,
        isLoginReducer: state.isLoginReducer,
        userTokenReducer: state.userTokenReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userDataAction: payload => dispatch(userDataAction(payload)),
        isLoginAction: payload => dispatch(isLoginAction(payload)),
        userTokenAction: payload => dispatch(userTokenAction(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChargeSheet);

