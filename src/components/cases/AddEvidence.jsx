import React, { Component } from 'react';
import axios from 'axios';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import { getUserList } from '../../api/ApiService';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';


//Open console and perform an action on page


class AddEvidence extends Component {
    constructor(props) {
        super(props);
        console.log("HISTORY:-", props.location.state.data)
        this.state = {
            rows: [],
            data: props.location.state.data
        }

        this.gridCaseEvidence = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: [
                { headerName: "ID", field: "id", sortable: true, filter: false },
                {
                    headerName: "Evidence", field: "url", sortable: false, filter: false, cellRendererFramework: function (params) {
                        return <img src="url" />
                    },
                },
                { headerName: "Case No", field: "case_no_id", sortable: true, filter: true },
                { headerName: "Evidence Name", field: "evidence_name", sortable: true, filter: true },
                { headerName: "Evidence Desc", field: "evidence_desc", sortable: true, filter: true },
                { headerName: "Status", field: "case_no_id", sortable: true, filter: true }],

                defaultColDef: {
                    // set the default column width
                    width: 160,
                    // make every column editable
                    editable: true,
                    // make every column use 'text' filter by default
                    filter: 'agTextColumnFilter',
                    // make columns resizable
                    resizable: true,
                  },

            rowData: null,
            floatingFilter: true,
            pagination: true,
            paginationPageSize: 10
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
        form_data.append('evidence_name', this.state.name);
        form_data.append('case_no', this.state.data.case_no);
        form_data.append('evidence_desc', this.state.imagedesc);
        for (var pair of form_data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        console.log("Info", form_data);
        return
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
        // this.callGetEvidenceApi()

        axios.get(`https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com/GetAllEvidence/1`)
        .then(res => {
            console.log("GetEvidence", JSON.stringify(res))
            this.setState({ getEvidenceList: res.data.data })
        })
    }

    // renderGetEvidenceList() {
    //     const { getEvidenceList } = this.state;
    //     if (getEvidenceList && getEvidenceList.length > 0)       
    //         {getEvidenceList.map((item, index) => {
    //             return (
    //                 <div className="evidenceCt">
    //                     <img src={item.evidence_image} />
    //                     <span>{item.evidence_desc}</span>
    //                 </div>
    //             )
    //         })
    //     }
    // }


    render() {
        console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="evidenceCt">
                <div className="container-fluid">
                    <div className="inner">
                        {/* <div className="row">
                            <div className="col-md-12">
                                {this.renderGetEvidenceList()}
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="evidenceCt mb30 px15">
                                <h5>Evidence collected</h5>
                                <div className="evidence-block mt20 px20">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                                <div className="evidence-block">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                                <div className="evidence-block">
                                    <img src="https://django-cimt-files.s3.amazonaws.com/evidence_1/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRYSCU5TSJZOCIMP%2F20200603%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200603T115015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=aa22b36dd06eb29d23198b5a89d3ccaface8f17ec24739894a8970c6b4c39b2f" />
                                    <span>Demo</span>
                                    <button type="submit" className="btn btn-sm btn-dark mt10">Compare</button>
                                </div>
                            </div>
                        </div> */}
                        <form
                            onSubmit={this.handleSubmitEvidence} >
                            <h5>Add Evidence</h5>
                            <div className="row">
                                <div className="col-md-4 boxCt">
                                    <div className="inner">
                                        <span>User ID</span>
                                        <input type="text" value={this.state.data.user_id} onChange={this.handleChange1} disabled name="userid" />
                                    </div>
                                </div>
                                <div className="col-md-4 boxCt">
                                    <div className="inner">
                                        <span>Case ID</span>
                                        <input type="text" value={this.state.data.case_no} onChange={this.handleChange1} disabled name="caseno" />
                                    </div>
                                </div>
                                <div className="col-md-4 boxCt">
                                    <div className="inner">
                                        <span>FIR No.</span>
                                        <input type="text" value={this.state.data.fir_no} onChange={this.handleChange1} disabled name="caseno" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <table className="tableCt">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>Choose Evidence</span>
                                                    <input type="file"
                                                        id="image" name="image"
                                                        accept="image/png, image/jpeg" className="form-control" onChange={this.handleImageChange} required />
                                                </td>
                                            </tr>
                                            <tr className="half">
                                                <td className="px10">
                                                <span>Name</span>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="Name" onChange={this.handleChange1} />
                                                </td>
                                            </tr>
                                            <tr className="half">
                                                <td className="px10">
                                                <span>Description</span>
                                                    <input type="text" className="form-control" name="imagedesc" id="imagedesc" placeholder="Description" onChange={this.handleChange1} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type="submit" className="btn btn-sm btn-success float-right mt10">Add Evidence</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-md-12 mb60">
                                <h5 className="mt40 mb20">Evidence List</h5>
                                {this.state.getEvidenceList && <div className="ag-theme-balham" style={{ height: 400, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridCaseEvidence}
                                        rowData={this.state.getEvidenceList}>
                                    </AgGridReact>
                                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEvidence));

