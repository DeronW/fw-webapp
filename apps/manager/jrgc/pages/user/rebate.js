import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/user/rebate.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Rebate extends React.Component {
    state = {
        tab: '全部'
    }
    switchTabHandler = (t) => {
        this.setState({tab:t})
    }
    render() {
        let { history } = this.props;
        let { tab } = this.state;

        let tabs = ['全部', '微金', '尊享', '黄金']
        let t = (item, index) => {
            return <div key={index}
                        styleName={tab == item ? "tab tabActive" : "tab"}
                        onClick={()=>this.switchTabHandler(item)}>{item}
            </div>
        }
        return <div>
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(t)}
                </div>
            </div>
            <div styleName="bonus">
                <div styleName=""></div>
            </div>
        </div>
    }
}
export default Rebate