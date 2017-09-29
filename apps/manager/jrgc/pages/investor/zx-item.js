import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/zx-item.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class zxItem extends React.Component {
    state = {
        tab: 'Ta的项目'
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({ tab: tab })
    }
    render() {
        let { history } = this.props
        let { tab } = this.state
        let tabs = ['Ta的项目', '转入项目']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>
                {item}
            </div>
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
        </div>
    }
}
export default zxItem