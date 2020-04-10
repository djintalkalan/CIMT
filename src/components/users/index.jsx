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
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import { Button } from 'react-bootstrap';
import { getUserList } from '../../api/ApiService';
import { addUserApi} from '../../api/ApiService';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            isAddVisible: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gridOptions = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                {
                    headerName: "First Name", field: "first_name", sortable: true, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
                        filterOptions: ['contains', 'notContains'], defaultOption: 'contains'
                    }, checkboxSelection: true
                },
                { headerName: "Last Name", field: "last_name", sortable: true, filter: true },
                { headerName: "Username", field: "username", sortable: true, filter: true }],
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

    handleSubmit = (event) => {

        const { username, password } = this.state

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
            username: this.state.username,
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

    componentDidMount() {
         this.callUserListApi()
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
            this.setState({userList:res.users})
        })
    }

    renderUserList() {
        const { userList } = this.state;
        if (userList && userList.length > 0)
            return (
                <tbody>
                    {userList.map((item, index) => {
                        return (
                            <tr>
                                <th scope="row">1</th>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.userName}</td>
                                <td><button className="btn btn-sm btn-primary">Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            )
    }

    renderAddModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                type="text" className="form-control" name="username" placeholder="Phone/Email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="form-control" name="password" placeholder="********" />
                        </div>
                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false }) }} className="mr10">
                        Close
                         </Button>
                        <Button type="submit" variant="primary" onClick={() => { this.setState({ isAddVisible: false }) }}>
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer> */}
                    
                {/* </Modal.Footer> */}
            </Modal>
        )
    }


    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt pt20">
                <div className="inner">
                    {this.renderAddModal()}
                    <Tabs>
                        <TabList>
                            <Tab>Add User</Tab>
                            <Tab>Add Role</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="container">
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
                                                gridOptions={this.gridOptions}
                                                rowData={this.state.userList}>
                                            </AgGridReact>
                                        </div>}
                                        {/* <table class="table table-striped mt30">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            {this.renderUserList()}
                                           </table> */}
                                    </div>
                                </div>
                            </div>


                        </TabPanel>
                        <TabPanel>
                            <h2>Role Content Area</h2>
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

