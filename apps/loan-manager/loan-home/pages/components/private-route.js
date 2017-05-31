import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { observer, inject } from 'mobx-react'


// TODO: add auth sync with app

const PrivateRoute = inject('account')(observer(({ account: account, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        account.isLoggedIn ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/user-entry', state: { from: props.location } }} />
        )} />
)))

export default PrivateRoute
