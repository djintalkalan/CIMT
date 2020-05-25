import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import { getUserList } from '../../api/ApiService';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


//Open console and perform an action on page


class AddEvidence extends Component {
    constructor(props) {
        super(props);
        console.log("HISTORY:-", props.location.state.data)
        this.state = {
            rows: [],
            data: props.location.state.data
        }

    }

    handleChange1 = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmitEvidence = (e) => {
        e.preventDefault();
        console.log("stateInfo", this.state);

        let form_data = new FormData();
        form_data.append('evidence_image', this.state.image, this.state.image.name);
        form_data.append('evidence_name', "sdjfhjsdf");
        form_data.append('case_no', 2);
        form_data.append('evidence_desc', this.state.imagedesc);
        for (var pair of form_data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        // console.log("Info", form_data);
        // return
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
        //    console.log(this.props.location);
    }



    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <div className="inner">
                        <h4>Evidence Information</h4>
                        <form
                            onSubmit={this.handleSubmitEvidence} >
                            <div className="row">
                                <div className="col-md-6">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>User ID</span>
                                                    <input type="text" value={this.state.data.user_id} onChange={this.handleChange1} disabled name="userid" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <span>Case ID</span>
                                                <input type="text" value={this.state.data.case_no} onChange={this.handleChange1} disabled name="caseno" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <span>FIR No.</span>
                                                <input type="text" value={this.state.data.fir_no} onChange={this.handleChange1} disabled name="caseno" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-6">
                                <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>Choose Evidence</span>
                                                    <input type="file"
                                                        id="image" name="image"
                                                        accept="image/png, image/jpeg" className="form-control" onChange={this.handleImageChange} required />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <span>Description</span>
                                                    <input type="text" className="form-control" name="imagedesc" id="imagedesc" placeholder="Description" onChange={this.handleChange1} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="submit" className="btn btn-sm btn-success float-right">Add Evidence</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEvidence));

