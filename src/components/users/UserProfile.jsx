import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.callEditUserApi(params)

        event.preventDefault();
    }

    callEditUserApi = (params) => {
        console.log("ADD_USER_API_PARAMS:" + JSON.stringify(params))

        // addUserApi(params).then(res => {
        //     console.log("ADD USER STATUS",JSON.stringify(res))
        //     this.setState({addUserStatus:res.comment})
        //     history.push('/users')
        // });


    }

    componentDidMount() {
        
    }
    


    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt pt20">
                <div className="inner">
                   
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

