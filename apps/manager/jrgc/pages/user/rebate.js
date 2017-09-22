import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'

import styles from '../../css/user/rebate.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Rebate extends React.Component {
    state = {
        tab_num: 0
    }
    switchTabHandler = (index) => {
        this.setState({tab_num: index})
    }

    render() {
        let {history} = this.props;
        let {tab_num} = this.state;

        let tabs = ['全部', '微金', '尊享', '黄金']
        let tab_func = (item, index) => {
            return <div key={index} styleName={tab_num == index ? "tab tabActive" : "tab"}
                        onClick={() => this.switchTabHandler(index)}>
                {item}
            </div>
        }

        let all_section = () => {
            return <div>
                <div styleName="allChart"></div>
                <div styleName="allData">
                    <div styleName="dataLine">
                        <div styleName="lineItem">
                            <div styleName="name">总返利</div>
                            <div styleName="count">¥100,000,000.00</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">今日返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                    </div>
                    <div styleName="dataLine lastLine">
                        <div styleName="lineItem">
                            <div styleName="name">已发返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">待发返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                    </div>
                </div>
                <div styleName="users">
                    <div styleName="userItem">
                        <div styleName="itemDetail">
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
                    </div>
                    <div styleName="userItem">
                        <div styleName="itemDetail">
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        let p2p_section = () => {
            return <div>
                this is p2p section
            </div>
        }

        let zx_section = () => {
            return <div>
                this is zx section
            </div>
        }

        let gold_section = () => {
            return <div>
                this is gold section
            </div>
        }

        return <div>
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tab_func)}
                </div>
            </div>
            {tab_num == 0 && all_section()}
            {tab_num == 1 && p2p_section()}
            {tab_num == 2 && zx_section()}
            {tab_num == 3 && gold_section()}
            {/*<div styleName="bonus">*/}
            {/*<div styleName=""></div>*/}
            {/*</div>*/}
        </div>
    }
}

export default Rebate