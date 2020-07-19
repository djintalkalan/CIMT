import React, { Component } from 'react';
// import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


//Open console and perform an action on page


class NewChargeSheet extends Component {
    constructor(props) {
        super(props);
        // console.log("HISTORY:-", props.location.state.data)
        // this.state = {
        //     rows: [],
        //     data: props.location.state.data
        // }

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
        // this.callGetEvidenceApi()

        // axios.get(`https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/GetAllEvidence/1`)
        // .then(res => {
        //     console.log("GetEvidence", JSON.stringify(res))
        //     this.setState({ getEvidenceList: res.data.data })
        // })
    }

   
    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <div className="inner customAccordion">
                        <form
                            onSubmit={this.handleSubmitNewChargeSheet} >
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
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span className="required">File No </span>
                                                <input type="text"
                                                    id="image" name="file_no" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                            <div className="col-md-6">
                                            <span className="required">File Year </span>
                                                <input type="text"
                                                    id="image" name="file_year" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span className="required">Office </span>
                                                <input type="text"
                                                    id="image" name="office" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                            <div className="col-md-6">
                                            <span className="required">Nature of Misconduct </span>
                                                <input type="text"
                                                    id="image" name="nature_misconduct" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span className="required">Source of Complaint </span>
                                                <input type="text"
                                                    id="image" name="source_complaint" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                            <div className="col-md-6">
                                            <span className="required">Nature of complaint </span>
                                                <input type="text"
                                                    id="image" name="nature_complaint" className="form-control" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span className="required">Complaint Address </span>
                                                <textarea name="complaint_address" className="form-control"></textarea>
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
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Draft Charge Sheet Proposals
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </form>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewChargeSheet);

