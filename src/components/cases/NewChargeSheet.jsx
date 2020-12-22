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
import { getOfficeList } from '../../api/ApiService';
import { getNatureMisconductList } from '../../api/ApiService';
import { getSourceComplaintList } from '../../api/ApiService';
import { getDesignationList } from '../../api/ApiService';


//Open console and perform an action on page


class NewChargeSheet extends Component {
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

        this.gridOptionsVisibleWitness = {
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

    handleSubmitNewChargeSheet = (e) => {
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
        // let url = 'https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/NewChargeSheet/';
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
        this.callOfficeListApi()
        this.callNatureMisconductListApi()

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


    callOfficeListApi() {
        getOfficeList().then(res => {
            console.log("Offices", JSON.stringify(res))
            this.setState({ officeList: res.data })
        })
    }

    renderOfficeList() {
        const { officeList } = this.state;
        if (officeList && officeList.length > 0)
            return (
                <select className="form-control" name="office" id="office"
                    onChange={this.handleUserChange}>
                    <option value="">Select Office</option>
                    {officeList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.office_name}</option>
                        )
                    })}
                </select>
            )
    }

    callNatureMisconductListApi() {
        getNatureMisconductList().then(res => {
            console.log("NatureMisconduct:", JSON.stringify(res))
            this.setState({ natureMisconductList: res.data })
        })
    }

    renderNatureMisconductList() {
        const { natureMisconductList } = this.state;
        if (natureMisconductList && natureMisconductList.length > 0)
            return (
                <select className="form-control" name="nature_misconduct" id="nature_misconduct"
                    onChange={this.handleUserChange}>
                    <option value="">Select Misconduct</option>
                    {natureMisconductList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.type}</option>
                        )
                    })}
                </select>
            )
    }

    callSourceComplaintListApi() {
        getSourceComplaintList().then(res => {
            console.log("SourceComplaint:", JSON.stringify(res))
            this.setState({ sourceComplaintList: res.data })
        })
    }

    renderSourceComplaintList() {
        const { sourceComplaintList } = this.state;
        if (sourceComplaintList && sourceComplaintList.length > 0)
            return (
                <select className="form-control" name="source_complaint" id="source_complaint"
                    onChange={this.handleUserChange}>
                    <option value="">Select Misconduct</option>
                    {sourceComplaintList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.type}</option>
                        )
                    })}
                </select>
            )
    }

    callDesignationListApi() {
        getDesignationList().then(res => {
            console.log("Designation:", JSON.stringify(res))
            this.setState({ designationList: res.data })
        })
    }

    renderDesignationList() {
        const { designationList } = this.state;
        if (designationList && designationList.length > 0)
            return (
                <select className="form-control" name="designation" id="designation"
                    onChange={this.handleUserChange}>
                    <option value="">Select Misconduct</option>
                    {designationList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.type}</option>
                        )
                    })}
                </select>
            )
    }

   
    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <form className="mb60"
                        onSubmit={this.handleSubmitNewChargeSheet} >

                        <div className="inner customAccordion">

                        {this.renderVisibleEnquiry()}
                        {this.renderVisibleImputation()}
                        {this.renderVisibleDocuments()}
                        {this.renderVisibleWitness()}

                        <h5>Add New Case</h5>

                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Case Identity
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="inner">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">File No </span>
                                                    <input type="text"
                                                        id="file_no" name="file_no" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">File Year </span>
                                                    <input type="text"
                                                        id="file_year" name="file_year" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Office </span>
                                                    {/* <input type="text"
                                                        id="office" name="office" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderOfficeList()}
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Nature of Misconduct </span>
                                                    {/* <input type="text"
                                                        id="nature_misconduct" name="nature_misconduct" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderNatureMisconductList()}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Source of Complaint </span>
                                                    {/* <input type="text"
                                                        id="source_complaint" name="source_complaint" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderSourceComplaintList()}
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Nature of complaint </span>
                                                    <input type="text"
                                                        id="nature_complaint" name="nature_complaint" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Complaint Address </span>
                                                    <textarea name="complaint_address" className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Attachment If Any </span>
                                                    <textarea name="attachment_desc" className="form-control"></textarea>
                                                    <label className="custom-file-upload">
                                                        <input type="file"
                                                            id="case_attachment" name="case_attachment" className="form-control" onChange={this.handleChange} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Charged Officer
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <div className="inner">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Name of Charged Officer </span>
                                                    <input type="text"
                                                        id="charged_officer" name="charged_officer" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Working Place of Imputation </span>
                                                    {/* <input type="text"
                                                        id="place_working" name="place_working" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderOfficeList()}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Designation at Imputation </span>
                                                    {/* <input type="text"
                                                        id="designation" name="designation" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderDesignationList()}
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
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Draft Charge Sheet Proposals
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                        <div className="inner">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Proposal File Rc No. </span>
                                                    <input type="text"
                                                        id="proposal_file_no" name="proposal_file_no" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Date </span>
                                                    <input type="date"
                                                        id="date" name="date" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Submitted By </span>
                                                    {/* <input type="text"
                                                        id="submitted_by" name="submitted_by" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderOfficeList()}
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Submitted To</span>
                                                    {/* <input type="text"
                                                        id="submitted_to" name="submitted_to" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderOfficeList()}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Subject in Brief </span>
                                                    <textarea name="subject_in_brief" className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Attachment If Any </span>
                                                    <textarea name="attachment_desc2" className="form-control"></textarea>
                                                    <label className="custom-file-upload">
                                                        <input type="file"
                                                            id="drafts_attachment" name="drafts_attachment" className="form-control" onChange={this.handleChange} />
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
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        Draft Articles
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <div className="inner">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Drafts Article Number </span>
                                                    <input type="text"
                                                        id="drafts_article_number" name="drafts_article_number" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Date of Misconduct </span>
                                                    <input type="date"
                                                        id="date_misconduct" name="date_misconduct" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Gist of Draft Articles </span>
                                                    <textarea name="gist_draft_article" className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <span className="title required">Misconduct Type </span>
                                                    {/* <input type="text"
                                                        id="misconduct_type" name="misconduct_type" className="form-control" onChange={this.handleChange} required /> */}
                                                    {this.renderNatureMisconductList()}
                                                </div>
                                                <div className="col-md-6">
                                                <span className="title required">Amount Involved if Any</span>
                                                    <input type="text"
                                                        id="amount_involved" name="amount_involved" className="form-control" onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span className="title required">Attachment If Any </span>
                                                    <textarea name="attachment_desc2" className="form-control"></textarea>
                                                    <label className="custom-file-upload">
                                                        <input type="file"
                                                            id="drafts_attachment" name="drafts_attachment" className="form-control" onChange={this.handleChange} />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <a href="#" onClick={() => this.setState({ isAddVisibleEnquiry: true })} className="btn btn-info mr20 mb10">Add <br/> Preliminary Enquiry</a>
                                                    <a href="#" onClick={() => this.setState({ isAddVisibleImputation: true })} className="btn btn-info mr20 mb10">Add <br/> Drafts Imputation</a>
                                                    <a href="#" onClick={() => this.setState({ isAddVisibleDocuments: true })} className="btn btn-info mr20 mb10">Add <br/> List of Documents</a>
                                                    <a href="#" onClick={() => this.setState({ isAddVisibleWitness: true })} className="btn btn-info mr20 mb10">Add <br/> List of Witness</a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <a href="#" className="btn btn-sm btn-dark float-right ml10">Clear</a>
                                                    <a href="#" className="btn btn-sm btn-dark float-right">Add to List</a>
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
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        
                        </div>
                        <div className="text-right mt20">
                            <Button className="btn btn-success mr10">Clear</Button>
                            <Button className="btn btn-success mr10">Save Draft</Button>
                            <Button type="submit" className="btn btn-success">Submit</Button>
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }

    renderVisibleEnquiry() {
        return (
            <Modal show={this.state.isAddVisibleEnquiry} onHide={() => { this.setState({ isAddVisibleEnquiry: false }) }} dialogClassName="modal-90w custom" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton >
                    <Modal.Title>Preliminary Enquiry</Modal.Title>
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
                                <span className="title required">Report Date </span>
                                    <input type="date"
                                        id="report_date" name="report_date" className="form-control" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Office </span>
                                    {/* <input type="text"
                                        id="designation" name="designation" className="form-control" onChange={this.handleChange} required /> */}
                                    {this.renderOfficeList()}
                                </div>
                                <div className="col-md-6">
                                <span className="title required">Designation</span>
                                    {/* <input type="text"
                                        id="designation" name="designation" className="form-control" onChange={this.handleChange} required /> */}
                                    {this.renderDesignationList()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Follow-Up Action if any </span>
                                    <textarea name="follow_up_action" id="follow_up_action" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Report Conclusion Brief </span>
                                    <textarea name="report_conclusion" id="report_conclusion" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb20">
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

    renderVisibleImputation() {
        return (
            <Modal show={this.state.isAddVisibleImputation} onHide={() => { this.setState({ isAddVisibleImputation: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmitRole} >
                        <div className="form-group">
                            <span>Role Name</span>
                            <input
                                value={this.state.rolename}
                                onChange={this.handleRolenameChange}
                                type="text" className="form-control" name="rolename" placeholder="Role Name" />
                        </div>
                        <div className="form-group">
                            <span>Role Description</span>
                            <input
                                value={this.state.roledesc}
                                onChange={this.handleRoledescChange}
                                type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleImputation: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleImputation: false }) }}>
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderVisibleDocuments() {
        return (
            <Modal show={this.state.isAddVisibleDocuments} onHide={() => { this.setState({ isAddVisibleDocuments: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmitRole} >
                        <div className="form-group">
                            <span>Role Name</span>
                            <input
                                value={this.state.rolename}
                                onChange={this.handleRolenameChange}
                                type="text" className="form-control" name="rolename" placeholder="Role Name" />
                        </div>
                        <div className="form-group">
                            <span>Role Description</span>
                            <input
                                value={this.state.roledesc}
                                onChange={this.handleRoledescChange}
                                type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleDocuments: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleDocuments: false }) }}>
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderVisibleWitness() {
        return (
            <Modal show={this.state.isAddVisibleWitness} onHide={() => { this.setState({ isAddVisibleWitness: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmitRole} >
                        <div className="form-group">
                            <span>Role Name</span>
                            <input
                                value={this.state.rolename}
                                onChange={this.handleRolenameChange}
                                type="text" className="form-control" name="rolename" placeholder="Role Name" />
                        </div>
                        <div className="form-group">
                            <span>Role Description</span>
                            <input
                                value={this.state.roledesc}
                                onChange={this.handleRoledescChange}
                                type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleWitness: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleWitness: false }) }}>
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(NewChargeSheet);

