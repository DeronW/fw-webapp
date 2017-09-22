import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header,BottomNavBar } from '../../components';
import styles from '../../css/user/user.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class User extends React.Component {

    render() {
        let history = this.props

        return <div>
            <div styleName="bar">
                <img  styleName="portrait" src={require('../../images/user/user/man.png')}/>
                <div styleName="barItem info">
                    <div styleName="name">张三</div>
                    <div styleName="des">A12345T</div>
                </div>
                <div styleName="barItem all">
                    <div styleName="des">全部客户(人)</div>
                    <div styleName="num">190</div>
                </div>
                <div styleName="barItem part">
                    <div styleName="des">在投客户(人)</div>
                    <div styleName="num">100</div>
                </div>
            </div>
            <BottomNavBar history={history}/>
        </div>
    }
}
export default User