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
                <div className="inner">
                    <div className="text_wrapper">
                        <h4>Account Logout</h4>
                        {this.props.isLoginReducer && <div>
                            <button onClick={this.logOut}>
                                Log Out</button>
                        </div>}
                        <p>sdasdfadfa abchjab vajd vdaih ajd jh hjd ajndc ah</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
                        <p>sdasdfadfa</p>
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

