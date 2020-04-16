import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../dashboard"
import Cases from "../cases"
import Users from "../users"
import DashboardLayout from '../layouts/DashboardLayout'

const filterScreen = (path) => {
    switch (path) {
        case '/':
            return <Dashboard />
        case '/users':
            return <Users />
        case '/cases':
            return <Cases />
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


