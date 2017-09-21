import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/home/rebate.css'

@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
class Rebate extends React.Component{
    render(){
        let { history } = this.props;
        let tabs = ['全部','微金','尊享','黄金']
        return <div>
            <div>
                <a styleName="btnBack" onClick={history.goBack}></a>
            </div>
        </div>
    }
}
export default Rebate