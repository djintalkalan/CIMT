import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';

import { getUserList } from '../../api/ApiService';
import { getCaseList } from '../../api/ApiService';
import { addCaseApi } from '../../api/ApiService';

import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


//Open console and perform an action on page


class Cases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddCaseVisible: false,
            isAddEvidVisible: false,

            fir_no: '',
            case_no: '',
            name: '',
            address: '',
            user: '',
        }

        this.agGrid

        this.gridOptionsCase = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                { headerName: "FIR No", field: "fir_no", sortable: true, filter: true },
                { headerName: "Case No", field: "case_no", sortable: true, filter: true },
                { headerName: "Name", field: "name", sortable: true, filter: true },
                { headerName: "Address", field: "address", sortable: true, filter: true },
                {
                    headerName: "Action", field: "user_id", sortable: false, filter: false, cellRendererFramework: function (params) {
                        return <Button className="btn btn-sm btn-success btn-small" onClick={() => history.push('/addevidence', { data: params.data })} > Test </Button>
                    },
                }],
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

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmitEvidence = (e) => {
        e.preventDefault();
        console.log("stateInfo", this.state);

        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('userid', this.state.userid);
        form_data.append('case_no', this.state.case_no);
        form_data.append('imagedesc', this.state.imagedesc);
        for (var pair of form_data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        // console.log("Info", form_data);
        return
        // let url = 'http://localhost:8000/api/posts/';
        // axios.post(url, form_data, {
        //   headers: {
        //     'content-type': 'multipart/form-data'
        //   }
        // })
        //     .then(res => {
        //       console.log(res.data);
        //     })
        //     .catch(err => console.log(err))
    };

    handleFirNoChange = (event) => {
        this.setState({ fir_no: event.target.value })
    }

    handleCaseNoChange = (event) => {
        this.setState({ case_no: event.target.value })
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleAddressChange = (event) => {
        this.setState({ address: event.target.value })
    }

    handleUserChange = (event) => {
        this.setState({ user: event.target.value })
    }

    handleSubmitCase = (e) => {
        const params = {
            fir_no: this.state.fir_no,
            case_no: this.state.case_no,
            name: this.state.name,
            address: this.state.address,
            user: this.state.user,
        }

        this.callAddCaseApi(params)

        event.preventDefault();
    };

    callAddCaseApi = (params) => {
        console.log("ADD_CASE_API_PARAMS:" + JSON.stringify(params))

        addCaseApi(params).then(res => {
            console.log("ADD CASE STATUS", JSON.stringify(res))
            // this.setState({ addCaseStatus: res.addcase }, () => {
            //     let caseList = this.state.caseList;
            //     caseList.push({
            //         "case_no": parseInt(params.case_no),
            //         "created_date": "",
            //         "fir_no": parseInt(params.fir_no),
            //         "name": params.name,
            //         "address": params.address,
            //         "user_id": params.user
            //     })
            //     console.log("CASE_LIST:", caseList)
            //     this.setState({ caseList })
            //     this.agGrid.setRowData(caseList);
            // })

            // history.push('/cases')
        });


    }

    componentDidMount() {
        this.callUserListApi()
        this.callCaseListApi()
    }

    callUserListApi() {
        getUserList().then(res => {
            console.log("USERS", JSON.stringify(res))
            this.setState({ userList: res.data })
        })
    }

    callCaseListApi() {
        getCaseList().then(res => {
            console.log("CASES", JSON.stringify(res))
            this.setState({ caseList: res.data })
        })
    }


    renderCaseModal() {
        return (
            <Modal show={this.state.isAddCaseVisible} onHide={() => { this.setState({ isAddCaseVisible: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add Case</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmitCase} >
                        <div className="form-group">
                            <span>FIR No.</span>
                            <input type="text"
                                onChange={this.handleFirNoChange}
                                className="form-control" name="fir_no" id="fir_no" placeholder="Enter FIR No." />
                        </div>
                        <div className="form-group">
                            <span>Case No.</span>
                            <input type="text"
                                onChange={this.handleCaseNoChange}
                                className="form-control" name="case_no" id="case_no" placeholder="Enter Case No." />
                        </div>
                        <div className="form-group">
                            <span>Name</span>
                            <input type="text"
                                onChange={this.handleNameChange}
                                className="form-control" name="name" id="name" placeholder="Enter Name." />
                        </div>
                        <div className="form-group">
                            <span>Select User</span>
                            {this.renderUserList()}
                        </div>
                        <div className="form-group">
                            <span>Address</span>
                            <textarea type="text"
                                onChange={this.handleAddressChange}
                                className="form-control" name="address" id="address" placeholder="Enter Address"></textarea>
                        </div>

                        <Button variant="secondary" onClick={() => { this.setState({ isAddCaseVisible: false }) }} className="mr10">
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddCaseVisible: false }) }}>
                            Save Changes
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderUserList() {
        const { userList } = this.state;
        if (userList && userList.length > 0)
            return (
                <select className="form-control" name="user"
                    onChange={this.handleUserChange}
                    id="user">
                    <option value="">Please Select User</option>
                    {userList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.username}</option>
                        )
                    })}
                </select>
            )
    }

    // onGridReady(params) {
    //     const rowData = this.state.caseList;

    //     this.agGrid = params.api;

    //     if (rowData.length > 0 && this.agGrid) {
    //         this.agGrid.setRowData(rowData);
    //     }
    // }

    render() {
        console.log("caseList", JSON.stringify(this.state.caseList))
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">

                        {this.renderCaseModal()}
                        {/* {this.renderEvidenceModal()} */}

                        <div className="firCt mb10">
                            <button onClick={() => this.setState({ isAddCaseVisible: true })} className="btn btn-sm btn-success">Add Case</button>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.userList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    {/* <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        gridOptions={this.gridOptionsCase}
                                        deltaRowDataMode={true}
                                        onGridReady={(params) => this.onGridReady(params)}
                                        getRowNodeId={data => data.fir_no}>
                                    </AgGridReact> */}
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsCase}
                                        rowData={this.state.caseList}>
                                    </AgGridReact>
                                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cases);

