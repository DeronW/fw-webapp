import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { observer, inject } from 'mobx-react'


// TODO: add auth sync with app

const PrivateRoute = inject('account')(observer(({ account: account, component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (account.isLoggedIn) return <Component {...props} />
        account.setNextPage(props.location.pathname);
        return <Redirect to={{ pathname: '/user-entry'}} />
        }} />
)))

export default PrivateRoute
