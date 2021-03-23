import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import DataGrid from 'react-data-grid';
import BarChart from 'react-bar-chart';
import { history } from '../../routes';
import Header from '../custom/Header';

import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { getSourceComplaintList } from '../../api/ApiService';
import { addSourceComplaintApi} from '../../api/ApiService';
import { updateSourceComplaintApi} from '../../api/ApiService';
import { deleteSourceComplaintApi} from '../../api/ApiService';
import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class SourceComplaint extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteSourceComplaint = this.deleteSourceComplaint.bind(this);
        this.gridOptionsSourceComplaint = {

        }
        this.state = {
            sourceComplaintList: null,
            isAddVisible: false,
            isAddVisible1: false
        }
    }

    deleteSourceComplaint = (id) => {
        deleteSourceComplaintApi(id).then((res) => {
            console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callSourceComplaintListApi()
            }
            else {
                showErrorToast("Something went wrong")
            }

        }).catch((err) => {
            console.log("Error is", err)
            showErrorToast("Something went wrong")
        })
    }

    componentWillMount() {
        let deleteSourceComplaint = this.deleteSourceComplaint
        let onEdit = (data) => {
            this.setState({
                isAddVisible: true,
                type: data.type,
                description: data.description,
                id: data.id
            })
        }
        this.columnDefs = [
            { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
            { headerName: "Type", field: "type", sortable: true, filter: true, width: 170 },
            { headerName: "Description", field: "description", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "id", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "id", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteSourceComplaint(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsSourceComplaint = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: this.columnDefs,

            defaultColDef: {
                // make every column editable
                editable: true,
                // make every column use 'text' filter by default
                filter: 'agTextColumnFilter',
                // make columns resizable
                resizable: true,
            },

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

    handleSubmit = (event) => {
        event.preventDefault();

        const { type, description } = this.state

        if (!type) {
            showWarningToast("Please enter source complaint");
            return
        }
        // let this is login response from server
        const params = {
            type: this.state.type,
            description: this.state.description,
            // desc: this.state.desc,
        }

        // this.calladdSourceComplaintApi(params)
        if (this.state.id) {
            this.callUdateSourceComplaintApi(this.state.id, params)
        } else {
            this.calladdSourceComplaintApi(params)
        }

    }

    callUdateSourceComplaintApi = (id, params) => {
        console.log("UPDATE_Source Complaint_API_PARAMS:" + JSON.stringify(params))

        updateSourceComplaintApi(id, params).then(res => {
        console.log("UPDATE Source Complaint STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    type: "",
                    description: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callSourceComplaintListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }

    calladdSourceComplaintApi = (params) => {
        console.log("ADD_Source_Complaint_API_PARAMS:" + JSON.stringify(params))

        addSourceComplaintApi(params).then(res => {
            console.log("ADD Source Complaint STATUS",JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    type: "",
                    description: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callSourceComplaintListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });

    }


    componentDidMount() {
        this.callSourceComplaintListApi()

    }

    callSourceComplaintListApi(){
        getSourceComplaintList().then(res=>{
            console.log("Source Complaint",JSON.stringify(res))
            this.setState({SourceComplaintList:res.data})
        })
    }


    renderSourceComplaintModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false, id: "" }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit Source Complaint" : "Add Source Complaint"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>Type</span>
                            <input
                                value={this.state.type}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="type" name="type" placeholder="Type" />
                        </div>
                        <div className="form-group">
                            <span>Description</span>
                            <input
                                value={this.state.description}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="description" name="description" placeholder="Description" />
                        </div>

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false }) }} className="mr10">
                        Close
                         </Button>
                         <Button type="submit" variant="primary" >
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div className="inner">
                    {this.renderSourceComplaintModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>SourceComplaint Information</h3>
                            </div>
                            <div className="col-md-12">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", SourceComplaint: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.SourceComplaintList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsSourceComplaint}
                                        rowData={this.state.SourceComplaintList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SourceComplaint);

