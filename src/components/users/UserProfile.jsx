import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import { updateUserApi, getOfficesList, getDesignationList } from '../../api/ApiService';
import { showSuccessToast, showErrorToast } from '../../utils/Utils';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username: "",
            // first_name: "",
            // last_name: "",
            // email: "",
            // treasury_code: "",
            // designation: "",
            // phone_no: "",
            // office: "",

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            profile_pic: e.target.files[0]
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleChangeSelect = (e) => {
        this.setState({
            [e.target.id]: {id: e.target.value}
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let user_data = JSON.parse(localStorage.getItem("userData"))
        // console.log("User data", user_data.profile_pic);
        let form_data = new FormData();
        form_data.append('profile_pic', this.state.profile_pic);
        form_data.append('first_name', this.state.first_name);
        form_data.append('last_name', this.state.last_name);
        form_data.append('email', this.state.email);
        form_data.append('treasury_code', this.state.treasury_code);
        form_data.append('designation', this.state.designation.id);
        form_data.append('phone_no', this.state.phone_no);
        form_data.append('office', this.state.office.id);
        // for (var pair of form_data.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        // console.log("Request", form_data);
        // console.log(JSON.parse(localStorage.getItem("userData")));

        // let url = 'http://127.0.0.1:8000/updateUser/1';
        // axios.patch(url, form_data, {})
        updateUserApi(user_data.id, form_data).then(res => {
            console.log("SIGN_IN_API_RES:" + JSON.stringify(res))
            if (res.success) {
                showSuccessToast("User Added Successfully")

                if (res && res.data) {
                    let newUserData = { ...this.props.userDataReducer }
                    newUserData.first_name = res.data.first_name || newUserData.first_name
                    newUserData.last_name = res.data.last_name || newUserData.last_name
                    newUserData.email = res.data.email || newUserData.email
                    newUserData.phone_no = res.data.phone_no || newUserData.phone_no
                    newUserData.office = res.data.office || newUserData.office
                    newUserData.profile_pic = res.data.profile_pic || newUserData.profile_pic
                    newUserData.designation = res.data.designation || newUserData.designation


                    localStorage.setItem('userData', JSON.stringify(newUserData));
                    this.props.userDataAction(newUserData)
                }

            }
            else {
                showErrorToast(res.error)
            }
        })
            .catch(err => showErrorToast(err))
    };

    componentDidMount() {
        this.callOfficeListApi()
        this.callDesignationListApi()

        // console.log("zzzzzzzz", this.props.userDataReducer)
        const { username, first_name, last_name, email, designation, phone_no, office, treasury_code, profile_pic } = this.props.userDataReducer
        this.setState({
            username,
            email,
            first_name: first_name,
            last_name: last_name,
            treasury_code: treasury_code,
            designation: designation,
            phone_no: phone_no,
            office: office,
            profile_pic: "",
        }, () => {
            // console.log("CHANGED STATE:", this.state)
            // console.log("USRDATA STATE:", this.props.userDataReducer)
        })
    }

    callOfficeListApi() {
        getOfficesList().then(res => {
            // console.log("Offices", JSON.stringify(res))
            this.setState({ officeList: res.data })
        })
    }

    renderOfficeList(key) {
        const { officeList } = this.state;
        if (officeList && officeList.length > 0)
            return (
                <select className="form-control customSelect" name={key} id={key}
                    onChange={this.handleChangeSelect}>
                    <option value="">Select Office</option>
                    {officeList.map((item, index) => {
                        return (
                            <option selected={item.id == this.state.office["id"] ? "selected" : ""} value={item.id}>{item.office_name}</option>
                        )
                    })}
                </select>
            )
    }

    callDesignationListApi() {
        getDesignationList().then(res => {
            // console.log("Designation", JSON.stringify(res))
            this.setState({ designationList: res.data })
        })
    }

    renderDesignationList(key) {
        const { designationList } = this.state;
        if (designationList && designationList.length > 0)
            return (
                <select className="form-control customSelect" name={key} id={key}
                    onChange={this.handleChangeSelect}>
                    <option value="">Select Designation</option>
                    {designationList.map((item, index) => {
                        return (
                            <option selected={item.id == this.state.designation["id"] ? "selected" : ""} value={item.id}>{item.designation}</option>
                        )
                    })}
                </select>
            )
    }


    render() {
        console.log("STATE", JSON.stringify(this.state))
        // console.log("USERDATA:", JSON.stringify(this.props.userDataReducer))
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
                                    <span className="title required">First Name </span>
                                    <input
                                        value={this.state.first_name}
                                        onChange={(e) => this.setState({ first_name: e.target.value })}
                                        type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Last Name </span>
                                    <input
                                        value={this.state.last_name}
                                        onChange={(e) => this.setState({ last_name: e.target.value })}
                                        type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">Username </span>
                                    <input
                                        value={this.state.username}
                                        type="text" className="form-control" name="username" id="username" placeholder="Username" readonly />
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Email </span>
                                    <input
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Treasury Code </span>
                                    <input
                                        value={this.state.treasury_code}
                                        // onChange={(e) => this.setState({ treasury_code: e.target.value })}
                                        type="text" className="form-control" name="treasury_code" id="treasury_code" placeholder="Treasury Code" readonly />
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Designation </span>
                                    {this.renderDesignationList("designation")}
                                    {/* <input
                                            value={this.state.designation}
                                            onChange={(e)=>this.setState({designation:e.target.value})}
                                            type="text" className="form-control" name="designation" id="designation" placeholder="Designation" /> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title required">Phone </span>
                                    <input
                                        value={this.state.phone_no}
                                        onChange={(e) => this.setState({ phone_no: e.target.value })}
                                        type="text" className="form-control" name="phone_no" id="phone_no" placeholder="Phone" />
                                </div>
                                <div className="col-md-6">
                                    <span className="title required">Work Place </span>
                                    {this.renderOfficeList("office")}
                                    {/* <input
                                        value={this.state.office}
                                        onChange={(e)=>this.setState({office:e.target.value})}
                                        type="text" className="form-control" name="office" id="office" placeholder="Work Place" /> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title required">Profile Picture </span>
                                    <label className="custom-file-upload px20 mb30">
                                        <input type="file"
                                            id="profile_pic" name="profile_pic" className="form-control" accept="image/png, image/jpeg, image/jpg" onChange={this.handleImageChange} />
                                    </label>
                                    {this.state.profile_pic && <img height='80px' width='80px' src={URL.createObjectURL(this.state.profile_pic)} />}
                                    {/* {this.state.profile_pic && <img height='80px' width='80px' src={ localUrl + this.state.profile_pic} />} */}
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

