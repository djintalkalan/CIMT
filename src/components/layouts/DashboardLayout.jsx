import React from 'react';
import Sidebar from './partial/sidebar'
import Header from '../custom/Header';
import Footer from '../custom/Footer';
function DashboardLayout(props) {
    console.log(props)
    return (
        <React.Fragment>
            <Header />
            <div className="mainCt">
                <div className='sidebarCt'>
                <Sidebar style={{ }} />
                </div>
                <div className="contentCt">
                    {props.children}
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default DashboardLayout;