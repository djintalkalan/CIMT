import React, { Component } from 'react';
import { userDataAction, userTokenAction, isLoginAction } from "../../redux/actions"
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BarChart from 'react-bar-chart';
import { history } from '../../routes';
import Header from '../custom/Header';


//Open console and perform an action on page


const data = [
    {text: 'Man', value: 400}, 
    {text: 'Woman', value: 300} 
  ];
   
const margin = {top: 50, right: 50, bottom: 50, left: 50};

class Users extends Component {
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
            <div  className="dashboardCt">
                <div className="inner">
                <Tabs>
                    <TabList>
                        <Tab>Add User</Tab>
                        <Tab>Add Role</Tab>
                    </TabList>
                
                    <TabPanel>
                    <div style={{width: '50%'}}> 
                        <BarChart ylabel='Quantity'
                        width={this.state.width}
                        height={500}
                        margin={margin}
                        data={data}/>
                    </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Role Content Area</h2>
                    </TabPanel>
                </Tabs>
                </div>

                {/* <SideNav expanded={this.state.sideBarOpen} toogleHandler={(b)=>this.setState({sideBarOpen:b})} /> */}

               
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);

