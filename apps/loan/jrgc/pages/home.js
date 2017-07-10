import React from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router-dom'
import {observer,inject} from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Header } from '../../lib/components'
import style from '../css/home.css'

@inject("home")
@observer
@CSSModules(style,{ "allowMultiple": true, "errorWhenNotFound": false })
class Home extends React.Component{
    render(){
        return <div>
            <img styleName="banner" src={require("../images/banner.jpg")} alt=""/>
        </div>
    }
}
export default Home

