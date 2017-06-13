import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import styles from '../css/policy-detail.css'


const FORM = {
    cheSun: {
        name: '车辆损失险',
        hasBujimian: 'buJiMianCheSun',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    sanZhe: {
        name: '第三者责任险',
        hasBujimian: 'buJiMianSanZhe',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '15万',
            value: 150000
        }, {
            name: '20万',
            value: 200000
        }, {
            name: '30万',
            value: 300000
        }, {
            name: '50万',
            value: 500000
        }, {
            name: '100万',
            value: 1000000
        }]
    },
    siJi: {
        name: '司机座位险',
        hasBujimian: 'buJiMianSiJi',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }, {
            name: '3万',
            value: 30000
        }, {
            name: '4万',
            value: 40000
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '20万',
            value: 200000
        }]
    },
    chengKe: {
        name: '乘客座位险',
        hasBujimian: 'buJiMianChengKe',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }, {
            name: '3万',
            value: 30000
        }, {
            name: '4万',
            value: 40000
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '20万',
            value: 200000
        }]
    },
    daoQiang: {
        name: '盗抢险',
        hasBujimian: 'buJiMianDaoQiang',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    huaHen: {
        name: '划痕险',
        hasBujimian: 'buJiMianHuaHen',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '2000',
            value: 2000
        }, {
            name: '5000',
            value: 5000
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }]
    },
    boli: {
        name: '玻璃单独破碎险',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '国产',
            value: 1
        }, {
            name: '进口',
            value: 2
        }]
    },
    ziRan: {
        name: '自燃损失险',
        hasBujimian: 'buJiMianZiRan',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    sheShui: {
        name: '涉水行驶损失险',
        hasBujimian: 'buJiMianSheShui',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    hcSanFangTeYue: {
        name: '第三方特约险',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    }
};

const Select = CSSModules((props) => {
    let hasValidData = props.value || props.value == '0',
        maskText = hasValidData ? props.options.find((opt) => opt.value === props.value).name : props.placeholder;
    let gen_options = opt => <option styleName="native-option" key={opt.name} value={opt.value}>{ opt.name }</option>
    return (
        <div styleName="select-widget">
            <div styleName="select-mask" style={{ color: hasValidData ? "#333" : "#999" }}>{ maskText }</div>
            <select styleName="native-select" onChange={props.handleChange}>
                <option selected disabled hidden>ocupy</option> {/* helpful to fire change event whtn choose the real first option */}
                { props.options.map(gen_options) }
            </select>
        </div>
    )
}, styles)

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
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PolicyDetail extends React.Component {

    changeHandler = (changedFieldType, mainField, bujimianField) => e => {
        // changed bujimianField value
        if (changedFieldType === 'bujimianField') {
            return this.props.policy_detail.setBujimianFieldData(bujimianField)
        }
        // changed mainField value
        this.props.policy_detail.setMainFieldData(mainField, e.target.value);
        if (e.target.value == '0' && bujimianField) {
            this.props.policy_detail.setBujimianFieldData(bujimianField, 0);
        }
    }

    render() {
        let { policy_detail } = this.props;

        let gen_input_field = (fieldName) => {
            if (fieldName === 'HcSanFangTeYue' && !policy_detail.CheSun) return null; // 必须投保车损险才可以选择投保三方特约险

            let field = FORM[fieldName];
            let bujimainFieldName = field.hasBujimian ? field.hasBujimian : '';
            let mainValue = policy_detail[fieldName],
                bujimianValue = policy_detail[bujimainFieldName];

            let checkIconState = !mainValue ? "disabled" : (bujimianValue ? "checked" : "unchecked");

            return (
                <div key={fieldName} styleName="input-field">
                    <div styleName="input-field-name">{field.name}</div>
                    <div styleName="right-els">
                        { field.hasBujimian &&
                            <div styleName="bujimian-input" style={{ color: mainValue ? "#666" : "#999"}}
                                onClick={this.changeHandler('bujimianField', fieldName, bujimainFieldName)}>
                                <i styleName={`fake-check-icon ${checkIconState}`}></i>
                                不计免赔
                            </div>
                        }
                        <Select placeholder="请选择"
                            value={mainValue}
                            options={field.options}
                            handleChange={this.changeHandler('mainField', fieldName, bujimainFieldName)} />
                    </div>
                </div>
            )
        }

        return (
            <div styleName="fake-body">
                <Header title="险种明细" history={this.props.history} />

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
                        { ['cheSun', 'sanZhe', 'siJi', 'chengKe', 'daoQiang'].map(gen_input_field) }
                    </div>
                    <div styleName="policy-class">附加险</div>
                    <div styleName="input-field-grp">
                        { ['huaHen', 'boli', 'ziRan', 'sheShui', 'hcSanFangTeYue'].map(gen_input_field) }
                    </div>
                </div>

                <BottomButton active={policy_detail.valid} title={'查询保费'}
                    onClick={() => policy_detail.submit(history)} />
            </div>
        )
    }
}

export default PolicyDetail
