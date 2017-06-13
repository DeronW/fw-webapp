import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'
import BottomButton from '../components/bottom-button'

import styles from '../css/policy-detail.css'


const Select = CSSModules((props) => {
    let hasValidData = props.value || props.value == '0',
        maskText = hasValidData ? props.options.find((opt) => opt.value === props.value).name : props.placeholder;
    let gen_options = opt => <option styleName="native-option" key={opt.name} value={opt.value}>{opt.name}</option>
    return (
        <div styleName="select-widget">
            <div styleName="select-mask" style={{ color: hasValidData ? "#333" : "#999" }}>{maskText}</div>
            <select styleName="native-select" onChange={props.handleChange}>
                <option disabled hidden>ocupy</option> {/* helpful to fire change event whtn choose the real first option */}
                {props.options.map(gen_options)}
            </select>
        </div>
    )
}, styles)

const Field = inject('policy_detail')(observer(CSSModules(function (props) {

    let { name, title, bjm, options, policy_detail } = props;

    let bjmState = policy_detail[bjm] ?
        'checked' :
        policy_detail[name] ?
            'unchecked' :
            'disabled';

    let bjmC = bjm && (
        <div styleName="bujimian-input"
            style={{ color: bjmState == 'disabled' ? "#999" : "#666" }}
            onClick={() => policy_detail.bjmToggleHander(name, bjm)} >
            <i styleName={`fake-check-icon ${bjmState}`}></i> 不计免赔
        </div>
    )

    let handler = e => {
        let v = e.target.value;
        policy_detail.setFormData(name, v)
        if (bjm && (!v || v == '0'))
            policy_detail.setFormData(bjm, false)
    }

    return <div styleName="input-field">
        <div styleName="input-field-name">{title}</div>
        <div styleName="right-els">
            {bjmC}
            <Select placeholder="请选择"
                value={policy_detail[name]}
                options={options}
                handleChange={handler} />
        </div>
    </div>
}, styles, { "allowMultiple": true, "errorWhenNotFound": false })))

const BasicCarInfo = inject('basic_info', 'car_info')(observer(CSSModules((props) => {
    let { basic_info, car_info } = props;
    return (
        <div styleName="car-info-container">
            <div styleName="car-info">
                <div styleName="car-info-item">
                    车牌号码
                    <span>ssf{`${basic_info.carNoArea}${basic_info.licenseNo}`}</span>
                </div>
                <div styleName="car-info-item">
                    车主信息
                    <span>sdfs{basic_info.carOwnersName}</span>
                </div>
                <div styleName="car-info-item">
                    车辆型号
                    <span>sdfsd{car_info.moldName}</span>
                </div>
                <div styleName="car-info-item">
                    车架号
                    <span>sdfs{car_info.carVin}</span>
                </div>
                <div styleName="car-info-item">
                    发动机号
                    <span>sf{car_info.engineNo}</span>
                </div>
                <div styleName="car-info-item-expire">
                    <div styleName="left-els">
                        交强险到期日:
                        <span> {car_info.forceExpireDate}</span>
                    </div>
                    <div styleName="right-els">
                        商业险到期日:
                        <span> {car_info.businessExpireDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}, styles)))


@inject('policy_detail')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PolicyDetail extends React.Component {

    render() {
        let { policy_detail, history } = this.props;

        return (
            <div styleName="fake-body">
                <Header title="险种明细" history={history} />

                <BasicCarInfo />

                <div styleName="input-field-grp">
                    <div styleName="input-field">
                        <div styleName="left-els">投保方案</div>
                        <div styleName="right-els">默认为去年投保方案</div>
                    </div>
                    <div styleName="input-field">
                        <div styleName="left-els">交强险+车船税</div>
                        <div styleName="right-els">必选险种</div>
                    </div>
                </div>

                <div>
                    <div styleName="policy-class">基本险</div>

                    <div styleName="input-field-grp">

                        <Field name="cheSun" title="车辆损失险" bjm="buJiMianCheSun"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '投保', value: 1 }
                            ]} />

                        <Field name="sanZhe" title="第三者责任险" bjm="buJiMianSanZhe"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '5万', value: 50000 },
                                { name: '10万', value: 100000 },
                                { name: '15万', value: 150000 },
                                { name: '20万', value: 200000 },
                                { name: '30万', value: 300000 },
                                { name: '50万', value: 500000 },
                                { name: '100万', value: 1000000 }
                            ]} />

                        <Field name="siJi" title="司机座位险" bjm="buJiMianSiJi"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '1万', value: 10000 },
                                { name: '2万', value: 20000 },
                                { name: '3万', value: 30000 },
                                { name: '4万', value: 40000 },
                                { name: '5万', value: 50000 },
                                { name: '10万', value: 100000 },
                                { name: '20万', value: 200000 }
                            ]} />

                        <Field name="chengKe" title="乘客座位险" bjm="buJiMianChengKe"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '1万', value: 10000 },
                                { name: '2万', value: 20000 },
                                { name: '3万', value: 30000 },
                                { name: '4万', value: 40000 },
                                { name: '5万', value: 50000 },
                                { name: '10万', value: 100000 },
                                { name: '20万', value: 200000 }
                            ]} />

                        <Field name="daoQiang" title="盗抢险" bjm="buJiMianDaoQiang"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '投保', value: 1 }
                            ]} />

                    </div>
                    <div styleName="policy-class">附加险</div>
                    <div styleName="input-field-grp">

                        <Field name="huaHen" title="划痕险" bjm="buJiMianHuaHen"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '2000', value: 2000 },
                                { name: '5000', value: 5000 },
                                { name: '1万', value: 10000 },
                                { name: '2万', value: 20000 }
                            ]} />

                        <Field name="boli" title="玻璃单独破碎险"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '国产', value: 1 },
                                { name: '进口', value: 2 }
                            ]} />

                        <Field name="ziRan" title="自燃损失险" bjm="buJiMianZiRan"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '投保', value: 1 }
                            ]} />

                        <Field name="sheShui" title="涉水行驶损失险" bjm="buJiMianSheShui"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '投保', value: 1 }
                            ]} />

                        {policy_detail.cheSun == '1' && <Field name="hcSanFangTeYue"
                            title="第三方特约险"
                            options={[
                                { name: '不投保', value: 0 },
                                { name: '投保', value: 1 }
                            ]} />
                        }
                    </div>
                </div>

                <BottomButton active={policy_detail.valid} title={'查询保费'}
                    onClick={() => policy_detail.submit(history)} />
            </div>
        )
    }
}

export default PolicyDetail
