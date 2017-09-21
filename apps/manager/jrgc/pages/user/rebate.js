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
            return <div key={index}
                        styleName={tab_num == index ? "tab tabActive" : "tab"}
                        onClick={() => this.switchTabHandler(index)}>{item}
            </div>
        }

        let all_section = () => {
            return <div>
                this is all section
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