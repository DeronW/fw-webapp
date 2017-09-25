import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header, BottomNavBar } from '../../components';
import styles from '../../css/user/user.css'

@inject("user")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class User extends React.Component {

    state = {
        position_index: 0,
        position: 0
    }
    componentDidMount() {
        let { user } = this.props
        user.fetchNotice()
        this.startMoveNotice()
    }
    startMoveNotice = () => {
        let delay = 30, duration = 3000, step = 2, singleH = 40, p, position_index;
        let { notice } = this.props.user.data.user;
        this._time_gap = 0;

        let t = setInterval(() => {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                p = this.state.position - step, position_index = this.state.position_index;

                if (p <= -singleH * (this.state.position_index + 1)) {
                    this._time_gap = 0
                    p = Math.round(p / singleH) * singleH
                    position_index += 1
                }

                if (p <= -singleH * notice.length) {
                    this._time_gap = 0
                    p = 0
                    position_index = 0
                }
                this.setState({
                    position: p,
                    position_index: position_index
                })
            }
        }, delay)
    }

    render() {
        let { history } = this.props
        let { user } = this.props.user.data
        let { position } = this.state;

        let noticeFn = (item, index) => {
            return <div styleName="noticeItem" key={index}>{item.des}</div>
        }
        return <div>
            <div styleName="bar">
                <img styleName="portrait" src={require('../../images/user/user/man.png')} />
                <div styleName="barItem info">
                    <div styleName="name">张三</div>
                    <div styleName="des">A12345T</div>
                </div>
                <div styleName="barItem">
                    <div styleName="des">全部客户(人)</div>
                    <div styleName="num">190</div>
                </div>
                <div styleName="line"></div>
                <div styleName="barItem">
                    <div styleName="des">在投客户(人)</div>
                    <div styleName="num">100</div>
                </div>
            </div>
            <div styleName="notice">
                <img styleName="noticeIcon" src={require('../../images/user/user/notice.png')} />
                <div styleName="noticeDes">
                    <div styleName="noticeDesPanel" style={{ top: `${position}px` }}>
                        {user.notice.map(noticeFn)}
                        {user.notice[0] && noticeFn(user.notice[0])}
                    </div>
                </div>
                <img styleName="noticeArrow" src={require('../../images/user/user/arrow.png')} />
            </div>
            <BottomNavBar history={history} />
        </div>
    }
}
export default User