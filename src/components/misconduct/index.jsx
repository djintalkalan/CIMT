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
import { getMisconductList, addMisconductApi, updateMisconductApi, deleteMisconductApi } from '../../api/ApiService';

import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class Misconduct extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteMisconduct = this.deleteMisconduct.bind(this);
        this.gridOptionsMisconduct = {

        }
        this.state = {
            misconductList: null,
            isAddVisible: false,
            isAddVisible1: false
        }
    }

    deleteMisconduct = (id) => {
        deleteMisconductApi(id).then((res) => {
            // console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callmisconductListApi()
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
        let deleteMisconduct = this.deleteMisconduct
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
            { headerName: "Misconduct Type", field: "type", sortable: true, filter: true, width: 170 },
            { headerName: "Misconduct Desc", field: "description", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "type", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "type", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteMisconduct(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsMisconduct = {
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
            showWarningToast("Please enter Misconduct Type");
            return
        }
        // let this is login response from server
        const params = {
            type: this.state.type,
            description: this.state.description,
            // desc: this.state.desc,
        }

        // this.calladdMisconductApi(params)
        if (this.state.id) {
            this.callUdateMisconductApi(this.state.id, params)
        } else {
            this.calladdMisconductApi(params)
        }

    }

    callUdateMisconductApi = (id, params) => {
        // console.log("UPDATE_MISCONDUCT_API_PARAMS:" + JSON.stringify(params))

        updateMisconductApi(id, params).then(res => {
        // console.log("UPDATE MISCONDUCT STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    type: "",
                    description: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callmisconductListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }

    calladdMisconductApi = (params) => {
        // console.log("ADD_MISCONDUCT_API_PARAMS:" + JSON.stringify(params))

        addMisconductApi(params).then(res => {
            // console.log("ADD MISCONDUCT STATUS",JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    type: "",
                    description: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callmisconductListApi()
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
        this.callmisconductListApi()

    }

    callmisconductListApi(){
        getMisconductList().then(res=>{
            // console.log("MISCONDUCT",JSON.stringify(res))
            this.setState({misconductList:res.data})
        })
    }


    renderMisconductModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false, id: "" }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit Misconduct" : "Add Misconduct"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>Misconduct Type</span>
                            <input
                                value={this.state.type}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="type" name="type" placeholder="Type" />
                        </div>
                        <div className="form-group">
                            <span>Misconduct Description</span>
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
                    {this.renderMisconductModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>Misconduct Type</h3>
                            </div>
                            <div className="col-md-12 mb10">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", type: "", description: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.misconductList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsMisconduct}
                                        rowData={this.state.misconductList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Misconduct);

