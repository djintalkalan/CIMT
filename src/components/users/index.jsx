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
                { headerName: "ID", field: "id", sortable: true, filter: true },
                { headerName: "First Name", field: "first_name", sortable: true, filter: true },
                // {
                //     headerName: "First Name", field: "first_name", sortable: true, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
                //         filterOptions: ['contains', 'notContains'], defaultOption: 'contains'
                //     }, checkboxSelection: true
                // },
                { headerName: "Last Name", field: "last_name", sortable: true, filter: true },
                { headerName: "Username", field: "username", sortable: true, filter: true },
                { headerName: "Email", field: "email", sortable: true, filter: true }],
                
                defaultColDef: {
                    // set the default column width
                    width: 150,
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

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })

    }

    handleFirstnameChange = (event) => {
        this.setState({ firstname: event.target.value })

    }

    handleLastnameChange = (event) => {
        this.setState({ lastname: event.target.value })

    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })

    }

    handleSubmit = (event) => {

        const { firstname, lastname, username, password, email } = this.state

        if (!username) {
            alert("Please Enter Username/Mobile");
            return
        }
        if (!password) {
            alert("Password can not be empty");
            return
        }
        // let this is login response from server
        const params = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        this.callAddUserApi(params)

        event.preventDefault();
    }

    callAddUserApi = (params) => {
        console.log("ADD_USER_API_PARAMS:" + JSON.stringify(params))

        addUserApi(params).then(res => {
            console.log("ADD USER STATUS",JSON.stringify(res))
            this.setState({addUserStatus:res.comment})
            history.push('/users')
        });


    }

    handleRolenameChange = (event) => {
        this.setState({ rolename: event.target.value })

    }

    handleRoledescChange = (event) => {
        this.setState({ roledesc: event.target.value })

    }

    handleSubmitRole = (event) => {

        const { rolename, roledesc } = this.state

        // let this is login response from server
        const params = {
            name: this.state.rolename,
            description: this.state.roledesc
        }

        this.callAddRoleApi(params)

        event.preventDefault();
    }

    callAddRoleApi = (params) => {
        console.log("ADD_ROLE_API_PARAMS:" + JSON.stringify(params))

        addRoleApi(params).then(res => {
            console.log("ADD ROLE STATUS",JSON.stringify(res))
            this.setState({addUserStatus:res.comment})
            history.push('/users')
        });


    }

    componentDidMount() {
         this.callUserListApi()
         this.callRoleListApi()
        // let userListFromServer = [{
        //     firstName: "Mark",
        //     lastName: "Otto",
        //     userName: "@mdo"
        // }, {
        //     firstName: "Jacob",
        //     lastName: "Thornton",
        //     userName: "@fat",
        // }, {
        //     firstName: "Larry",
        //     lastName: "the Bird",
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
                                value={this.state.firstname}
                                onChange={this.handleFirstnameChange}
                                type="text" className="form-control" name="firstname" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <span>Last Name</span>
                            <input
                                value={this.state.lastname}
                                onChange={this.handleLastnameChange}
                                type="text" className="form-control" name="lastname" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <span>Username</span>
                            <input
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                type="text" className="form-control" name="username" placeholder="Phone/Email" />
                        </div>
                        <div className="form-group">
                            <span>Email</span>
                            <input
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                type="email" className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
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
                        </div>
                        

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisible: false }) }}>
                        Save Changes
                         </Button>
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
                                onChange={this.handleRolenameChange}
                                type="text" className="form-control" name="rolename" placeholder="Role Name" />
                        </div>
                        <div className="form-group">
                            <span>Role Description</span>
                            <input
                                value={this.state.roledesc}
                                onChange={this.handleRoledescChange}
                                type="text" className="form-control" name="roledesc" placeholder="Role Desc" />
                        </div>
                        
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible1: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisible1: false }) }}>
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

