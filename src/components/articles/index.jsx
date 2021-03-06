import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import DataGrid from 'react-data-grid';
import BarChart from 'react-bar-chart';
import { history } from '../../routes';
import Header from '../custom/Header';

import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { getArticlesList, addArticlesApi, updateArticlesApi, deleteArticlesApi } from '../../api/ApiService';

import { toast } from 'react-toastify';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast, showSomethingWentWrong } from '../../utils/Utils'

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteArticles = this.deleteArticles.bind(this);
        this.gridOptionsArticles = {

        }
        this.state = {
            articlesList: null,
            isAddVisible: false,
            isAddVisible1: false
        }
    }

    deleteArticles = (id) => {
        deleteArticlesApi(id).then((res) => {
            console.log("Response of Delete", res)
            if (res.success) {
                showSuccessToast("Deleted Successfully")
                this.callArticlesListApi()
            }
            else {
                showErrorToast("Something went wrong")
            }

        }).catch((err) => {
            console.log("Error is", err)
            showErrorToast("Something went wrong")
        })
    }

    componentWillMount() {
        let deleteArticles = this.deleteArticles
        let onEdit = (data) => {
            this.setState({
                isAddVisible: true,
                article_no: data.article_no,
                gist_of_article: data.gist_of_article,
                id: data.id
            })
        }
        this.columnDefs = [
            { headerName: "ID", field: "id", sortable: true, filter: true, width: 120 },
            { headerName: "Article No", field: "article_no", sortable: true, filter: true, width: 170 },
            { headerName: "Gist of Article", field: "gist_of_article", sortable: true, filter: true, width: 170 },
            {
                headerName: "Action", field: "article_no", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-primary btn-small" onClick={() => onEdit(params.data)} >Edit </Button>
                },
            },
            {
                headerName: "Action", field: "article_no", sortable: false, filter: false, cellRendererFramework: function (params) {
                    return <Button className="btn btn-sm btn-danger btn-small" onClick={() => deleteArticles(params.data.id)}> Delete </Button>
                },
            }
        ]

        this.gridOptionsArticles = {
            defaultColDef: {
                sortable: true,
                filter: true
            },
            columnDefs: this.columnDefs,

            defaultColDef: {
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { article_no, gist_of_article } = this.state

        if (!article_no) {
            showWarningToast("Please enter Articles Type");
            return
        }
        // let this is login response from server
        const params = {
            article_no: this.state.article_no,
            gist_of_article: this.state.gist_of_article,
            // desc: this.state.desc,
        }

        // this.callAddArticlesApi(params)
        if (this.state.id) {
            this.callUdateArticlesApi(this.state.id, params)
        } else {
            this.callAddArticlesApi(params)
        }

    }

    callUdateArticlesApi = (id, params) => {
        console.log("UPDATE_Articles_API_PARAMS:" + JSON.stringify(params))

        updateArticlesApi(id, params).then(res => {
        console.log("UPDATE Articles STATUS", JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Updated Successfully")
                this.setState({
                    article_no: "",
                    gist_of_article: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callArticlesListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });
    }

    callAddArticlesApi = (params) => {
        console.log("ADD_Articles_API_PARAMS:" + JSON.stringify(params))

        addArticlesApi(params).then(res => {
            console.log("ADD Articles STATUS",JSON.stringify(res))
            if (res.success) {
                showSuccessToast("Added Successfully")
                this.setState({
                    article_no: "",
                    gist_of_article: "",
                    isAddVisible: false,
                    id: ""
                })
                this.callArticlesListApi()
            }
            else {
                showSomethingWentWrong()
            }
        }).catch(e => {
            console.log(e);
            showSomethingWentWrong()
        });

    }


    componentDidMount() {
        this.callArticlesListApi()

    }

    callArticlesListApi(){
        getArticlesList().then(res=>{
            console.log("Articles",JSON.stringify(res))
            this.setState({articlesList:res.data})
        })
    }


    renderArticlesModal() {
        return (
            <Modal show={this.state.isAddVisible} onHide={() => { this.setState({ isAddVisible: false, id: "" }) }}>
                <Modal.Header closeButton >
                    <Modal.Title>{this.state.id ? "Edit Articles" : "Add Articles"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <span>Articles No</span>
                            <input
                                value={this.state.article_no}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="article_no" name="article_no" placeholder="Type" />
                        </div>
                        <div className="form-group">
                            <span>Gist Of Article</span>
                            <input
                                value={this.state.gist_of_article}
                                onChange={this.handleChange}
                                type="text" className="form-control" id="gist_of_article" name="gist_of_article" placeholder="Description" />
                        </div>

                        <Button variant="secondary" onClick={() => { this.setState({ isAddVisible: false }) }} className="mr10">
                        Close
                         </Button>
                         <Button type="submit" variant="primary" >
                        Save Changes
                         </Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        //console.log("UserName", JSON.stringify(this.props.userdata))
        return (
            <div className="dashboardCt">
                <div className="inner">
                    {this.renderArticlesModal()}

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mb20">
                                <h3>Article No</h3>
                            </div>
                            <div className="col-md-12 mb10">
                                <button onClick={() => this.setState({ isAddVisible: true, id: "", article_no: "", gist_of_article: "" })} className="btn btn-sm btn-success">Add</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.state.articlesList && <div className="ag-theme-balham" style={{ height: 500, width: '100%' }}>
                                    <AgGridReact
                                        animateRows={true}
                                        rowSelection="multiple"
                                        //columnDefs={this.state.columnDefs}
                                        gridOptions={this.gridOptionsArticles}
                                        rowData={this.state.articlesList}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

