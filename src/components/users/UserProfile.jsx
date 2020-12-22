import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username: "",
            firstname: "",
            lastname: "",
            email: "",
            treasury_code: "",
            designation: "",
            phone: "",
            workplace: "",

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("stateInfo", this.state);

        let form_data = new FormData();
        form_data.append('profilepic', this.state.image);
        form_data.append('firstname', this.state.firstname);
        form_data.append('lastname', this.state.lastname);
        form_data.append('email', this.state.email);
        form_data.append('treasury_code', this.state.treasury_code);
        form_data.append('designation', this.state.designation);
        form_data.append('phone', this.state.phone);
        form_data.append('workplace', this.state.workplace);
        for (var pair of form_data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        console.log("Info", form_data);

        let url = 'https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/AddEvidence/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
    };

    componentDidMount() {

        const { username, firstname, lastname, email, treasury_code, designation, phone, workplace } = this.props.userDataReducer
        this.setState({
            username,
            email,
            firstname:firstname,
            lastname:lastname,
            treasury_code:treasury_code,
            designation:designation,
            phone:phone,
            workplace:workplace,
        },()=>{
            console.log("CHANGED STATE:",this.state)
            console.log("USRDATA STATE:",this.props.userDataReducer)
        })
    }



    render() {
        console.log("UserName", JSON.stringify(this.state))
        console.log("USERDATA:", JSON.stringify(this.props.userDataReducer))
        return (
            <div className="dashboardCt pt20">
                <div className="inner">
                    <div className="container customForm customBorder py20">
                        <form
                            onSubmit={this.handleSubmit} >
                            <div className="row">
                                <div className="col-md-12"><h5 className="mb30">Update User Information</h5></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span class="title required">First Name </span>
                                    <input
                                        value={this.state.firstname}
                                        onChange={(e)=>this.setState({firstname:e.target.value})}
                                        type="text" className="form-control" name="firstname" id="firstname" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <span class="title required">Last Name </span>
                                    <input
                                        value={this.state.lastname}
                                        onChange={(e)=>this.setState({lastname:e.target.value})}
                                        type="text" className="form-control" name="lastname" id="lastname" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span class="title">Username </span>
                                    <input
                                            value={this.state.username}
                                            type="text" className="form-control" name="username" id="username" placeholder="Username" readonly />
                                </div>
                                <div className="col-md-6">
                                    <span class="title required">Email </span>
                                    <input
                                            value={this.state.email}
                                            onChange={(e)=>this.setState({email:e.target.value})}
                                            type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span class="title required">Treasury Code </span>
                                    <input
                                            value={this.state.treasury_code}
                                            onChange={(e)=>this.setState({treasury_code:e.target.value})}
                                            type="text" className="form-control" name="treasury_code" id="treasury_code" placeholder="Treasury Code" readonly />
                                </div>
                                <div className="col-md-6">
                                    <span class="title required">Designation </span>
                                    <input
                                            value={this.state.designation}
                                            onChange={(e)=>this.setState({designation:e.target.value})}
                                            type="text" className="form-control" name="designation" id="designation" placeholder="Designation" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                <span class="title required">Phone </span>
                                    <input
                                        value={this.state.phone}
                                        onChange={(e)=>this.setState({phone:e.target.value})}
                                        type="text" className="form-control" name="phone" id="phone" placeholder="Phone" />
                                </div>
                                <div className="col-md-6">
                                    <span class="title required">Work Place </span>
                                    <input
                                        value={this.state.workplace}
                                        onChange={(e)=>this.setState({workplace:e.target.value})}
                                        type="text" className="form-control" name="workplace" id="workplace" placeholder="Work Place" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span class="title required">Profile Picture </span>
                                    <label className="custom-file-upload px20 mb30">
                                        <input
                                            value={this.state.image}
                                            onChange={(e)=>this.setState({image:e.target.value})}
                                            type="file" className="form-control" name="image" id="image" accept="image/png, image/jpeg, image/jpg" />
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="btn btn-sm btn-success pull-right">
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log("Redux State:", JSON.stringify(state))
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

