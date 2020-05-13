import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../dashboard"
import Cases from "../cases"
import Users from "../users"
import AddEvidence from "../cases/AddEvidence"
import UserProfile from "../users/UserProfile"
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


