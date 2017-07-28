import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan-authorization.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanAuthorization extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.title = '芝麻信用授权';
    }
    render(){
        let { history } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="芝麻信用授权" history={history} />
                <div styleName="result">
                    <div styleName="success">
                        <div styleName="title">授权成功</div>
                        <div styleName="img"><img styleName="auth-img" src={require("../images/loop-loan-authorization/success.png")}/></div>
                    </div>
                    <div styleName="fail dis">
                        <div styleName="title">授权失败</div>
                        <div styleName="img"><img styleName="auth-img" src={require("../images/loop-loan-authorization/fail.png")}/></div>
                    </div>
                </div>
                <div styleName="btn">确定</div>
            </div>
        )

    }
}

