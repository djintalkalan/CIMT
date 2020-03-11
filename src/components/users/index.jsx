import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import DataGrid from 'react-data-grid';
import BarChart from 'react-bar-chart';
import { history } from '../../routes';
import Header from '../custom/Header';



class Users extends Component {
    constructor(props) {
        super(props);
        this.state={
        }

       
    }

    componentDidMount() {
        // this.callPostsApi()
    }
    
   
    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div  className="dashboardCt pt20">
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
                                    <table class="table table-striped mt30">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">4</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">5</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                            <tr>
                                            <th scope="row">6</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
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

