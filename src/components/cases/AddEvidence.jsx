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



    // handleChange = idx => e => {
    //     const { name, value } = e.target;
    //     const rows = [...this.state.rows];
    //     rows[idx] = {
    //       [name]: value
    //     };
    //     this.setState({
    //       rows
    //     });
    // };

    //   handleAddRow = () => {
    //     const item = {
    //       userid: "",
    //       caseno: "",
    //       image: "",
    //       imagedesc: ""
    //     };
    //     this.setState({
    //       rows: [...this.state.rows, item]
    //     });
    //   };
    //   handleRemoveRow = () => {
    //     this.setState({
    //       rows: this.state.rows.slice(0, -1)
    //     });
    //   };

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
        form_data.append('case', 2);
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
                        <form
                            onSubmit={this.handleSubmitEvidence} >
                            <div className="row">

                                <div className="col-md-6">
                                    <span>User ID</span>
                                    <input type="text" value="2" onChange={this.handleChange1} disabled name="userid" />
                                </div>
                                <div className="col-md-6">
                                    <span>Case ID</span>
                                    <input type="text" value="2" onChange={this.handleChange1} disabled name="caseno" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table mt20">
                                        <tbody>
                                            {/* {this.state.rows.map((item, idx) => ( */}
                                            <tr id="addr0">
                                                <td>
                                                    <input type="file"
                                                        id="image" name="image"
                                                        accept="image/png, image/jpeg" className="form-control" onChange={this.handleImageChange} required />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control" name="imagedesc" id="imagedesc" placeholder="Description" onChange={this.handleChange1} />
                                                </td>
                                                <td>
                                                    <button type="submit" className="btn btn-sm btn-success float-right">Add Evidence</button>
                                                </td>
                                            </tr>
                                            {/* // ))} */}
                                        </tbody>
                                    </table>
                                    {/* <button
                                            onClick={this.handleAddRow}
                                            className="btn btn-danger btn-sm mr20">
                                            Add
                                        </button>
                                        <button
                                            onClick={this.handleRemoveRow}
                                            className="btn btn-danger btn-sm">
                                            Delete
                                        </button> */}

                                    {/* <button type="submit" className="btn btn-primary float-right">Submit</button> */}
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

