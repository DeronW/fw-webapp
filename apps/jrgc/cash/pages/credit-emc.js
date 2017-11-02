import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../components'

import styles from '../css/credit-emc.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class CreditEmc extends React.Component {

    state = {
        emcName: '',
        emcPhone: '',
    }

    handleChange = type => e => {
        this.setState({ [type]: e.target.value })
    }

    handleSubmit = () => { }

    render() {
        const { emcName, emcPhone } = this.state;

        return <div styleName="container">
            <Header title="紧急联系人" history={this.props.history} />

            <div styleName="input-item-grp">
                <div styleName="input-item">
                    <div styleName="item-name">紧急联系人姓名</div>
                    <input styleName="item-value" placeholder="请填写"
                        value={emcName} onChange={this.handleChange('emcName')}/>
                </div>
                <div styleName="input-item">
                    <div styleName="item-name">紧急联系人手机号</div>
                    <input styleName="item-value" placeholder="请填写" type="tel"
                        value={emcPhone} onChange={this.handleChange('emcPhone')}/>
                </div>
            </div>

            <div styleName="submit-btn" onClick={this.handleSubmit}>下一步</div>
        </div>
    }
}


export default CreditEmc