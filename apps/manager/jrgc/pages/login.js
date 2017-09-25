import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../css/login.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Login extends React.Component{
    render(){
        return <div>
            Login
        </div>
    }
}
export default Login