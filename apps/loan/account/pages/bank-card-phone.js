import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/bank-card-phone.css'

@inject('bank_card', 'account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardPhone extends React.Component {

    state = {
        code: '',
        count: 0
    }

    componentDidMount() {

    }

    sendSMSCode = () => {
        Post(`${API_PATH}/api/bankcard/v1/resendverifycode.json`, {
            operatorBankcardGid: BANK_GID
        }).then(null, (e) => {
            $FW.Component.Toast(e.message);
            clearInterval(this.time);
            this.setState({ countdownShow: false });
        });
    }

    changeHandler = e => {
        let v = String(parseInt(e.target.value)).substr(0, 4)
        this.setState({ code: v })
    }

    render() {
        let { history, bank_card, account } = this.props

        return <div>
            <Header title="验证手机号" history={history} />

            <div styleName="tips">验证码已发送到尾号{account.phone.substr(-4)}的手机上</div>

            <div styleName="field">
                验证码 <input placeholder="请输入验证码" value={code} onChange={this.changeHandler} />
                <a styleName="btn-sms-code">{'重新获取'}</a>
            </div>

            <a styleName="btn-submit">确定</a>
        </div>
    }
}

export default BankCardPhone