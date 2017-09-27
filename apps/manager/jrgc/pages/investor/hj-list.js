import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/hj-list.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class HjList extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="已购黄金" history={history}/>
            <div styleName="listInfo">
                <div styleName="listTitle">累计赠金</div>
                <div styleName="totalNum">7.000<span styleName="listUnit">克</span></div>
                <div styleName="listInfoLast">
                    <div styleName="listInfoLeft">总待收黄金：10.140克</div>
                    <div styleName="listInfoRight">待收赠金：3.140克</div>
                </div>
            </div>
        </div>
    }
}

export default HjList