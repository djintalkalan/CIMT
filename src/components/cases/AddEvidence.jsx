import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
// import { history } from '../../routes';
// import Modal from 'react-bootstrap/Modal';
// import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getEvidenceListApi, addEvidenceApi, getCaseByIdApi, statusChangeApi } from '../../api/ApiService';
import { showSuccessToast, showErrorToast } from '../../utils/Utils';
import { localUrl } from '../../api/ApiConstants';


//Open console and perform an action on page


class AddEvidence extends Component {
    constructor(props) {
        super(props);
        // console.log("HISTORY:-", props.location.state.data)
        this.state = {
            rows: [],
            data: props.location.state.data
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmitEvidence = (e) => {
        e.preventDefault();
        // console.log("stateInfo", this.state);

        let form_data = new FormData();
        form_data.append('evidence_image', this.state.image);
        form_data.append('evidence_name', this.state.name);
        form_data.append('case_no', this.state.data);
        form_data.append('evidence_desc', this.state.imagedesc);
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        // console.log("Request Data", form_data);

        addEvidenceApi(form_data).then(res=>{
            // console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Evidence Added Successfully")
                this.callGetEvidenceApi()
            }
            else {
                showErrorToast(res.error)
            }
        })
        .catch(err => console.log(err))
    };

    handleSubmitChangeStatus = (e) => {
        e.preventDefault();

        const params = {
            status: this.state.changeStatus,
        }

        statusChangeApi(this.state.data, params).then(res=>{
            // console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Status Changed Successfully")
            }
            else {
                showErrorToast(res.error)
            }
        })
        .catch(err => console.log(err))
    };

    componentDidMount() {
        this.callGetEvidenceApi()
        this.callGetCaseByIdApi()

        // axios.get(`https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/GetAllEvidence/`+this.state.data.case_no)
        // .then(res => {
        //     console.log("GetEvidence", JSON.stringify(res))
        //     this.setState({ getEvidenceList: res.data.data })
        // })
    }

    callGetCaseByIdApi() {
        let case_id = this.state.data
        // console.log("Case id", this.state.data)
        // return
        getCaseByIdApi(case_id).then(res => {
            // console.log("Charge Sheet Data", JSON.stringify(res.data))
            this.setState({ chargeSheetData: res.data })
        })
    }

    callGetEvidenceApi() {
        let case_id = this.state.data
        getEvidenceListApi(case_id).then(res => {
            // console.log("Evidences", JSON.stringify(res))
            this.setState({ evidenceList: res.data })
        })
    }

    renderGetEvidenceList() {
        let { evidenceList } = this.state
        // console.log("evidenceList", this.state.evidenceList);

        if (evidenceList && evidenceList.length > 0)
            return (
                <div className="col-md-12">
                    <table className="table table-striped table-sm table-responsive customTable maxheight mt30">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Evidence Name</th>
                                <th scope="col">Evidence Description</th>
                                <th scope="col">Evidence Image</th>
                                <th scope="col">Status</th>
                                <th scope="col">Case No</th>
                                <th scope="col">Matching Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evidenceList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.evidence_name}</td>
                                    <td>{item.evidence_desc}</td>
                                    <td><a href={localUrl + item.evidence_image} target="_blank" >Image </a></td>
                                    <td><button className="btn btn-sm btn-success btn-small btn-custom-grid '{item.match_status ? 'btn-success' : 'btn-danger'}'">{item.match_status ? "Matched" : "Not Matched"}</button></td>
                                    <td>{item.case_no}</td>
                                    <td><a href={localUrl + item.matched_image} target="_blank" >Matched Image </a></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            )
    }


    render() {

        if(!this.state.chargeSheetData) return null
        const { case_identity, charged_officer, draft_article, draft_charge_sheets  } = this.state.chargeSheetData
        console.log("zzzzzzzzzz", { case_identity, charged_officer, draft_article, draft_charge_sheets })
        
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <div className="inner">
                        {/* <div className="row">
                            <div className="col-md-12">
                                {this.renderGetEvidenceList()}
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="evidenceCt mb30 px15">
                                <h5>Evidence collected</h5>
                                <div className="evidence-block mt20 px20">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                                <div className="evidence-block">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                                <div className="evidence-block">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                            </div>
                        </div> */}
                        <form
                            onSubmit={this.handleSubmitEvidence} >
                            <h5>Add Evidence</h5>
                            <div className="row">
                                
                                <div className="col-md-4 boxCt">
                                    <div className="inner">
                                        <span className="mr5">Case ID </span> : 
                                        <span className="ml5">{this.state.data}</span>
                                        {/* <input type="text" value={this.state.data.case_no} disabled name="caseno" /> */}
                                    </div>
                                </div>
                                <div className="col-md-4 boxCt">
                                    <div className="inner">
                                        {/* <span>File No.</span> */}
                                        <span className="mr5">File No. </span> : 
                                        <span className="ml5">{case_identity.file_number ? case_identity.file_number : "-"}</span>
                                        {/* <input type="text" value={this.state.data.file_number} disabled name="caseno" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <table className="tableCt">
                                        <tbody>
                                            <tr>
                                                <td className="px10">
                                                    <span>Choose Evidence</span>
                                                    <input type="file"
                                                        id="image" name="image"
                                                        accept="image/bmp, image/jpg, image/jpeg, image/png, image/tif, image/tiff, application/pdf, .tif" multiple className="form-control" onChange={this.handleImageChange} required />
                                                </td>
                                            </tr>
                                            <tr className="half">
                                                <td className="px10">
                                                <span>Name</span>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
                                                </td>
                                            </tr>
                                            <tr className="half">
                                                <td className="px10">
                                                <span>Description</span>
                                                    <input type="text" className="form-control" name="imagedesc" id="imagedesc" placeholder="Description" onChange={this.handleChange} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px10">
                                                    <button type="submit" className="btn btn-sm btn-success float-right mt10">Add Evidence</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>

                        <form
                            onSubmit={this.handleSubmitChangeStatus} >
                            <div className="row">
                                <div className="col-md-12 mt40">
                                    <table className="tableCt">
                                        <tbody>
                                            <tr className="half">
                                                <td className="px10">
                                                <span>Change Status</span>
                                                <select className="form-control" name="changeStatus" id="changeStatus"
                                                    onChange={this.handleChange}>
                                                    <option value="">Change Status</option>
                                                    <option value="ONGOING">Ongoing</option>
                                                    <option value="COMPLETE">Complete</option>
                                                </select>
                                                </td>
                                            </tr>
                                            <tr className="half">
                                                <td className="px10">
                                                <button type="submit" className="btn btn-sm btn-success float-right mt10">Change Status</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>

                        <div className="row">
                            <div className="col-md-12 mb30">
                                <h5 className="mt40 mb20">Evidence List</h5>

                                {this.renderGetEvidenceList()}
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb80">
                                <div className="reportCt">
                                    <h4 className="text-center mb20">Case Details</h4>
                                    <div className="inner-block mb30">
                                        <h5 className="title">Case Identity</h5>
                                        <div className="content">
                                            <div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">File No </span> : 
                                                    <span className="ml5">{case_identity.file_number ? case_identity.file_number : "-"}</span>
                                                </div>
                                            </div>
                                            <div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">File Year </span> : 
                                                    <span className="ml5">{case_identity.file_year ? case_identity.file_year : "-"}</span>
                                                </div>
                                            </div>
                                            <div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Office </span> : 
                                                    <span className="ml5">{case_identity.office ? case_identity.office.office_name : "-"}</span>
                                                </div>
                                            </div><div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Nature of Misconduct </span> : 
                                                    <span className="ml5">{case_identity.nature_of_misconduct ? case_identity.nature_of_misconduct.type : "-"}</span>
                                                </div>
                                            </div><div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Source of Complaint </span> : 
                                                    <span className="ml5">{case_identity.source_of_complaint ? case_identity.source_of_complaint.type : "-"}</span>
                                                </div>
                                            </div><div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Nature of complaint </span> : 
                                                    <span className="ml5">{case_identity.name_of_complainant ? case_identity.name_of_complainant : "-"}</span>
                                                </div>
                                            </div><div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Complaint Address</span> : 
                                                    <span className="ml5">{case_identity.complainant_address ? case_identity.complainant_address : "-"}</span>
                                                </div>
                                            </div><div className="boxCt">
                                                <div className="inner">
                                                    <span className="mr5">Attachment</span> : 
                                                    <span className="ml5"><a href={case_identity.case_identity_attachment ? localUrl + case_identity.case_identity_attachment : "#"} target="_blank" >Attachment </a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inner-block">
                                        <h5 className="title">Charged Officer</h5>
                                        <div className="content">
                                        <table className="table table-striped table-sm table-responsive customTable maxheight mt10">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Treasury Code</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Previous Charges</th>
                                                    <th scope="col">Attachment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {charged_officer && charged_officer.map((item, index) => (
                                                    <tr >
                                                        <td>{index + 1}</td>
                                                        <td>{item.user.first_name + " " + item.user.last_name}</td>
                                                        <td>{item.user.treasury_code}</td>
                                                        <td>{item.user.email}</td>
                                                        <td>{item.user.phone_no}</td>
                                                        <td>{item.previous_charges}</td>
                                                        <td><a href={localUrl + item.charged_officer_attachment} target="_blank">Attachment</a></td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    <div className="inner-block">
                                        <h5 className="title">Draft Charge Sheet Proposals</h5>
                                        <div className="content">
                                        <table className="table table-striped table-sm table-responsive customTable maxheight mt10">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">File RC No</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Submitted By</th>
                                                    <th scope="col">Submitted To</th>
                                                    <th scope="col">Subject in Brief</th>
                                                    <th scope="col">Attachment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {draft_charge_sheets && draft_charge_sheets.map((item, index) => (
                                                    <tr >
                                                        <td>{index + 1}</td>
                                                        <td>{item.file_rc_no}</td>
                                                        <td>{item.date}</td>
                                                        <td>{item.submitted_by}</td>
                                                        <td>{item.submitted_to}</td>
                                                        <td>{item.subject}</td>
                                                        <td><a href={localUrl + item.draft_charge_sheet_proposal_attachments} target="_blank">Attachment</a></td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    <div className="inner-block">
                                        <h5 className="title">Draft Article</h5>
                                        <div className="content">
                                        <table className="table table-striped table-sm table-responsive customTable maxheight mt10">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">Drafts Article Number</th>
                                                    <th scope="col">Date of Misconduct</th>
                                                    <th scope="col">Gist of Draft Articles</th>
                                                    <th scope="col">Misconduct Type</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Attachment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {draft_article && draft_article.map((item, index) => (
                                                    <tr >
                                                        <td>{index + 1}</td>
                                                        <td>{item.draft_article_no.article_no}</td>
                                                        <td>{item.date_of_misconduct}</td>
                                                        <td>{item.gist_of_article}</td>
                                                        <td>{item.misconduct_type.type}</td>
                                                        <td>{item.amount_involved_if_any}</td>
                                                        <td><a href={localUrl + item.draft_article_attachment} target="_blank">{item.draft_article_attachment ? "Attachment" : ""}</a></td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    <div className="inner-block">
                                        <h5 className="title">Preliminary Enquiry</h5>
                                        <div className="content">
                                        <table className="table table-striped table-sm table-responsive customTable maxheight mt10">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No.</th>
                                                    <th scope="col">Draft Article No.</th>
                                                    <th scope="col">Name of Charged Officer</th>
                                                    <th scope="col">Report Date</th>
                                                    <th scope="col">Office</th>
                                                    <th scope="col">Designation</th>
                                                    <th scope="col">Follow-Up Action</th>
                                                    <th scope="col">Report Conclusion</th>
                                                    <th scope="col">Attachment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {draft_article && draft_article.map((item, index) => (
                                                    item.preliminary_enquiries && item.preliminary_enquiries.map((item1, index1) => (
                                                        <tr >
                                                            <td>{index1 + 1}</td>
                                                            <td>{item.draft_article_no.article_no}</td>
                                                            <td>{item1.enquiry_officer}</td>
                                                            <td>{item1.report_date}</td>
                                                            <td>{item1.office}</td>
                                                            <td>{item1.designation}</td>
                                                            <td>{item1.follow_up_action}</td>
                                                            <td>{item1.report_conclusion_breif}</td>
                                                            <td><a href={localUrl + item1.preliminary_enquiry_attachment} target="_blank">{item.preliminary_enquiry_attachment ? "Attachment" : ""}</a></td>
                                                        </tr>
                                                    ))
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEvidence));

