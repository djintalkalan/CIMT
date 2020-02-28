import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import { getPosts } from '../../api/ApiService';
import Header from '../custom/Header';
import SideNav from '../custom/SideNav';
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            //sideBarOpen:true
        }


        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        // this.callPostsApi()
    }

    callPostsApi = () => {
        getPosts().then((res)=>{
            if(res){
                console.log("GET POST API RESULT",JSON.stringify(res))
                alert("POSTS LODED FROM API SEE CONSOLE")
            }
            else{
                alert("POSTS NOT LODED FROM API ")
            }
        }).catch(err => {
            this.setState({
                isLoading: false,
            })
            setTimeout(() => {
                if (err) {
                    // alert(JSON.stringify(err));
                }
            }, 100);
            this.setStaticData()
        });
     }


    logOut = (event) => {


        //  clearing user's details from local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        localStorage.setItem('isLogin', JSON.stringify(false));
        // clearing user's data in redux store

        this.props.userDataAction(null)
        this.props.userTokenAction(null)
        this.props.isLoginAction(false)
        history.push('/')
        event.preventDefault();
    }

   
    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div className="container">
                    <div className="inner">
                        <div className="row pt40">
                            <div className="col-md-4">
                                <div className="search_bar">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                            </div>
                            <div className="col-md-8 text-right">
                                <button className="btn btn-success">Add New</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table class="table table-striped mt30">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
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
                        <div className="row">
                        <div className="col-md-12">
                                <div className="text_wrapper pull-right">
                                    <h4>Account Logout</h4>
                                    {this.props.isLoginReducer && <div>
                                        <button onClick={this.logOut} className="btn btn-primary">
                                            Log Out</button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              <div className="footer_block p10">CIMT &copy; 2020 | All Rights Reserved.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

