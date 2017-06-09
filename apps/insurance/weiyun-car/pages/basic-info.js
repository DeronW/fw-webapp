import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import Header from '../components/header'

import styles from '../css/basic-info.css'

@inject('basic_info')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BasicInfo extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = '基本信息'
    }

    inputChangeHandler = name => e => {
        this.props.basic_info.setFormData(name, e.target.value)
    }

    idCardInputHandler = e => {
        let v = e.target.value;
        v = v.replace(/[^\d+|^x|^X]/g, '')
        this.props.basic_info.setFormData('idCard', v)
    }

    render() {
        let { basic_info } = this.props;

        // submit success, redirect next page
        if (basic_info.redirect_url)
            return <Redirect to={basic_info.redirect_url} />;

        return <div>
            <Header title="车险" history={this.props.history} sub_title="我的订单" />
            <img styleName="banner" src={require('../images/car-info/banner.png')} />
            <div styleName="hr"></div>

            <div styleName="field">
                <div styleName="field-title">投保地区</div>
                <select styleName="field-input-select"
                    onChange={this.inputChangeHandler('cityCode')}>
                    <option value="">请选择</option>
                    <option value="1">北京</option>
                    <option value="2">重庆</option>
                    <option value="3">天津</option>
                    <option value="4">成都</option>
                    <option value="5">昆明</option>
                </select>
            </div>

            <div styleName="field">
                <div styleName="field-title">车牌号码</div>
                <input styleName="field-input-text" placeholder="请输入车牌号码"
                    value={basic_info.formatLicenseNo}
                    onChange={this.inputChangeHandler('licenseNo')} />
                <div styleName="field-v-line"></div>
                <select styleName="field-input-select"
                    onChange={this.inputChangeHandler('carNoArea')}>
                    <option value="">请选择</option>
                    <option value="京">京</option>
                    <option value="渝">渝</option>
                    <option value="津">津</option>
                    <option value="川">川</option>
                    <option value="云">云</option>
                </select>
            </div>
            <div styleName="hr"></div>

            <div styleName="field">
                <div styleName="field-title">车主姓名</div>
                <input styleName="field-input-text" placeholder="请输入车主姓名"
                    value={basic_info.carOwnersName}
                    onChange={this.inputChangeHandler('carOwnersName')} />
            </div>

            <div styleName="field">
                <div styleName="field-title">身份证号</div>
                <input styleName="field-input-text" placeholder="请输入身份证号"
                    value={basic_info.idCard}
                    onChange={this.idCardInputHandler}
                />
            </div>

            <div styleName="field">
                <div styleName="field-title">投保公司</div>
                <select styleName="field-input-select"
                    onChange={this.inputChangeHandler('intentionCompanyCode')} >
                    <option value="">请选择</option>
                    <option value="0">平安保险</option>
                    <option value="1">太平洋保险</option>
                    <option value="2">人保</option>
                </select>
            </div>

            <div styleName="btn-submit-placeholder">
                <div styleName="btn-submit">
                    <div styleName={basic_info.valid ? "next-btn" : "next-btn btn-disabled"}
                        onClick={basic_info.submit}>下一步</div>
                </div>
            </div>
        </div>
    }
}

export default BasicInfo
