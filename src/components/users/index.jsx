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
import { getUserList } from '../../api/ApiService';
import { addUserApi} from '../../api/ApiService';
import { getRoleList } from '../../api/ApiService';
import { addRoleApi} from '../../api/ApiService';
import { getOfficesList, getDesignationList } from '../../api/ApiService';
import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            isAddVisible: false,
            isAddVisible1: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gridOptionsUser = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                // { headerName: "ID", field: "id", sortable: true, filter: true, width: 80},
                { headerName: "First Name", field: "first_name", sortable: true, filter: true, width: 140 },
                { headerName: "Last Name", field: "last_name", sortable: true, filter: true, width: 140 },
                { headerName: "Username", field: "username", sortable: true, filter: true, width: 140 },
                { headerName: "Role", valueGetter: params => {
                    return params.groups;
                }, sortable: true, filter: true, width: 140 },
                { headerName: "Phone", field: "phone_no", sortable: true, filter: true, width: 140 },
                { headerName: "Email", field: "email", sortable: true, filter: true, width: 300 }],
                
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

        this.gridOptionsRole = {
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

    handleSubmit = (event) => {
        event.preventDefault();

        let role1 = []

        const { first_name, last_name, username, email, designation, phone, office, role } = this.state

        if ((!first_name) || (!last_name) || (!username) || (!email) || (!designation) || (!phone) || (!office) || (!role)) {
            showWarningToast("Please Enter All Fields!");
      return
        }
        role1.push(this.state.role)
        const params = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            email: this.state.email,
            treasury_code: this.state.treasury_code,
            designation: this.state.designation,
            phone_no: this.state.phone,
            office: this.state.office,
            groups: role1
        }

        this.callAddUserApi(params)

        event.preventDefault();
    }

    callAddUserApi = (params) => {
        console.log("ADD_USER_API_PARAMS:" + JSON.stringify(params))

        addUserApi(params).then(res => {
            console.log("ADD USER STATUS",JSON.stringify(res))
            // this.setState({addUserStatus:res.comment})
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    treasury_code: "",
                    designation: "",
                    phone: "",
                    office: "",
                    role: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callUserListApi()
            }
            else {
                showErrorToast(res.error)
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }

    handleSubmitRole = (event) => {
        event.preventDefault();

        const { rolename, roledesc } = this.state

        if ((!rolename) || (!roledesc)) {
            showWarningToast("Please Enter All Fields!");
            return
        }

        // let this is login response from server
        const params = {
            name: this.state.rolename,
            description: this.state.roledesc
        }

        this.callAddRoleApi(params)
    }

    callAddRoleApi = (params) => {
        console.log("ADD_ROLE_API_PARAMS:" + JSON.stringify(params))

        addRoleApi(params).then(res => {
            console.log("ADD ROLE STATUS",JSON.stringify(res))
            // this.setState({addUserStatus:res.comment})
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    rolename: "",
                    roledesc: "",
                    isAddVisible1: false,
                    id: ""
                })
                this.callRoleListApi()
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
         this.callUserListApi()
         this.callRoleListApi()
         this.callOfficesListApi()
         this.callDesignationListApi()
        // let userListFromServer = [{
        //     first_Name: "Mark",
        //     last_name: "Otto",
        //     userName: "@mdo"
        // }, {
        //     first_Name: "Jacob",
        //     last_name: "Thornton",
        //     userName: "@fat",
        // }, {
        //     first_Name: "Larry",
        //     last_name: "the Bird",
        //     userName: "@twitter",
        // },]
        // this.setState({
        //     userList: userListFromServer
        // })
    }
    callUserListApi(){
        getUserList().then(res=>{
            console.log("USERS",JSON.stringify(res))
            this.setState({userList:res.data})
        })
    }

    callRoleListApi(){
        getRoleList().then(res=>{
            console.log("ROLES",JSON.stringify(res))
            this.setState({roleList:res.data})
        })
    }

    renderRoleList() {
        const { roleList } = this.state;
        if (roleList && roleList.length > 0)
            return (
                <select className="form-control" name="role" value={this.state.role}
                    onChange={this.handleChange}
                    id="role">
                    <option value="">Please Select role</option>
                    {roleList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.name}</option>
                        )
                    })}
                </select>
            )
    }

    callOfficesListApi(){
        getOfficesList().then(res=>{
            console.log("Offices",JSON.stringify(res))
            this.setState({officesList:res.data})
        })
    }

    renderOfficesList() {
        const { officesList } = this.state;
        if (officesList && officesList.length > 0)
            return (
                <select className="form-control" name="office" value={this.state.office}
                    onChange={this.handleChange}
                    id="office">
                    <option value="">Please Select Office</option>
                    {officesList.map((item, index) => {
                        return (
                            <option value={item.id}>{item.office_name}</option>
                        )
                    })}
                </select>
            )
    }

    callDesignationListApi(){
        getDesignationList().then(res=>{
            console.log("DESIGNATIONS",JSON.stringify(res))
            this.setState({designationList:res.data})
        })
    }

    renderDesignationList() {
        const { designationList } = this.state;
        if (designationList && designationList.length > 0)
            return (
                <select className="form-control" name="designation" id="designation"
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



    renderUserModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>First Name</span>
                            <input
                                value={this.state.first_name}
                                onChange={this.handleChange}
                                type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <span>Last Name</span>
                            <input
                                value={this.state.last_name}
                                onChange={this.handleChange}
                                type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <span>Username</span>
                            <input
                                value={this.state.username}
                                onChange={this.handleChange}
                                type="text" className="form-control" name="username" id="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <span>Email</span>
                            <input
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="email" className="form-control" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <span>Treasury Code</span>
                            <input
                                value={this.state.treasury_code}
                                onChange={this.handleChange}
                                type="text" className="form-control" name="treasury_code" id="treasury_code" placeholder="Treasury Code" />
                        </div>
                        <div className="form-group">
                            <span>Designation</span>
                            {/* <input
                                value={this.state.designation}
                                onChange={this.handleChange}
                                type="text" className="form-control" name="designation" id="designation" placeholder="Designation" /> */}
                                {this.renderDesignationList()}
                        </div>
                        <div className="form-group">
                            <span>Phone</span>
                            <input
                                value={this.state.phone}
                                onChange={this.handleChange}
                                type="number" className="form-control" name="phone" id="phone" placeholder="Phone" />
                        </div>
                        <div className="form-group">
                            <span>Work Place</span>
                            {this.renderOfficesList()}
                        </div>
                        <div className="form-group">
                            <span>User Role</span>
                            {this.renderRoleList()}
                        </div>
                        {/* <div className="form-group">
                            <span>Password</span>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="form-control" name="password" placeholder="********" />
                        </div>
                        <div className="form-group">
                            <span>Confirm Password</span>
                            <input type="password"
                                className="form-control" name="confirmPassword" placeholder="********" />
                        </div> */}
                        

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary">Save Changes</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    renderRoleModal() {
        return (
            <Modal show={this.state.isAddVisible1} onHide={() => { this.setState({ isAddVisible1: false }) }}>
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
                                onChange={this.handleChange}
                                type="text" className="form-control" id="rolename" name="rolename" placeholder="Role Name" />
                        </div>
                        <div className="form-group">
                            <span>Role Description</span>
                            <input
                                value={this.state.roledesc}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="roledesc" name="roledesc" placeholder="Role Desc" />
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible1: false }) }} className="mr10">
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
                    {this.renderUserModal()}
                    {this.renderRoleModal()}
                    <Tabs>
                        <TabList>
                            <Tab>Add User</Tab>
                            <Tab>Add Role</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <button onClick={() => this.setState({ isAddVisible: true })} className="btn btn-sm btn-success">Add</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.state.userList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                            <AgGridReact
                                                animateRows={true}
                                                rowSelection="multiple"
                                                //columnDefs={this.state.columnDefs}
                                                gridOptions={this.gridOptionsUser}
                                                rowData={this.state.userList}>
                                            </AgGridReact>
                                        </div>}
                                    </div>
                                </div>
                            </div>


                        </TabPanel>
                        <TabPanel>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <button onClick={() => this.setState({ isAddVisible1: true })} className="btn btn-sm btn-success">Add</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.state.userList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                            <AgGridReact
                                                animateRows={true}
                                                rowSelection="multiple"
                                                //columnDefs={this.state.columnDefs}
                                                gridOptions={this.gridOptionsRole}
                                                rowData={this.state.roleList}>
                                            </AgGridReact>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);

