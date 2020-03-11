import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import Header from '../custom/Header';


//Open console and perform an action on page


class Cases extends Component {
    constructor(props) {
        super(props);
        this.state={
        }


       
    }

    componentDidMount() {
        // this.callPostsApi()
    }
   
    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div  className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="firCt pt70">
                                    <h4>Insert Fir No.</h4>
                                    <input type="text" className="form-control" placeholder="FIR NO" />
                                    <p></p>
                                    <button className="btn btn-primary">Find</button>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cases);

