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
import { getOfficesList, deleteOfficesApi } from '../../api/ApiService';
import { addOfficesApi } from '../../api/ApiService';
import { updateOfficesApi } from '../../api/ApiService';
import { getDistrictList } from '../../api/ApiService';
import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class Offices extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteOffice = this.deleteOffice.bind(this);
        this.gridOptionsOffices = {

        }
        this.state = {
            officesList: null,
            districtList: null,
            isAddVisible: false,
            isAddVisible1: false
        }

    }
    deleteOffice = (id) => {
        deleteOfficesApi(id).then((res) => {
            console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callOfficesListApi()
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
        let deleteOffice = this.deleteOffice
        let onEdit = (data) => {
            this.setState({
                isAddVisible: true,
                office_name: data.office_name,
                office_address: data.office_address,
                district: data.district_id,
                id: data.id
            })
        }
        this.columnDefs = [
            { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
            { headerName: "Office Name", field: "office_name", sortable: true, filter: true, width: 170 },
            { headerName: "Office Address", field: "office_address", sortable: true, filter: true, width: 170 },
            { headerName: "District", field: "district_id", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "offices", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "offices", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteOffice(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsOffices = {
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

        const { office_name, office_address, district } = this.state

        if (!office_name) {
            showWarningToast("Please enter name");
            return
        }
        if (!office_address) {
            showWarningToast("Enter office address ");
            return
        }
        if (!district) {
            showWarningToast("Enter district");
            return
        }
        // let this is login response from server
        const params = {
            office_name: this.state.office_name,
            office_address: this.state.office_address,
            district: this.state.district,
            // id: this.state.id || null
        }

        // this.calladdOfficesApi(params)

        if (this.state.id) {
            this.callUdateOfficesApi(this.state.id, params)
        } else {
            this.calladdOfficesApi(params)
        }

    }

    callUdateOfficesApi = (id, params) => {
        console.log("UPDATE_OFFICES_API_PARAMS:" + JSON.stringify(params))

        updateOfficesApi(id, params).then(res => {
        console.log("UPDATE OFFICES STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    office_name: "",
                    office_address: "",
                    district: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callOfficesListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }

    calladdOfficesApi = (params) => {
        console.log("ADD_OFFICES_API_PARAMS:" + JSON.stringify(params))

        addOfficesApi(params).then(res => {
        console.log("ADD OFFICES STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    office_name: "",
                    office_address: "",
                    district: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callOfficesListApi()
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
        this.callOfficesListApi()
        this.callDistrictListApi()

    }
    callOfficesListApi() {
        getOfficesList().then(res => {
            console.log("Offices", JSON.stringify(res))
            this.setState({ officesList: res.data })
        })
    }

    callDistrictListApi() {
        getDistrictList().then(res => {
            console.log("District", JSON.stringify(res))
            this.setState({ districtList: res.data })
        })
    }

    renderdistrictList() {
        const { districtList } = this.state;
        if (districtList && districtList.length > 0)
            return (
                <select className="form-control" name="district" value={this.state.district}
                    onChange={this.handleChange}
                    id="district">
                    <option value="">Please Select District</option>
                    {districtList.map((item, index) => {
                        return (
                            <option selected={item.district == this.state.district} value={item.id}>{item.district}</option>
                        )
                    })}
                </select>
            )
    }


    renderOfficesModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false, id: "" }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit Office" : "Add Office"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>Office Name</span>
                            <input
                                value={this.state.office_name}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="office_name" name="office_name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <span>Address</span>
                            <input
                                value={this.state.office_address}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="office_address" name="office_address" placeholder="Address" />
                        </div>

                        <div className="form-group">
                            <span>District</span>
                            {this.renderdistrictList()}
                        </div>

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false, id: "" }) }} className="mr10">
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
                    {this.renderOfficesModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>Offices Information</h3>
                            </div>
                            <div className="col-md-12">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", district: "", office_address: "", office_name: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.officesList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsOffices}
                                        rowData={this.state.officesList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Offices);

