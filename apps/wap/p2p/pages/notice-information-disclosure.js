import React from 'react'
import CSSModules from 'react-css-modules'
import { getJSONP, Utils } from 'fw-javascripts'

import {Header} from '../components'
import { NativeBridge } from '../helpers'
import styles from '../css/notice-information-disclosure.css'

@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class NoticeInformationDisclosure extends React.Component{
    state = {
        tab:'平台运营信息'
    }
    componentDidMount(){
        document.title = "信息披露"
        NativeBridge.trigger("hide_header")
    }
    switchTabHandler = (t) => {
        this.setState({tab:t})
    }
    render(){
        let { tab } = this.state;
        
        let tabFn = (item,index) => {
            return <div key={index} 
                        styleName={tab == item ? 'tab active' :'tab'} 
                        onClick = {() => this.switchTabHandler(item)}>{item}
            </div>
        }
        return <div styleName="bg">
            <Header title='信息披露' history={this.props.history}/>
            <div styleName="tabPanel">
                {["平台运营信息","企业信息","专项报告"].map(tabFn)}
            </div>
        </div>
    }
}
export default NoticeInformationDisclosure