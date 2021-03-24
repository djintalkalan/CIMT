import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";
import { getDesignationList, getMisconductList, getOfficesList, getRoleList, getSourceComplaintList, uploadImageApi, getUserList, addChargeSheetApi, getArticlesList } from '../../api/ApiService';
// import axios from 'axios';
import { isLoginAction, userDataAction, userTokenAction } from "../../redux/actions";
import { localUrl } from '../../api/ApiConstants';
import { showSuccessToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils';


//Open console and perform an action on page


class NewChargeSheet extends Component {
    constructor(props) {
        super(props);
        // console.log("HISTORY:-", props.location.state.data)
        this.state = {
            userList: null,
            isAddVisiblePreliminaryEnquiry: false,
            // isAddVisibleImputation: false,
            // isAddVisibleDocuments: false,
            // isAddVisibleWitness: false,
            chargeOfficerList: [],
            draftChargeList: [],
            draftArticleList: [],
            preliminaryInquiryList: []
            //     data: props.location.state.data
        }

        // this.gridOptionsVisibleEnquiry = {
        //     defaultColDef: {
        //         sortable: true,
        //         filter: true
        //     },
        //     columnDefs: [
        //         { headerName: "ID", field: "id", sortable: true, filter: true },
        //         { headerName: "Name", field: "name", sortable: true, filter: true },
        //         { headerName: "Description", field: "description", sortable: true, filter: true }],
        //     rowData: null,
        //     floatingFilter: true,
        //     pagination: true,
        //     paginationPageSize: 10
        // }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleImageChange = (e) => {
        this.setState({
            [e.target.id + "_file"]: e.target.files[0]
        })


    }

    handleSubmitNewChargeSheet = (e) => {
        e.preventDefault();
        // console.log("stateInfo", this.state);

        // const { file_no, file_year, case_office, nature_misconduct, source_complaint, nature_complaint, complainant_address, case_identity_attachment_desc } = this.state

        // if ((!file_no) || (!file_year) || (!case_office) || (!nature_misconduct) || (!source_complaint) || (!nature_complaint)) {
        //     showWarningToast("Please fill necessary fields")
        //     return
        // }

        let charged_officer = []

        this.state.chargeOfficerList.forEach(item => {
            let dat_charge_officer = {
                // first_name: item.charged_officer,
                // office: item.working_place,
                // designation: item.designation_imputation,
                user: item.user,
                // email: item.charged_officer_email,
                // phone: item.charged_officer_phone,
                previous_charges: item.charged_officer_previous_charges,
                charge_officer_attachment_desc: item.charge_officer_attachment_desc,
                charged_officer_attachment: item.charged_officer_case_attachment_file,
            }
            charged_officer.push(dat_charge_officer)

        })

        let draft_charge_sheets = []

        this.state.draftChargeList.forEach(item => {
            let dat_draft_charge = {
                file_rc_no: item.proposal_file_no,
                date: item.draft_charge_date,
                submitted_by: item.submitted_by,
                submitted_to: item.submitted_to,
                subject: item.subject_in_brief,
                draft_charge_sheets_attachment_desc: item.draft_charge_attachment_desc,
                draft_charge_sheet_proposal_attachments: item.draft_charge_case_attachment_file,
            }
            draft_charge_sheets.push(dat_draft_charge)

        })

        let draftArticle = []

        this.state.draftArticleList.forEach(item => {

            let preliminary_inquiry = []

            item.preliminary_inquiry.forEach(item2 => {
                let dat_prelimi_enq = {
                    enquiry_officer: item2.preliminary_charged_officer,
                    report_date: item2.preliminary_report_date,
                    office: item2.preliminary_office,
                    designation: item2.preliminary_designation,
                    report_conclusion_breif: item2.preliminary_report_conclusion,
                    follow_up_action: item2.preliminary_follow_up_action,
                    attachment_desc: item2.preliminary_attachment_desc,
                    preliminary_enquiry_attachment: item2.preliminary_attachment_file,
                }

                preliminary_inquiry.push(dat_prelimi_enq)
            })
            let dat_draft_article = {
                draft_article_no: item.drafts_article_number,
                date_of_misconduct: item.draft_misconduct_date,
                gist_of_article: item.gist_draft_article,
                misconduct_type: item.misconduct_type,
                amount_involved_if_any: item.amount_involved,
                draft_article_attachment_desc: item.draft_article_attachment_desc,
                draft_article_attachment: item.draft_article_attachment_file,
                preliminary_enquiries: preliminary_inquiry
            }
            draftArticle.push(dat_draft_article)

        })

        // alert(draftArticle)
        
        let params = {
            "case_identity": {
                "file_number": this.state.file_no,
                "file_year": this.state.file_year,
                "office": this.state.case_office,
                "nature_of_misconduct": this.state.nature_misconduct,
                "source_of_complaint": this.state.source_complaint,
                "name_of_complainant": this.state.nature_complaint,
                "complainant_address": this.state.complainant_address,
                "case_identity_attachment_desc": this.state.case_identity_attachment_desc,
                "case_identity_attachment": this.state.case_attachment_file
            },
            "charged_officer": charged_officer,
            "draft_charge_sheets": draft_charge_sheets,
            "draft_article": draftArticle
        }

        // let form_data = new FormData();
        // form_data.append('evidence_image', this.state.image, this.state.image.name);
        // form_data.append('evidence_name', this.state.name);
        // form_data.append('case_no', this.state.data.case_no);
        // form_data.append('evidence_desc', this.state.imagedesc);
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        // console.log("NewChargeSheetData", params);
        this.callChargeSheetApi(params)

    };

    callChargeSheetApi = (params) => {
        // console.log("ADD_CHARGE_SHEET_API_PARAMS:" + JSON.stringify(params))

        addChargeSheetApi(params).then(res => {
            // console.log("ADD CHARGE SHEET STATUS",JSON.stringify(res))
            // this.setState({addUserStatus:res.comment})
            if (res.success) {
                showSuccessToast("Charge Sheet Added Successfully")
                history.push('/cases')
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            // console.log(e);
            showSomethingWentWrong()
        });
    }

    componentDidMount() {
        this.callRoleListApi()
        this.callUserListApi()
        this.callOfficeListApi()
        this.callDesignationListApi()
        this.callNatureMisconductListApi()
        this.callSourceComplaintListApi()
        this.callArticlesListApi()

        // axios.get(`https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/GetAllEvidence/1`)
        // .then(res => {
        //     console.log("GetEvidence", JSON.stringify(res))
        //     this.setState({ getEvidenceList: res.data.data })
        // })
    }

    callRoleListApi() {
        getRoleList().then(res => {
            // console.log("Testing Mode", JSON.stringify(res))
            this.setState({ roleList: res.data })
        })
    }

    callUserListApi() {
        getUserList().then(res => {
            // console.log("USERS", JSON.stringify(res))
            this.setState({ userList: res.data })
        })
    }

    renderUserList(key) {
        const { userList } = this.state;
        if (userList && userList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    // value={this.state.key}
                    onChange={this.handleChange}>
                    <option value="">User</option>
                    {userList.map((item, index) => {
                        return (
                            <option selected={this.state + key ? "selected" : "false"} value={item.id}>{item.username}</option>
                        )
                    })}
                </select>
            )
    }

    callOfficeListApi() {
        getOfficesList().then(res => {
            // console.log("Offices", JSON.stringify(res))
            this.setState({ officeList: res.data })
        })
    }

    renderOfficeList(key) {
        const { officeList } = this.state;
        if (officeList && officeList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    value={this.state + key}
                    onChange={this.handleChange}>
                    <option value="">Select Office</option>
                    {officeList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.office_name}</option>
                        )
                    })}
                </select>
            )
    }

    callDesignationListApi(){
        getDesignationList().then(res=>{
            // console.log("DESIGNATIONS",JSON.stringify(res))
            this.setState({designationList:res.data})
        })
    }

    renderDesignationList(key) {
        const { designationList } = this.state;
        if (designationList && designationList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    value={this.state + key}
                    onChange={this.handleChange}>
                    <option value="">Select Designation</option>
                    {designationList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.designation}</option>
                        )
                    })}
                </select>
            )
    }

    callNatureMisconductListApi() {
        getMisconductList().then(res => {
            // console.log("NatureMisconduct:", JSON.stringify(res))
            this.setState({ natureMisconductList: res.data })
        })
    }

    renderNatureMisconductList(key) {
        const { natureMisconductList } = this.state;
        if (natureMisconductList && natureMisconductList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    value={this.state + key}
                    onChange={this.handleChange}>
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
            // console.log("SourceComplaint:", JSON.stringify(res))
            this.setState({ sourceComplaintList: res.data })
        })
    }

    renderSourceComplaintList(key) {
        const { sourceComplaintList } = this.state;
        if (sourceComplaintList && sourceComplaintList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    value={this.state + key}
                    onChange={this.handleChange}>
                    <option value="">Select Source</option>
                    {sourceComplaintList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.type}</option>
                        )
                    })}
                </select>
            )
    }

    callArticlesListApi() {
        getArticlesList().then(res => {
            // console.log("Articles:", JSON.stringify(res))
            this.setState({ articlesList: res.data })
        })
    }

    renderArticlesList(key) {
        const { articlesList } = this.state;
        if (articlesList && articlesList.length > 0)
            return (
                <select className="form-control" name={key} id={key}
                    value={this.state + key}
                    onChange={this.handleChange}>
                    <option value="">Select Article</option>
                    {articlesList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.article_no}</option>
                        )
                    })}
                </select>
            )
    }

    onClearOfficerChargeList = () => {
        // console.log("Charged Officer:", this.state.user)
        // return
        this.setState({
            // charged_officer: "",
            // working_place: "",
            // designation_imputation: "",
            user: "",
            // charged_officer_email: "",
            // charged_officer_phone: "",
            charged_officer_previous_charges: "",
            charged_officer_case_attachment_file: "",
        })
        return
    }

    onAddOfficerChargeList = () => {

        let { chargeOfficerList } = this.state
        // const { charged_officer, working_place, designation_imputation, charged_officer_email, charged_officer_phone } = this.state
        const { user, charge_officer_attachment_desc, charged_officer_previous_charges, charged_officer_case_attachment_file } = this.state

        // if (!charged_officer) {
        //     showWarningToast("Please Insert Charge Officer Name")
        //     return
        // }
        if (!user) {
            showWarningToast("Please Select User")
            return
        }
        const item = { user, charged_officer_previous_charges, charged_officer_case_attachment_file }

        chargeOfficerList.push(item)

        this.setState({
            chargeOfficerList: chargeOfficerList,
            // charged_officer: "",
            // working_place: "",
            // designation_imputation: "",
            user: "",
            // charged_officer_email: "",
            // charged_officer_phone: "",
            charged_officer_previous_charges: "",
            charge_officer_attachment_desc: "",
            charged_officer_case_attachment_file: "",
        })
        // this.state = {
        //     charged_officer: null,
        //     working_place: null,
        //     designation_imputation: null,
        //     user: null,
        //     charged_officer_email: null,
        //     charged_officer_phone: null,
        //     charged_officer_previous_charges: null,
        //     charged_officer_case_attachment_file: null,
        // }

    }

    renderchargeOfficerList() {
        let { chargeOfficerList } = this.state
        // console.log("chargeOfficerList", this.state.chargeOfficerList);
        // const { chargeOfficerList } = [{ id: this.state., name: "Deepak", description: "This is Description" }]

        // let chargeOfficerList = [{ id: 123, name: "Deepak", description: "This is Description" }]
        if (chargeOfficerList && chargeOfficerList.length > 0)
            return (
                <div className="col-md-12">
                    <div className="search_bar">
                        <font style={{ fontSize: 20 }}>List</font>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-striped table-sm table-responsive mt30">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    {/* <th scope="col">Charged Officer</th> */}
                                    {/* <th scope="col">Working Place of Imputation</th> */}
                                    {/* <th scope="col">Designation at Imputation</th> */}
                                    <th scope="col">User</th>
                                    {/* <th scope="col">Email</th> */}
                                    {/* <th scope="col">Phone Number</th> */}
                                    <th scope="col">Previous Charges</th>
                                    <th scope="col">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chargeOfficerList.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        {/* <td>{item.charged_officer}</td> */}
                                        {/* <td>{item.working_place}</td> */}
                                        {/* <td>{item.designation_imputation}</td> */}
                                        <td>{item.user}</td>
                                        {/* <td>{item.charged_officer_email}</td> */}
                                        {/* <td>{item.charged_officer_phone}</td> */}
                                        <td>{item.charged_officer_previous_charges}</td>
                                        <td><img height='20px' width='20px' src={item.charged_officer_case_attachment_file ? localUrl+item.charged_officer_case_attachment_file : null} /></td>
                                        <td><a onClick={() => {
                                            this.setState((prevState) => ({
                                                chargeOfficerList: [...prevState.chargeOfficerList.slice(0, index), ...prevState.chargeOfficerList.slice(index + 1)]
                                            }))
                                        }} className='btn btn-sm btn-danger' >Delete</a></td>
                                        {/* <a href="#" className="btn btn-sm btn-dark float-right mt10 btn-custom">Add to List</a> */}

                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            )
    }

    onAddDraftChargeList = () => {
        let { draftChargeList } = this.state
        const item = { proposal_file_no: this.state.proposal_file_no, draft_charge_date: this.state.draft_charge_date, submitted_by: this.state.submitted_by, submitted_to: this.state.submitted_to, subject_in_brief: this.state.subject_in_brief, draft_charge_attachment_desc: this.state.draft_charge_attachment_desc, draft_charge_case_attachment_file: this.state.draft_charge_case_attachment_file }

        draftChargeList.push(item)

        this.setState({
            draftChargeList: draftChargeList
        })

    }

    renderdraftChargeList() {
        let { draftChargeList } = this.state
        // console.log("stateInfo", this.state);
        // const { draftChargeList } = [{ id: this.state., name: "Deepak", description: "This is Description" }]

        // let draftChargeList = [{ id: 123, name: "Deepak", description: "This is Description" }]
        if (draftChargeList && draftChargeList.length > 0)
            return (
                <div className="col-md-12">
                    <div className="search_bar">
                        <font style={{ fontSize: 20 }}>List</font>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-striped table-sm table-responsive mt30">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Proposal File Rc No</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Submitted By</th>
                                    <th scope="col">Submitted To</th>
                                    <th scope="col">Subject in Brief</th>
                                    <th scope="col">Attachment Description</th>
                                    <th scope="col">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {draftChargeList.map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.proposal_file_no}</td>
                                        <td>{item.draft_charge_date}</td>
                                        <td>{item.submitted_by}</td>
                                        <td>{item.submitted_to}</td>
                                        <td>{item.subject_in_brief}</td>
                                        <td>{item.draft_charge_attachment_desc}</td>
                                        <td><img height='20px' width='20px' src={item.draft_charge_case_attachment_file ? localUrl+item.draft_charge_case_attachment_file : null} /></td>
                                        <td><a onClick={() => {
                                            this.setState((prevState) => ({
                                                draftChargeList: [...prevState.draftChargeList.slice(0, index), ...prevState.draftChargeList.slice(index + 1)]
                                            }))
                                        }} className='btn btn-sm btn-danger' >Delete</a></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            )
    }

    onAdddraftArticleList = () => {
        let { draftArticleList } = this.state
        const item = {
            drafts_article_number: this.state.drafts_article_number, draft_misconduct_date: this.state.draft_misconduct_date, gist_draft_article: this.state.gist_draft_article, misconduct_type: this.state.misconduct_type, amount_involved: this.state.amount_involved,
            draft_article_attachment_desc: this.state.draft_article_attachment_desc, draft_article_attachment_file: this.state.draft_article_attachment_file,
            preliminary_inquiry: this.state.preliminaryInquiryList
        }

        draftArticleList.push(item)

        this.setState({
            draftArticleList: draftArticleList,
            drafts_article_number: "",
            preliminaryInquiryList: []
        })

    }

    renderdraftArticleList() {
        let { draftArticleList } = this.state
        // console.log("stateInfo", this.state);
        // const { draftArticleList } = [{ id: this.state., name: "Deepak", description: "This is Description" }]

        // let draftArticleList = [{ id: 123, name: "Deepak", description: "This is Description" }]
        if (draftArticleList && draftArticleList.length > 0)
            return (
                <div className="col-md-12">
                    <div className="search_bar">
                        <font style={{ fontSize: 20 }}>List</font>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-striped table-sm table-responsive mt30">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Drafts Article No</th>
                                    <th scope="col">Date of Misconduct</th>
                                    <th scope="col">Gist of Draft Articles</th>
                                    <th scope="col">Misconduct Type</th>
                                    <th scope="col">Amount Involved</th>
                                    <th scope="col">Attachment Description</th>
                                    <th scope="col">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {draftArticleList.map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.drafts_article_number}</td>
                                        <td>{item.draft_misconduct_date}</td>
                                        <td>{item.gist_draft_article}</td>
                                        <td>{item.misconduct_type}</td>
                                        <td>{item.amount_involved}</td>
                                        <td>{item.draft_article_attachment_desc}</td>
                                        <td><img height='20px' width='20px' src={item.draft_article_attachment_file ? localUrl+item.draft_article_attachment_file : null} /></td>
                                        <td><a onClick={() => {
                                            this.setState((prevState) => ({
                                                draftArticleList: [...prevState.draftArticleList.slice(0, index), ...prevState.draftArticleList.slice(index + 1)]
                                            }))
                                        }} className='btn btn-sm btn-danger' >Delete</a></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            )
    }

    onAddPreliminaryInquiryList = () => {
        let { preliminaryInquiryList } = this.state
        const item = { preliminary_charged_officer: this.state.preliminary_charged_officer, preliminary_report_date: this.state.preliminary_report_date, preliminary_office: this.state.preliminary_office, preliminary_designation: this.state.preliminary_designation, preliminary_follow_up_action: this.state.preliminary_follow_up_action, preliminary_report_conclusion: this.state.preliminary_report_conclusion, preliminary_attachment_desc: this.state.preliminary_attachment_desc, preliminary_attachment_file: this.state.preliminary_attachment_file }

        preliminaryInquiryList.push(item)

        this.setState({
            preliminaryInquiryList: preliminaryInquiryList
        })

    }

    renderPreliminaryInquiryList() {
        let { preliminaryInquiryList } = this.state
        // console.log("stateInfo", this.state);
        // const { preliminaryInquiryList } = [{ id: this.state., name: "Deepak", description: "This is Description" }]

        // let preliminaryInquiryList = [{ id: 123, name: "Deepak", description: "This is Description" }]
        if (preliminaryInquiryList && preliminaryInquiryList.length > 0)
            return (
                <div className="col-md-12">
                    <div className="search_bar">
                        <font style={{ fontSize: 20 }}>List</font>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-striped table-sm table-responsive mt30">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Charged Officer</th>
                                    <th scope="col">Report Date</th>
                                    <th scope="col">Office</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Follow-Up Action</th>
                                    <th scope="col">Report Conclusion</th>
                                    <th scope="col">Attachment Description</th>
                                    <th scope="col">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preliminaryInquiryList.map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.preliminary_charged_officer}</td>
                                        <td>{item.preliminary_report_date}</td>
                                        <td>{item.preliminary_office}</td>
                                        <td>{item.preliminary_designation}</td>
                                        <td>{item.preliminary_follow_up_action}</td>
                                        <td>{item.preliminary_report_conclusion}</td>
                                        <td>{item.preliminary_attachment_desc}</td>
                                        <td><img height='20px' width='20px' src={item.preliminary_attachment_file ? localUrl+item.preliminary_attachment_file : null} /></td>
                                        <td><a onClick={() => {
                                            this.setState((prevState) => ({
                                                preliminaryInquiryList: [...prevState.preliminaryInquiryList.slice(0, index), ...prevState.preliminaryInquiryList.slice(index + 1)]
                                            }))
                                        }} className='btn btn-sm btn-danger' >Delete</a></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            )
    }

    uploadOnServer = (e)=> {
        // console.log("aaaaaa",e.target.files)
        const id = e.target.id

        // e.target.files[0]
        let formData1 = new FormData()
        formData1.append("image",e.target.files[0]);

        // for (var key of formData1.entries()) {
        //     console.log(key[0] , ', ' , key[1]);
        // }
           

        // console.log("Upload Image Data", JSON.stringify(formData1))

        uploadImageApi(formData1).then(res=>{
            // console.log("Upload Image Response" , res)

            this.setState({
            [id + "_file"]: res.data.url
        })
        })
    }


    render() {
        // console.log("State",this.state)
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <form className="mb60"
                        onSubmit={this.handleSubmitNewChargeSheet} >

                        <div className="inner customAccordion">

                            {this.renderVisiblePreliminaryEnquiry()}
                            {/* {this.renderVisibleImputation()} */}
                            {/* {this.renderVisibleDocuments()} */}
                            {/* {this.renderVisibleWitness()} */}

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
                                                        <input type="date"
                                                            id="file_year" name="file_year" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Office </span>
                                                        {/* <select className="form-control" name="case_office" id="case_office"
                                                            onChange={this.handleChange}>
                                                            <option value="">Select Office</option>
                                                            <option value="hisar">Hisar</option>
                                                            <option value="sirsa">Sirsa</option>
                                                            <option value="rohtak">Rohtak</option>
                                                            <option value="jind">Jind</option>
                                                        </select> */}
                                                        {this.renderOfficeList("case_office")}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Nature of Misconduct </span>
                                                        {/* <select className="form-control" name="nature_misconduct" id="nature_misconduct"
                                                            onChange={this.handleChange}>
                                                            <option value="">Misconduct</option>
                                                            <option value="demo">Demo</option>
                                                            <option value="test">Test</option>
                                                        </select> */}
                                                        {this.renderNatureMisconductList("nature_misconduct")}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Source of Complaint </span>
                                                        <select className="form-control" name="source_complaint" id="source_complaint"
                                                            onChange={this.handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="1">Phone</option>
                                                            <option value="2">Newspaper</option>
                                                            <option value="3">TV</option>
                                                        </select>
                                                        {/* {this.renderSourceComplaintList('source_complaint')} */}
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
                                                        <textarea name="complainant_address" id="complainant_address"className="form-control" onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title">Attachment If Any </span>
                                                        <textarea name="case_identity_attachment_desc" id="case_identity_attachment_desc" className="form-control" onChange={this.handleChange}></textarea>
                                                        <label className="custom-file-upload">
                                                            <input type="file"
                                                                // id="case_attachment" name="case_attachment" className="form-control" onChange={this.handleImageChange} />
                                                            id="case_attachment" name="case_attachment" className="form-control" onChange={this.uploadOnServer} />
                                                        </label>
                                                        {/* {this.state.case_attachment_file && <img height='80px' width='80px' src={URL.createObjectURL(this.state.case_attachment_file)} />} */}
                                                        {this.state.case_attachment_file && <img height='80px' width='80px' src={localUrl+this.state.case_attachment_file} />}
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
                                                {/* <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Name of Charged Officer </span>
                                                        <input type="text"
                                                            id="charged_officer" value={this.state.charged_officer} name="charged_officer" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Working Place of Imputation </span>
                                                        <select className="form-control" name="working_place" id="working_place"
                                                            onChange={this.handleChange}>
                                                            <option value="">Select Office</option>
                                                            <option value="hisar">Hisar</option>
                                                            <option value="sirsa">Sirsa</option>
                                                            <option value="rohtak">Rohtak</option>
                                                            <option value="jind">Jind</option>
                                                        </select>
                                                        {this.renderOfficeList()}
                                                    </div>
                                                </div> */}
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title required">User </span>
                                                        {/* <input type="text"
                                                            id="user" name="user" className="form-control" onChange={this.handleChange} required /> */}
                                                        {this.renderUserList("user")}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {/* <span className="title required">Designation at Imputation </span>
                                                        <select className="form-control" name="designation_imputation" id="designation_imputation"
                                                            onChange={this.handleChange}>
                                                            <option value="">Select Office</option>
                                                            <option value="si">S.I.</option>
                                                            <option value="sho">S.H.O.</option>
                                                            <option value="dsp">D.S.P.</option>
                                                        </select>
                                                        {this.renderDesignationList()} */}
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Email </span>
                                                        <input type="email"
                                                            id="charged_officer_email" name="charged_officer_email" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Phone Number </span>
                                                        <input type="text"
                                                            id="charged_officer_phone" name="charged_officer_phone" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                </div> */}
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title">Previous Charges if Any </span>
                                                        <textarea name="charged_officer_previous_charges" value={this.state.charged_officer_previous_charges} id="charged_officer_previous_charges" className="form-control" onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title">Attachment If Any </span>
                                                        <textarea name="charge_officer_attachment_desc" id="charge_officer_attachment_desc" value={this.state.charge_officer_attachment_desc} className="form-control" onChange={this.handleChange}></textarea>
                                                        <label className="custom-file-upload">
                                                            <input type="file"
                                                                id="charged_officer_case_attachment" name="charged_officer_case_attachment" value={this.state.charged_officer_case_attachment} className="form-control" onChange={this.uploadOnServer} />
                                                        </label>
                                                        {/* {this.state.charged_officer_case_attachment_file && <img height='80px' width='80px' src={URL.createObjectURL(this.state.charged_officer_case_attachment_file)} />} */}
                                                        {this.state.charged_officer_case_attachment_file && <img height='80px' width='80px' src={localUrl+this.state.charged_officer_case_attachment_file} />}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <a onClick={this.onClearOfficerChargeList} className="btn btn-sm btn-dark float-right mt10 ml10 btn-custom">Clear</a>
                                                        <a onClick={this.onAddOfficerChargeList} className="btn btn-sm btn-dark float-right mt10 btn-custom">Add to List</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* <div>
                                                        {<div className="ag-theme-balham mt20" style={{ height: 200, width: '100%' }}>
                                                            <AgGridReact
                                                                animateRows={true}
                                                                rowSelection="multiple"
                                                                //columnDefs={this.state.columnDefs}
                                                                gridOptions={this.gridOptionsVisibleEnquiry}
                                                                rowData={this.state.roleList}>
                                                            </AgGridReact>
                                                        </div>}
                                                    </div> */}
                                                {this.renderchargeOfficerList()}

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
                                                            id="draft_charge_date" name="draft_charge_date" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Submitted By </span>
                                                        {/* <select className="form-control" name="submitted_by" id="submitted_by"
                                                            onChange={this.handleChange}>
                                                            <option value="">Submitted By</option>
                                                            <option value="si">S.I.</option>
                                                            <option value="sho">S.H.O.</option>
                                                            <option value="dsp">D.S.P.</option>
                                                        </select> */}
                                                        {this.renderOfficeList("submitted_by")}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Submitted To</span>
                                                        {/* <select className="form-control" name="submitted_to" id="submitted_to"
                                                            onChange={this.handleChange}>
                                                            <option value="">Submitted To</option>
                                                            <option value="si">S.I.</option>
                                                            <option value="sho">S.H.O.</option>
                                                            <option value="dsp">D.S.P.</option>
                                                        </select> */}
                                                        {this.renderOfficeList("submitted_to")}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title required">Subject in Brief </span>
                                                        <textarea name="subject_in_brief" id="subject_in_brief" className="form-control" onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title required">Attachment If Any </span>
                                                        <textarea name="draft_charge_attachment_desc" id="draft_charge_attachment_desc" className="form-control" onChange={this.handleChange}></textarea>
                                                        <label className="custom-file-upload">
                                                            <input type="file"
                                                                // id="draft_charge_case_attachment" name="draft_charge_case_attachment" className="form-control" onChange={this.handleImageChange} 
                                                             id="draft_charge_case_attachment" name="draft_charge_case_attachment" className="form-control" onChange={this.uploadOnServer} />
                                                        </label>
                                                        {/* {this.state.draft_charge_case_attachment_file && <img height='80px' width='80px' src={URL.createObjectURL(this.state.draft_charge_case_attachment_file)} />} */}
                                                        {this.state.draft_charge_case_attachment_file && <img height='80px' width='80px' src={localUrl+this.state.draft_charge_case_attachment_file} />}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <a href="#" className="btn btn-sm btn-dark float-right mt10 ml10">Clear</a>
                                                        <a onClick={this.onAddDraftChargeList} className="btn btn-sm btn-dark float-right mt10 btn-custom">Add to List</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* <div className="col-md-12">
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
                                                </div> */}
                                                {this.renderdraftChargeList()}
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
                                                        {/* <select className="form-control" name="drafts_article_number" id="drafts_article_number"
                                                            onChange={this.handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="1">IPC 370</option>
                                                            <option value="2">IPC 302</option>
                                                            <option value="3">IPC 308</option>
                                                        </select> */}
                                                        {this.renderArticlesList('drafts_article_number')}
                                                        {/* <input type="text"
                                                            id="drafts_article_number" name="drafts_article_number" className="form-control" onChange={this.handleChange} required /> */}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Date of Misconduct </span>
                                                        <input type="date"
                                                            id="draft_misconduct_date" name="draft_misconduct_date" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title required">Gist of Draft Articles </span>
                                                        <textarea name="gist_draft_article" id="gist_draft_article" className="form-control" onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <span className="title required">Misconduct Type </span>
                                                        {/* <select className="form-control" name="misconduct_type" id="misconduct_type"
                                                            onChange={this.handleChange}>
                                                            <option value="">Misconduct Type</option>
                                                            <option value="theft">Theft</option>
                                                            <option value="rape">Rape</option>
                                                            <option value="murder">Murder</option>
                                                            <option value="torture">Torture</option>
                                                        </select> */}
                                                        {this.renderNatureMisconductList("misconduct_type")}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span className="title required">Amount Involved if Any</span>
                                                        <input type="number"
                                                            id="amount_involved" name="amount_involved" className="form-control" onChange={this.handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <span className="title required">Attachment If Any </span>
                                                        <textarea name="draft_article_attachment_desc" id="draft_article_attachment_desc" className="form-control" onChange={this.handleChange}></textarea>
                                                        <label className="custom-file-upload">
                                                            <input type="file"
                                                                id="draft_article_attachment" name="draft_article_attachment" className="form-control" onChange={this.uploadOnServer} />
                                                        </label>
                                                        {this.state.draft_article_attachment_file && <img height='80px' width='80px' src={localUrl+this.state.draft_article_attachment_file} />}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <a href="#" onClick={() => this.setState({ isAddVisiblePreliminaryEnquiry: true })} className="btn btn-info mr20 mb10">Add <br /> Preliminary Enquiry</a>
                                                        {/* <a href="#" onClick={() => this.setState({ isAddVisibleImputation: true })} className="btn btn-info mr20 mb10">Add <br /> Drafts Imputation</a>
                                                        <a href="#" onClick={() => this.setState({ isAddVisibleDocuments: true })} className="btn btn-info mr20 mb10">Add <br /> List of Documents</a>
                                                        <a href="#" onClick={() => this.setState({ isAddVisibleWitness: true })} className="btn btn-info mr20 mb10">Add <br /> List of Witness</a> */}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <a href="#" className="btn btn-sm btn-dark float-right ml10">Clear</a>
                                                        <a onClick={this.onAdddraftArticleList} className="btn btn-sm btn-dark float-right btn-custom">Add to List</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* <div className="col-md-12">
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
                                                </div> */}
                                                {this.renderdraftArticleList()}
                                            </div>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>

                        </div>
                        <div className="text-right mt20">
                            <Button className="btn btn-success mr10">Clear</Button>
                            {/* <Button className="btn btn-success mr10">Save Draft</Button> */}
                            <Button type="submit" className="btn btn-success">Submit</Button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }

    renderVisiblePreliminaryEnquiry() {
        return (
            <Modal show={this.state.isAddVisiblePreliminaryEnquiry} onHide={() => { this.setState({ isAddVisiblePreliminaryEnquiry: false }) }} dialogClassName="modal-90w custom" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton >
                    <Modal.Title>Preliminary Enquiry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="inner">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Name of Charged Officer </span>
                                    <input type="text"
                                        id="preliminary_charged_officer" name="preliminary_charged_officer" className="form-control" onChange={this.handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Report Date </span>
                                    <input type="date"
                                        id="preliminary_report_date" name="preliminary_report_date" className="form-control" onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Office </span>
                                    {/* <select className="form-control" name="preliminary_office" id="preliminary_office"
                                        onChange={this.handleChange}>
                                        <option value="">Select Office</option>
                                        <option value="hisar">Hisar</option>
                                        <option value="sirsa">Sirsa</option>
                                        <option value="rohtak">Rohtak</option>
                                        <option value="jind">Jind</option>
                                    </select> */}
                                    {this.renderOfficeList("preliminary_office")}
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Designation</span>
                                    {/* <select className="form-control" name="preliminary_designation" id="preliminary_designation"
                                        onChange={this.handleChange}>
                                        <option value="">Select Office</option>
                                        <option value="si">S.I.</option>
                                        <option value="sho">S.H.O.</option>
                                        <option value="dsp">D.S.P.</option>
                                    </select> */}
                                    {this.renderDesignationList("preliminary_designation")}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Follow-Up Action if any </span>
                                    <textarea name="preliminary_follow_up_action" id="preliminary_follow_up_action" className="form-control" onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Report Conclusion Brief </span>
                                    <textarea name="preliminary_report_conclusion" id="preliminary_report_conclusion" className="form-control" onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb20">
                                    <span className="title required">Attachment If Any </span>
                                    <textarea name="preliminary_attachment_desc" id="preliminary_attachment_desc" className="form-control" onChange={this.handleChange}></textarea>
                                    <label className="custom-file-upload">
                                        <input type="file"
                                            id="preliminary_attachment" name="preliminary_attachment" className="form-control" onChange={this.uploadOnServer} />
                                    </label>
                                    {this.state.preliminary_attachment_file && <img height='80px' width='80px' src={localUrl+this.state.preliminary_attachment_file} />}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <a href="#" className="btn btn-sm btn-dark float-right mt10 ml10">Clear</a>
                                    <a onClick={this.onAddPreliminaryInquiryList} className="btn btn-sm btn-dark float-right btn-custom mt10">Add to List</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-md-12">
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
                            </div> */}
                            {this.renderPreliminaryInquiryList()}
                        </div>

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisiblePreliminaryEnquiry: false }) }} className="mr10">
                            Close
                         </Button>
                        <Button variant="primary" onClick={() => { this.setState({ isAddVisiblePreliminaryEnquiry: false }) }}>
                            Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    // renderVisibleImputation() {
    //     return (
    //         <Modal show={this.state.isAddVisibleImputation} onHide={() => { this.setState({ isAddVisibleImputation: false }) }}>
    //             <Modal.Header closeButton >
    //                 <Modal.Title>Add User</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <form
    //                     onSubmit={this.handleSubmitRole} >
    //                     <div className="form-group">
    //                         <span>Role Name</span>
    //                         <input
    //                             value={this.state.rolename}
    //                             onChange={this.handleRolenameChange}
    //                             type="text" className="form-control" name="rolename" placeholder="Role Name" />
    //                     </div>
    //                     <div className="form-group">
    //                         <span>Role Description</span>
    //                         <input
    //                             value={this.state.roledesc}
    //                             onChange={this.handleRoledescChange}
    //                             type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
    //                     </div>

    //                     <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleImputation: false }) }} className="mr10">
    //                         Close
    //                      </Button>
    //                     <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleImputation: false }) }}>
    //                         Save Changes
    //                      </Button>
    //                 </form>
    //             </Modal.Body>
    //         </Modal>
    //     )
    // }

    // renderVisibleDocuments() {
    //     return (
    //         <Modal show={this.state.isAddVisibleDocuments} onHide={() => { this.setState({ isAddVisibleDocuments: false }) }}>
    //             <Modal.Header closeButton >
    //                 <Modal.Title>Add User</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <form
    //                     onSubmit={this.handleSubmitRole} >
    //                     <div className="form-group">
    //                         <span>Role Name</span>
    //                         <input
    //                             value={this.state.rolename}
    //                             onChange={this.handleRolenameChange}
    //                             type="text" className="form-control" name="rolename" placeholder="Role Name" />
    //                     </div>
    //                     <div className="form-group">
    //                         <span>Role Description</span>
    //                         <input
    //                             value={this.state.roledesc}
    //                             onChange={this.handleRoledescChange}
    //                             type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
    //                     </div>

    //                     <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleDocuments: false }) }} className="mr10">
    //                         Close
    //                      </Button>
    //                     <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleDocuments: false }) }}>
    //                         Save Changes
    //                      </Button>
    //                 </form>
    //             </Modal.Body>
    //         </Modal>
    //     )
    // }

    // renderVisibleWitness() {
    //     return (
    //         <Modal show={this.state.isAddVisibleWitness} onHide={() => { this.setState({ isAddVisibleWitness: false }) }}>
    //             <Modal.Header closeButton >
    //                 <Modal.Title>Add User</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <form
    //                     onSubmit={this.handleSubmitRole} >
    //                     <div className="form-group">
    //                         <span>Role Name</span>
    //                         <input
    //                             value={this.state.rolename}
    //                             onChange={this.handleRolenameChange}
    //                             type="text" className="form-control" name="rolename" placeholder="Role Name" />
    //                     </div>
    //                     <div className="form-group">
    //                         <span>Role Description</span>
    //                         <input
    //                             value={this.state.roledesc}
    //                             onChange={this.handleRoledescChange}
    //                             type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
    //                     </div>

    //                     <Button variant="secondary" onClick={() => { this.setState({ isAddVisibleWitness: false }) }} className="mr10">
    //                         Close
    //                      </Button>
    //                     <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisibleWitness: false }) }}>
    //                         Save Changes
    //                      </Button>
    //                 </form>
    //             </Modal.Body>
    //         </Modal>
    //     )
    // }

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

