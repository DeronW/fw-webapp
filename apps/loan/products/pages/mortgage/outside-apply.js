import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../../lib/components'
import { Post } from '../../../lib/helpers'

import styles from '../../css/mortgage/outside-apply.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OutsideApply extends React.Component {

    DISTRICT = ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '大兴区', '通州区', '顺义区', '昌平区', '平谷区', '怀柔区', '密云县', '延庆县', '北京经济技术开发区', '北京周边']

    state = {
        amount: '',
        duration: '',
        district: '',
        neighbour: '',
        area: '',
        showLeavePop: false
    }

    handleChange = type => e => this.setState({ [type]: e.target.value })

    handleSubmit = () => {
        let { amount, duration, district, neighbour, area } = this.state;

        if (!(amount && duration && district && neighbour && area)) return

        let { phone, uid, token } = Utils.hashQuery,
            { history } = this.props;

        Post('/api/public/v1/mortgage.json', {
            phone: phone,
            uid: uid,
            token: token,
            mortgAmountRange: amount,
            mortgTimeLong: duration,
            area: district,
            housingEstate: neighbour,
            houseBuildArea: area,
            province: '北京市',
            city: '北京市',
            realName: '',
            sourceType: 3
        }).then(data => {
            history.push('/mortgage/download')
        }, e => {
            Components.showToast(e.message)
        });
    }

    render() {
        let { history } = this.props;
        let { amount, duration, district, neighbour, area, showLeavePop } = this.state,
            allFieldsFilled = amount && duration && district && neighbour && area;

        return (
            <div styleName="cnt-container">
                <Header title="放心花" history={history} />
                <div styleName="banner">
                    <div styleName="banner-title">北京地区</div>
                    <div styleName="banner-sub-title">房产抵押贷款</div>
                </div>

                <div styleName="item-grp-name">抵押金额及期限</div>
                <div styleName="item-grp">
                    <div styleName="input-item">
                        <div styleName="item-name">抵押金额</div>
                        <select value={amount}
                            onChange={this.handleChange('amount')} >
                            <option value="">请选择</option>
                            <option value="100万-200万">100万-200万</option>
                            <option value="200万-300万">200万-300万</option>
                            <option value="300万-400万">300万-400万</option>
                            <option value="400万-500万">400万-500万</option>
                            <option value="500万-1000万">500万-1000万</option>
                        </select>
                    </div>

                    <div styleName="input-item">
                        <div styleName="item-name">抵押年限</div>
                        <select value={duration}
                            onChange={this.handleChange('duration')} >
                            <option value="">请选择</option>
                            <option value="半年以下">半年以下</option>
                            <option value="半年-1年">半年-1年</option>
                            <option value="1年-10年">1年-10年</option>
                            <option value="10年-25年">10年-25年</option>
                            <option value="25年以上">25年以上</option>
                        </select>
                    </div>
                </div>

                <div styleName="item-grp-name">抵押物信息</div>
                <div styleName="item-grp">
                    <div styleName="input-item">
                        <div styleName="item-name">所在区县</div>
                        <select value={district}
                            onChange={this.handleChange('district')} >
                            <option value="">请选择</option>
                            {this.DISTRICT.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                    <div styleName="input-item">
                        <div styleName="item-name">小区名称</div>
                        <input placeholder="请输入"
                            value={neighbour}
                            onChange={this.handleChange('neighbour')} />
                    </div>

                    <div styleName="input-item">
                        <div styleName="item-name">建筑面积(m<span styleName="super-align-char">2</span>)</div>
                        <input type="number" maxLength="4"
                            placeholder="请输入"
                            value={area}
                            onChange={this.handleChange('area')} />
                    </div>
                </div>

                <div styleName="submit-btn-container">
                    <a styleName="submit-btn"
                        style={{ 'background': allFieldsFilled ? '#639afb' : '#ccc' }}
                        onClick={this.handleSubmit}>
                        提交资料
                    </a>
                </div>

                <div styleName="leave-catch" onClick={() => {
                    this.setState({ showLeavePop: true })
                }}></div>

                {showLeavePop &&
                    <div styleName="mask">
                        <div styleName="pop">
                            <div styleName="pop-content">马上就要申请成功了，真的要退出吗？</div>
                            <div styleName="pop-btn-grp">
                                <div styleName="pop-btn-cancel" onClick={() => { history.push('/mortgage/outside-entry') }}>离开</div>
                                <div styleName="pop-btn-confirm" onClick={() => { this.setState({ showLeavePop: false }) }}>继续申请</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default OutsideApply
