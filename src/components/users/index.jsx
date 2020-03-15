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





class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
        }
        this.gridOptions={
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                {
                    headerName: "First Name", field: "firstName", sortable: true, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
                        filterOptions: ['contains', 'notContains'], defaultOption: 'contains'
                    }, checkboxSelection: true
                },
                { headerName: "Last Name", field: "lastName", sortable: true, filter: true },
                { headerName: "Username", field: "userName", sortable: true, filter: true }],
            rowData: null,
            floatingFilter:true
        }
    }

    componentDidMount() {
        // this.callPostsApi()
        let userListFromServer = [{
            firstName: "Mark",
            lastName: "Otto",
            userName: "@mdo"
        }, {
            firstName: "Jacob",
            lastName: "Thornton",
            userName: "@fat",
        }, {
            firstName: "Larry",
            lastName: "the Bird",
            userName: "@twitter",
        }, {
            firstName: "Mark",
            lastName: "Otto",
            userName: "@mdo"
        }, {
            firstName: "Jacob",
            lastName: "Thornton",
            userName: "@fat",
        }, {
            firstName: "Larry",
            lastName: "the Bird",
            userName: "@twitter",
        }]
        this.setState({
            userList: userListFromServer
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


    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt pt20">
                <div className="inner">
                    <Tabs>
                        <TabList>
                            <Tab>Add User</Tab>
                            <Tab>Add Role</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="container">
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

