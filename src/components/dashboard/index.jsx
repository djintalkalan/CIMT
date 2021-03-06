import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { history } from '../../routes';
import { getCaseReport, getMonthlyCaseReport, getDistrictReport } from '../../api/ApiService';
import CanvasJSReact from '../../assets/canvasjs.react';
// import Fingerprint2 from 'fingerprintjs2'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import Header from '../custom/Header';
import SideNav from '../custom/SideNav';
// import logo from './logo.svg';
// import './App.css';


//Open console and perform an action on page


const monthlyCases = {
    animationEnabled: true,
	theme: "light2",
	title: {
		text: "Monthly Cases Data"
	},
	axisX: {
		// valueFormatString: "MMM"
	},
	axisY: {
		// prefix: "$",
		// labelFormatter: addSymbols
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		// itemclick: toggleDataSeries
	},
	data: [
	{
		type: "column",
		name: "Actual Cases",
		showInLegend: true,
		xValueFormatString: "MMMM YYYY",
		// yValueFormatString: "$#,##0",
		dataPoints: [
			{ x: new Date(2019, 0), y: 200 },
			{ x: new Date(2019, 1), y: 300 },
			{ x: new Date(2019, 2), y: 250 },
			{ x: new Date(2019, 3), y: 700, indexLabel: "High Renewals" },
			{ x: new Date(2019, 4), y: 500 },
			{ x: new Date(2019, 5), y: 350 },
			{ x: new Date(2019, 6), y: 300 },
			{ x: new Date(2019, 7), y: 430 },
			{ x: new Date(2019, 8), y: 350 },
			{ x: new Date(2019, 9), y:  300},
			{ x: new Date(2019, 10), y: 400 },
			{ x: new Date(2019, 11), y: 500 }
		]
	}, 
	{
		type: "line",
		name: "Expected Cases",
		showInLegend: true,
		// yValueFormatString: "$#,##0",
		dataPoints: [
			{ x: new Date(2019, 0), y: 300 },
			{ x: new Date(2019, 1), y: 320 },
			{ x: new Date(2019, 2), y: 350 },
			{ x: new Date(2019, 3), y: 350 },
			{ x: new Date(2019, 4), y: 270 },
			{ x: new Date(2019, 5), y: 230 },
			{ x: new Date(2019, 6), y: 320 },
			{ x: new Date(2019, 7), y: 430 },
			{ x: new Date(2019, 8), y: 410 },
			{ x: new Date(2019, 9), y: 450 },
			{ x: new Date(2019, 10), y: 420 },
			{ x: new Date(2019, 11), y: 500 }
		]
	},
	{
		type: "area",
		name: "Pending",
		markerBorderColor: "white",
		markerBorderThickness: 2,
		showInLegend: true,
		// yValueFormatString: "$#,##0",
		dataPoints: [
			{ x: new Date(2019, 0), y: 150 },
			{ x: new Date(2019, 1), y: 170 },
			{ x: new Date(2019, 2), y: 160 },
			{ x: new Date(2019, 3), y: 300 },
			{ x: new Date(2019, 4), y: 200 },
			{ x: new Date(2019, 5), y: 150 },
			{ x: new Date(2019, 6), y: 130 },
			{ x: new Date(2019, 7), y: 200 },
			{ x: new Date(2019, 8), y: 150 },
			{ x: new Date(2019, 9), y:  100 },
			{ x: new Date(2019, 10), y: 190 },
			{ x: new Date(2019, 11), y: 220 }
		]
	}]
}


const stateReport = {
    animationEnabled: true,
	title:{
		text: "State Monthly Report"
	},
	legend:{
		cursor: "pointer",
		// itemclick: explodePie
	},
	data: [{
		type: "pie",
		showInLegend: true,
		toolTipContent: "{name}: <strong>{y}%</strong>",
		indexLabel: "{name} - {y}%",
		dataPoints: [
			{ y: 26, name: "Ambala", exploded: true },
			{ y: 20, name: "Bhiwani" },
			{ y: 5, name: "Faridabad" },
			{ y: 3, name: "Gurugram" },
			{ y: 7, name: "Hisar" },
			{ y: 17, name: "Jhajjar" },
			{ y: 22, name: "Fatehabad"},
		]
	}]

}

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caseReportList: null,
            monthlyCaseReportList: null,
            districtReportList: null
        }


        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.getCaseReportApi()
        this.getMonthlyCaseReportApi()
        this.getDistrictReportApi()

        // setTimeout(() => {
        //     if (window.requestIdleCallback) {
        //         requestIdleCallback(function () {
        //             Fingerprint2.get(function (components) {
        //               console.log(components) // an array of components: {key: ..., value: ...}
        //             })
        //         })
        //     } else {
        //         setTimeout(function () {
        //             Fingerprint2.get(function (components) {
        //               console.log(components) // an array of components: {key: ..., value: ...}
        //             })  
        //         }, 500)
        //     }
        // }, 1000);
    }

    // getCaseReportApi = () => {
    //     getCaseReport().then((res)=>{
    //         if(res){
    //             console.log("GET POST API RESULT",JSON.stringify(res))
    //             alert("POSTS LODED FROM API SEE CONSOLE")
    //         }
    //         else{
    //             alert("POSTS NOT LODED FROM API ")
    //         }
    //     }).catch(err => {
    //         this.setState({
    //             isLoading: false,
    //         })
    //         setTimeout(() => {
    //             if (err) {
    //                 // alert(JSON.stringify(err));
    //             }
    //         }, 100);
    //         this.setStaticData()
    //     });
    //  }
    getCaseReportApi(){
        getCaseReport().then(res=>{
            console.log("CASE REPORT",JSON.stringify(res))
            this.setState({caseReportList:res.data})
        })
    }
    getMonthlyCaseReportApi(){
        getMonthlyCaseReport().then(res=>{
            console.log("MONTHLY CASE REPORT",JSON.stringify(res))
            this.setState({monthlyCaseReportList:res.data})
        })
    }
    getDistrictReportApi(){
        getDistrictReport().then(res=>{
            console.log("DISRTICT REPORT",JSON.stringify(res))
            this.setState({districtReportList:res.data})
        })
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
        console.log("UserName", this.state.total_case)
        return (
            <div className="dashboardCt">
                <div className="container-fluid">
                    <div className="inner">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="threeBlockCss">
                                    <span className="title">Total Case: </span>
                                    <span className="titleans">{this.state.total_cases}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="threeBlockCss">
                                    <span className="title">Ongoing Case: </span>
                                    <span className="titleans">4350</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="threeBlockCss">
                                    <span className="title">Complete Case: </span>
                                    <span className="titleans">2120</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt20">
                                <CanvasJSChart options = {monthlyCases} />
                            </div>
                        </div>
                        <div className="row pt40">
                            <div className="col-md-4">
                                <div className="search_bar">
                                    {/* <input type="text" className="form-control" placeholder="Search" /> */}
                                </div>
                            </div>
                            <div className="col-md-8 text-right">
                                {/* <button className="btn btn-success">Add New</button> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb80 mt30">
                                <CanvasJSChart options = {stateReport} />
                            </div>
                            {/* <div className="col-md-12 mb100">
                                <div className="text_wrapper pull-right">
                                    <h4>Account Logout</h4>
                                    {this.props.isLoginReducer && <div>
                                        <button onClick={this.logOut} className="btn btn-primary">
                                            Log Out</button>
                                    </div>}
                                </div>
                            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

