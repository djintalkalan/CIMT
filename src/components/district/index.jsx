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
import { getDistrictList } from '../../api/ApiService';
import { addDistrictApi} from '../../api/ApiService';
import { updateDistrictApi} from '../../api/ApiService';
import { deleteDistrictApi} from '../../api/ApiService';
import { showSuccessToast, showErrorToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class District extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteOffice = this.deleteOffice.bind(this);
        this.gridOptionsDistrict = {

        }
        this.state = {
            // officesList: null,
            districtList: null,
            isAddVisible: false,
            isAddVisible1: false
        }

    }
    deleteOffice = (id) => {
        deleteDistrictApi(id).then((res) => {
            // console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callDistrictListApi()
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
        let deleteOffice = this.deleteOffice
        let onEdit = (data) => {
            this.setState({
                isAddVisible: true,
                district: data.district,
                id: data.id
            })
        }
        this.columnDefs = [
            { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
            { headerName: "District", field: "district", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "district", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "district", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteOffice(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsDistrict = {
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

        const { district } = this.state

        if (!district) {
            showWarningToast("Please enter District");
            return
        }
        
        const params = {
            district: this.state.district,
            // desc: this.state.desc,
        }

        // this.calladdDistrictApi(params)
        if (this.state.id) {
            this.callUdateDistrictApi(this.state.id, params)
        } else {
            this.calladdDistrictApi(params)
        }
    }

    callUdateDistrictApi = (id, params) => {
        // console.log("UPDATE_DISTRICT_API_PARAMS:" + JSON.stringify(params))

        updateDistrictApi(id, params).then(res => {
        // console.log("UPDATE DISTRICT STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    district: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callDistrictListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            // console.log(e);
            showSomethingWentWrong()
        });
    }

    calladdDistrictApi = (params) => {
        // console.log("ADD_DISTRICT_API_PARAMS:" + JSON.stringify(params))

        addDistrictApi(params).then(res => {
            // console.log("ADD DISTRICT STATUS",JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    district: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callDistrictListApi()
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
         this.callDistrictListApi()

    }
    callDistrictListApi(){
        getDistrictList().then(res=>{
            // console.log("District",JSON.stringify(res))
            this.setState({districtList:res.data})
        })
    }


    renderDistrictModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit District" : "Add District"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>District name</span>
                            <input
                                value={this.state.district}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="district" name="district" placeholder="District" />
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
                        <Button type="submit" variant="primary">
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
                    {this.renderDistrictModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>District Information</h3>
                            </div>
                            <div className="col-md-12">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", district: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.districtList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsDistrict}
                                        rowData={this.state.districtList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(District);

