import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import gotoPage from '../../lib/helpers/goto-page.js'
import PCHeader from '../../lib/components/pc-header.js'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PC extends React.Component{
    render(){
        return <div styleName="pc">
            <PCHeader bgColor="rgba(0,0,0,0.5)"/>
        </div>
    }
}
export default PC