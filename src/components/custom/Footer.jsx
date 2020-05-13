import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }



    render() {
        return (
            <footer>
                <div className="inner">
                    <div className="footer_block p10">CIMT &copy; 2020 | All Rights Reserved.</div>
                </div>
            </footer>
        );
    }
}

export default withRouter(Footer);