import React from 'react';
import Sidebar from './partial/sidebar'
import Header from '../custom/Header';
function DashboardLayout(props) {
    console.log(props)
    return (
        <React.Fragment>
            <Header />
            <div style={{marginTop:'65px'}}>
                <div style={{position:'fixed', width: '140px',height:'100%'}} className='row-md-2'>
                <Sidebar style={{ }} />
                </div>
                <div style={{marginLeft:'140px'}}>
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    );
}

export default DashboardLayout;