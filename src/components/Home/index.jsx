import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../dashboard"
import Cases from "../cases"
import Users from "../users"
import AddEvidence from "../cases/AddEvidence"

import NewChargeSheet from "../cases/NewChargeSheet"
import ChargeSheet from "../cases/ChargeSheet"
import DrawingChargeSheet from "../cases/DrawingChargeSheet"


import UserProfile from "../users/UserProfile"
import ChangePassword from "../auth/changePassword"
// import ResetPassword from "../auth/resetPassword"
import DashboardLayout from '../layouts/DashboardLayout'

const filterScreen = (path) => {
    switch (path) {
        case '/':
            return <Dashboard />
        case '/users':
            return <Users />
        case '/cases':
            return <Cases />
        case '/addevidence':
            return <AddEvidence />
        case '/userprofile':
            return <UserProfile />
        case '/changepass':
            return <ChangePassword />
        // case '/resetpass':
        //     return <ResetPassword />
        case '/newchargesheet':
            return <NewChargeSheet />
        case '/chargesheet':
            return <ChargeSheet />
        case '/drawingchargesheet':
            return <DrawingChargeSheet />
    }
}

const DashBoardModule = ({ match }) => {
    return (
        <DashboardLayout>
            <Route path={`${match.url}`} render={()=>filterScreen(match.url)} />
        </DashboardLayout>
    )
}

export default DashBoardModule


