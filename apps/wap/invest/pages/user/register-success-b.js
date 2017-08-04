import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Header } from '../../components'
import { Get } from '../../helpers'
import styles from '../../css/user/register-success-b.css'


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class RegisterSuccess extends React.Component {

    state = {
        /*
        result : [
            {
                restype: "",
                resvalue: ""
            }, ...
        ]
        */
        result: []
    }

    componentWillMount() {
        Get('/new/userLogin/registResult.shtml').then(data => {
            this.setState({ result: data.registResult })
        })
    }

    render() {
        let { restype, resvalue } = this.state

        const TYPE_TEXT = {
            'A': '元返现券礼包已经转入您的账户中',
            'B': '返息券已经转入您的账户中',
            'C': '公分已经转入您的账户中',
            '1': '工豆已经转入您的账户中'
        }

        return <div styleName="bg">
            <Header title={"注册成功"} show_back={false} />
            <img styleName="banner" src={require("../../images/user/register-success-b/b.png")} />
            <div styleName="success-title">注册成功</div>
            {this.state.result.map(i => {
                return <div styleName="desc">
                    <span>{resvalue}</span>
                    {TYPE_TEXT[restype]}
                </div>
            })}
            <a styleName="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.eten.myriches">立即赚收益</a>
        </div>
    }
}

export default RegisterSuccess