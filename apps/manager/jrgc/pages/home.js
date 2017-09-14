import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../css/home.css'

@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
class Home extends React.Component{
    render(){
        return <div>
            Home
        </div>
    }
}
export default Home