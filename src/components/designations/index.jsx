import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import 'react-tabs/style/react-tabs.css';
// import DataGrid from 'react-data-grid';
// import BarChart from 'react-bar-chart';
// import { history } from '../../routes';
// import Header from '../custom/Header';

import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { getDesignationList } from '../../api/ApiService';
import { addDesignationApi} from '../../api/ApiService';
import { updateDesignationApi} from '../../api/ApiService';
import { deleteDesignationApi} from '../../api/ApiService';
import { showSuccessToast, showErrorToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class Designations extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteDesignation = this.deleteDesignation.bind(this);
        this.gridOptionsDesignation = {

        }
        this.state = {
            designationList: null,
            isAddVisible: false,
            isAddVisible1: false
        }
    }

    deleteDesignation = (id) => {
        deleteDesignationApi(id).then((res) => {
            // console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callDesignationListApi()
            }
            else {
                showErrorToast("Something went wrong")
            }

        }).catch((err) => {
            // console.log("Error is", err)
            showErrorToast("Something went wrong")
        })
    }

    componentWillMount() {
        let deleteDesignation = this.deleteDesignation
        let onEdit = (data) => {
            this.setState({
                isAddVisible: true,
                designation: data.designation,
                id: data.id
            })
        }
        this.columnDefs = [
            { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
            { headerName: "Designation", field: "designation", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "designation", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "designation", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteDesignation(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsDesignation = {
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

        const { designation } = this.state

        if (!designation) {
            showWarningToast("Please enter designation");
            return
        }
        // let this is login response from server
        const params = {
            designation: this.state.designation,
            // desc: this.state.desc,
        }

        // this.calladdDesignationApi(params)
        if (this.state.id) {
            this.callUdateDesignationsApi(this.state.id, params)
        } else {
            this.calladdDesignationApi(params)
        }

    }

    callUdateDesignationsApi = (id, params) => {
        // console.log("UPDATE_Designations_API_PARAMS:" + JSON.stringify(params))

        updateDesignationApi(id, params).then(res => {
        // console.log("UPDATE Designations STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    designation: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callDesignationListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            // console.log(e);
            showSomethingWentWrong()
        });
    }

    calladdDesignationApi = (params) => {
        // console.log("ADD_DESIGNATIONS_API_PARAMS:" + JSON.stringify(params))

        addDesignationApi(params).then(res => {
            // console.log("ADD DESIGNATIONS STATUS",JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    designation: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callDesignationListApi()
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
        this.callDesignationListApi()

    }

    callDesignationListApi(){
        getDesignationList().then(res=>{
            // console.log("DESIGNATIONS",JSON.stringify(res))
            this.setState({designationList:res.data})
        })
    }


    renderDesignationModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false, id: "" }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit Designation" : "Add Designation"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>Designation Name</span>
                            <input
                                value={this.state.designation}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="designation" name="designation" placeholder="Name" />
                        </div>
                        {/* <div className="form-group">
                            <span>Description</span>
                            <input
                                value={this.state.desc}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="description" name="description" placeholder="Description" />
                        </div> */}

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
                    {this.renderDesignationModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>Designation Information</h3>
                            </div>
                            <div className="col-md-12">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", designation: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.designationList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsDesignation}
                                        rowData={this.state.designationList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Designations);

